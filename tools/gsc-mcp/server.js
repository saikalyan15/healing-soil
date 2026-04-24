#!/usr/bin/env node
"use strict";

// Debug log — written before any other code executes
const _debugLog = require("fs");
const _debugPath = require("path").join(__dirname, "startup-debug.log");
_debugLog.appendFileSync(_debugPath, `[${new Date().toISOString()}] server.js started — pid=${process.pid} node=${process.version} env.GSC_KEY_FILE=${process.env.GSC_KEY_FILE || "MISSING"}\n`);
process.on("uncaughtException", (e) => {
  _debugLog.appendFileSync(_debugPath, `[${new Date().toISOString()}] UNCAUGHT: ${e.stack}\n`);
  process.exit(1);
});

// The SDK's wildcard exports map omits .js extensions; resolve sub-files via known CJS index
const _sdkServerDir = require("path").dirname(require.resolve("@modelcontextprotocol/sdk/server"));
const { Server } = require("@modelcontextprotocol/sdk/server");
const { StdioServerTransport } = require(require("path").join(_sdkServerDir, "stdio.js"));
const { CallToolRequestSchema, ListToolsRequestSchema } = require(require("path").join(_sdkServerDir, "..", "types.js"));
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const KEY_FILE = process.env.GSC_KEY_FILE;
const SITE_URL = process.env.GSC_SITE_URL || "sc-domain:healingsoil.in";
const DAYS = parseInt(process.env.GSC_DAYS || "28");

// ── Cache helpers ───────────────────────────────────────────────────────────

function cacheGet(key) {
  const file = path.join(CACHE_DIR, `${key}.json`);
  if (!fs.existsSync(file)) return null;
  const { fetchedAt, data } = JSON.parse(fs.readFileSync(file, "utf8"));
  if (Date.now() - new Date(fetchedAt).getTime() > CACHE_TTL_MS) return null;
  return { data, fetchedAt };
}

function cacheSet(key, data) {
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });
  const file = path.join(CACHE_DIR, `${key}.json`);
  fs.writeFileSync(file, JSON.stringify({ fetchedAt: new Date().toISOString(), data }, null, 2));
}

if (!KEY_FILE) {
  process.stderr.write("GSC_KEY_FILE env var not set\n");
  process.exit(1);
}

function getAuth() {
  const key = JSON.parse(fs.readFileSync(KEY_FILE, "utf8"));
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });
}

