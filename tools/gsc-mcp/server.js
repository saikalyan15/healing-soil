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

async function inspectUrl(auth, inspectionUrl) {
  const sc = google.searchconsole({ version: "v1", auth });
  const res = await sc.urlInspection.index.inspect({
    requestBody: {
      siteUrl: SITE_URL,
      inspectionUrl,
      languageCode: "en-US",
    },
  });

  const result = res.data.inspectionResult || {};
  const index = result.indexStatusResult || {};

  return {
    url: inspectionUrl,
    inspectionResultLink: result.inspectionResultLink || null,
    verdict: index.verdict || null,
    coverageState: index.coverageState || null,
    robotsTxtState: index.robotsTxtState || null,
    indexingState: index.indexingState || null,
    pageFetchState: index.pageFetchState || null,
    lastCrawlTime: index.lastCrawlTime || null,
    googleCanonical: index.googleCanonical || null,
    userCanonical: index.userCanonical || null,
    crawledAs: index.crawledAs || null,
    sitemap: index.sitemap || [],
    referringUrls: index.referringUrls || [],
  };
}

function getSitemapUrls({ sitemapPath = path.join(process.cwd(), "public", "sitemap.xml"), limit = 100 } = {}) {
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`Sitemap not found: ${sitemapPath}`);
  }

  const xml = fs.readFileSync(sitemapPath, "utf8");
  return [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter(Boolean)
    .slice(0, limit);
}

function groupInspectionResults(results) {
  const groups = {};

  for (const item of results) {
    const key = item.coverageState || item.verdict || "UNKNOWN";
    if (!groups[key]) {
      groups[key] = { count: 0, urls: [] };
    }
    groups[key].count += 1;
    groups[key].urls.push({
      url: item.url,
      verdict: item.verdict,
      lastCrawlTime: item.lastCrawlTime,
      pageFetchState: item.pageFetchState,
      indexingState: item.indexingState,
      googleCanonical: item.googleCanonical,
      userCanonical: item.userCanonical,
      inspectionResultLink: item.inspectionResultLink,
    });
  }

  return groups;
}

// ── Tool implementations ────────────────────────────────────────────────────

// The Search Analytics API ignores orderBy and always returns rows sorted by
// clicks descending, then alphabetically by key. That means a plain rowLimit
// pull truncates the zero-click tail mid-alphabet and silently hides demand.
// containsFilter and minImpressions exist to work around that.
async function getTopQueries({ limit = 20, containsFilter = "", minImpressions = 0 } = {}) {
  const filterKey = containsFilter.replace(/[^a-z0-9_-]/gi, "_") || "none";
  const cacheKey = `top_queries_${limit}_${filterKey}_${minImpressions}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const { startDate, endDate } = dateRange(DAYS);
  const body = {
    startDate,
    endDate,
    dimensions: ["query"],
    // Over-fetch when filtering so the filter selects from the full tail
    // rather than from an already-truncated alphabetical slice.
    rowLimit: containsFilter || minImpressions ? 25000 : limit,
  };

  if (containsFilter) {
    body.dimensionFilterGroups = [
      {
        filters: [{ dimension: "query", operator: "contains", expression: containsFilter }],
      },
    ];
  }

  const rows = await queryGSC(auth, body);
  const data = rows
    .map((r) => ({
      query: r.keys[0],
      impressions: Math.round(r.impressions),
      clicks: Math.round(r.clicks),
      ctr: parseFloat((r.ctr * 100).toFixed(1)),
      position: parseFloat(r.position.toFixed(1)),
    }))
    .filter((r) => r.impressions >= minImpressions)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, limit);

  cacheSet(cacheKey, data);
  return { _cached: false, _fetchedAt: new Date().toISOString(), data };
}

// GSC returns country as lowercase ISO-3166-1 alpha-3. Map the ones likely to
// show up here; anything else falls back to the uppercased code.
const COUNTRY_NAMES = {
  ind: "India", usa: "United States", sgp: "Singapore", gbr: "United Kingdom",
  are: "United Arab Emirates", aus: "Australia", can: "Canada", deu: "Germany",
  nld: "Netherlands", fra: "France", sau: "Saudi Arabia", qat: "Qatar",
  mys: "Malaysia", lka: "Sri Lanka", npl: "Nepal", bgd: "Bangladesh",
  pak: "Pakistan", zaf: "South Africa", nzl: "New Zealand", irl: "Ireland",
  che: "Switzerland", swe: "Sweden", esp: "Spain", ital: "Italy", ita: "Italy",
  jpn: "Japan", kor: "South Korea", chn: "China", bra: "Brazil", ven: "Venezuela",
  omn: "Oman", kwt: "Kuwait", bhr: "Bahrain", tha: "Thailand", idn: "Indonesia",
  phl: "Philippines", vnm: "Vietnam", rus: "Russia", pol: "Poland", mex: "Mexico",
};

async function getCountries({ limit = 25 } = {}) {
  const cacheKey = `countries_${limit}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const { startDate, endDate } = dateRange(DAYS);
  const rows = await queryGSC(auth, {
    startDate,
    endDate,
    dimensions: ["country"],
    rowLimit: 500,
  });

  const mapped = rows.map((r) => ({
    countryCode: r.keys[0],
    country: COUNTRY_NAMES[r.keys[0]] || r.keys[0].toUpperCase(),
    impressions: Math.round(r.impressions),
    clicks: Math.round(r.clicks),
    ctr: parseFloat((r.ctr * 100).toFixed(1)),
    position: parseFloat(r.position.toFixed(1)),
  }));

  const totalImpressions = mapped.reduce((sum, r) => sum + r.impressions, 0);
  const totalClicks = mapped.reduce((sum, r) => sum + r.clicks, 0);

  const data = {
    dateRange: { startDate, endDate },
    totalImpressions,
    totalClicks,
    countries: mapped
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, limit)
      .map((r) => ({
        ...r,
        impressionShare: totalImpressions
          ? parseFloat(((r.impressions / totalImpressions) * 100).toFixed(1))
          : 0,
      })),
  };

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