function dateRange(days) {
  const end = new Date();
  end.setDate(end.getDate() - 3);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

async function queryGSC(auth, body) {
  const sc = google.searchconsole({ version: "v1", auth });
  const res = await sc.searchanalytics.query({
    siteUrl: SITE_URL,
    requestBody: body,
  });
  return res.data.rows || [];
}

// ── Tool implementations ────────────────────────────────────────────────────

async function getTopQueries({ limit = 20 } = {}) {
  const cacheKey = `top_queries_${limit}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const { startDate, endDate } = dateRange(DAYS);
  const rows = await queryGSC(auth, {
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: limit,
    orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
  });
  const data = rows.map((r) => ({
    query: r.keys[0],
    impressions: Math.round(r.impressions),
    clicks: Math.round(r.clicks),
    ctr: parseFloat((r.ctr * 100).toFixed(1)),
    position: parseFloat(r.position.toFixed(1)),
  }));
  cacheSet(cacheKey, data);
  return { _cached: false, _fetchedAt: new Date().toISOString(), data };
}

async function getCtrOutliers({ minImpressions = 50 } = {}) {
  const cacheKey = `ctr_outliers_${minImpressions}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const { startDate, endDate } = dateRange(DAYS);
  const rows = await queryGSC(auth, {
    startDate,
    endDate,
    dimensions: ["query"],
    rowLimit: 200,
    orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
  });
  const data = rows
    .filter((r) => r.impressions >= minImpressions && r.ctr < 0.02)
    .map((r) => ({
      query: r.keys[0],
      impressions: Math.round(r.impressions),
      clicks: Math.round(r.clicks),
      ctr: parseFloat((r.ctr * 100).toFixed(1)),
      position: parseFloat(r.position.toFixed(1)),
      note: "High impressions, low CTR — title/meta rewrite candidate",
    }))
    .slice(0, 15);
  cacheSet(cacheKey, data);
  return { _cached: false, _fetchedAt: new Date().toISOString(), data };
}

async function getOpportunities() {
  const cacheKey = "opportunities";
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const { startDate, endDate } = dateRange(DAYS);
  const rows = await queryGSC(auth, {
    startDate,
    endDate,
    dimensions: ["query", "page"],
    rowLimit: 500,
    orderBy: [{ fieldName: "impressions", sortOrder: "DESCENDING" }],
  });

  const opportunities = [];

  for (const r of rows) {
    const query = r.keys[0];
    const page = r.keys[1];
    const impressions = Math.round(r.impressions);
    const ctr = parseFloat((r.ctr * 100).toFixed(1));
    const position = parseFloat(r.position.toFixed(1));
    const clicks = Math.round(r.clicks);

    if (impressions >= 100 && ctr < 2 && position <= 20) {
      opportunities.push({
        type: "rewrite",
        priority: "high",
        query,
        page,
        impressions,
        clicks,
        ctr,
        position,
        action: `Rewrite title and meta description for: ${page}`,
        reason: `${impressions} impressions, only ${ctr}% CTR — page exists but headline is not compelling enough`,
      });
    }

    if (impressions >= 30 && position >= 8 && position <= 20 && ctr >= 2) {
      opportunities.push({
        type: "optimize",
        priority: "medium",
        query,
        page,
        impressions,
        clicks,
        ctr,
        position,
        action: `Improve on-page content for: ${page}`,
        reason: `Ranking at position ${position} — small improvements can jump to page 1`,
      });
    }

    if (impressions >= 20 && clicks === 0 && position > 20) {
      opportunities.push({
        type: "new_post",
        priority: "medium",
        query,
        page: null,
        impressions,
        clicks: 0,
        ctr: 0,
        position,
        action: `Write a new post targeting: "${query}"`,
        reason: `${impressions} impressions with 0 clicks — Google shows the site for this query but no good page exists yet`,
      });
    }
  }

  const seen = new Set();
  const unique = opportunities.filter((o) => {
    const key = `${o.type}:${o.query}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  unique.sort((a, b) => b.impressions - a.impressions);
  const data = unique.slice(0, 10);
  cacheSet(cacheKey, data);
  return { _cached: false, _fetchedAt: new Date().toISOString(), data };
}

// ── MCP server wiring ───────────────────────────────────────────────────────

const server = new Server(
  { name: "gsc-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_opportunities",
      description:
        "Analyze Search Console data for the last 28 days and return ranked SEO opportunities: new post candidates, CTR rewrite targets, and on-page optimization targets. This is the primary tool for the gsc-blog-pipeline analyze stage.",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
    },
    {
      name: "get_top_queries",
      description:
        "Return the top N queries by impressions with clicks, CTR, and average position.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of queries to return (default 20)",
          },
        },
        required: [],
      },
    },
    {
      name: "get_ctr_outliers",
      description:
        "Return queries with high impressions and low CTR — these are title and meta rewrite candidates where a better headline could significantly increase clicks.",
      inputSchema: {
        type: "object",
        properties: {
          minImpressions: {
            type: "number",
            description: "Minimum impressions threshold (default 50)",
          },
        },
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;
    if (name === "get_opportunities") {
      result = await getOpportunities();
    } else if (name === "get_top_queries") {
      result = await getTopQueries(args);
    } else if (name === "get_ctr_outliers") {
      result = await getCtrOutliers(args);
    } else {
      return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err.message}\n`);
  process.exit(1);
});