async function inspectUrls({ urls = [] } = {}) {
  if (!Array.isArray(urls) || urls.length === 0) {
    throw new Error("Pass a non-empty urls array");
  }
  if (urls.length > 50) {
    throw new Error("Inspect at most 50 URLs per call to avoid burning URL Inspection quota");
  }

  const auth = getAuth();
  const data = [];

  for (const url of urls) {
    data.push(await inspectUrl(auth, url));
  }

  return {
    _cached: false,
    _fetchedAt: new Date().toISOString(),
    data,
    groups: groupInspectionResults(data),
  };
}

async function inspectSitemapIndexing({ limit = 50, pathPrefix = "" } = {}) {
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 200);
  const cacheKey = `inspect_sitemap_${safeLimit}_${pathPrefix.replace(/[^a-z0-9_-]/gi, "_") || "all"}`;
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };

  const auth = getAuth();
  const urls = getSitemapUrls({ limit: 1000 })
    .filter((url) => {
      if (!pathPrefix) return true;
      try {
        return new URL(url).pathname.startsWith(pathPrefix);
      } catch {
        return false;
      }
    })
    .slice(0, safeLimit);

  const results = [];
  for (const url of urls) {
    results.push(await inspectUrl(auth, url));
  }

  const data = {
    inspected: results.length,
    pathPrefix: pathPrefix || null,
    groups: groupInspectionResults(results),
    results,
  };

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
        "Return the top N queries by impressions with clicks, CTR, and average position. Note the underlying API sorts by clicks then alphabetically, so an unfiltered pull truncates the zero-click tail mid-alphabet. Use containsFilter to search the full tail for a substring (for example a city name), or minImpressions to surface high-impression zero-click queries that a plain limit would hide.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of queries to return (default 20)",
          },
          containsFilter: {
            type: "string",
            description:
              "Only return queries containing this substring, matched against the full result set rather than a truncated slice. Example: 'bangalore' or 'humid'.",
          },
          minImpressions: {
            type: "number",
            description:
              "Only return queries with at least this many impressions. Fetches the full tail before filtering, so zero-click queries are not lost to alphabetical truncation.",
          },
        },
        required: [],
      },
    },
    {
      name: "get_countries",
      description:
        "Return Search Console impressions, clicks, CTR and average position broken down by country, with each country's share of total impressions. Use this to answer where search traffic actually comes from. Search Console retains 16 months of country history.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of countries to return (default 25)",
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
    {
      name: "inspect_urls",
      description:
        "Inspect specific URLs with the Google Search Console URL Inspection API and return coverageState, indexingState, crawl status, canonicals, and inspection links.",
      inputSchema: {
        type: "object",
        properties: {
          urls: {
            type: "array",
            items: { type: "string" },
            description: "Absolute URLs from the verified Search Console property. Maximum 50 per call.",
          },
        },
        required: ["urls"],
      },
    },
    {
      name: "inspect_sitemap_indexing",
      description:
        "Inspect URLs from public/sitemap.xml with the URL Inspection API and group them by coverageState, including Crawled - currently not indexed.",
      inputSchema: {
        type: "object",
        properties: {
          limit: {
            type: "number",
            description: "Number of sitemap URLs to inspect. Default 50, maximum 200.",
          },
          pathPrefix: {
            type: "string",
            description: "Optional pathname prefix filter, for example /soap/ or /blog/.",
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
    } else if (name === "get_countries") {
      result = await getCountries(args);
    } else if (name === "get_ctr_outliers") {
      result = await getCtrOutliers(args);
    } else if (name === "inspect_urls") {
      result = await inspectUrls(args);
    } else if (name === "inspect_sitemap_indexing") {
      result = await inspectSitemapIndexing(args);
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
