#!/usr/bin/env node
"use strict";

const _sdkServerDir = require("path").dirname(require.resolve("@modelcontextprotocol/sdk/server"));
const { Server } = require("@modelcontextprotocol/sdk/server");
const { StdioServerTransport } = require(require("path").join(_sdkServerDir, "stdio.js"));
const { CallToolRequestSchema, ListToolsRequestSchema } = require(require("path").join(_sdkServerDir, "..", "types.js"));
const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "cache");
const CACHE_TTL_MS = 60 * 60 * 1000;

const KEY_FILE = process.env.GA4_KEY_FILE;
const PROPERTY_ID = process.env.GA4_PROPERTY_ID;
const DAYS = parseInt(process.env.GA4_DAYS || "28", 10);

if (!KEY_FILE) {
  process.stderr.write("GA4_KEY_FILE env var not set\n");
  process.exit(1);
}

if (!PROPERTY_ID) {
  process.stderr.write("GA4_PROPERTY_ID env var not set\n");
  process.exit(1);
}

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

function getAuth() {
  const key = JSON.parse(fs.readFileSync(KEY_FILE, "utf8"));
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
  });
}

function propertyName() {
  return `properties/${PROPERTY_ID}`;
}

function dateRange(days = DAYS) {
  return [{ startDate: `${days}daysAgo`, endDate: "yesterday" }];
}

function metricValue(row, metricHeaders, metricName) {
  const idx = metricHeaders.findIndex((h) => h.name === metricName);
  if (idx === -1) return null;
  const raw = row.metricValues?.[idx]?.value ?? "0";
  const num = Number(raw);
  return Number.isFinite(num) ? num : raw;
}

function dimensionValue(row, dimensionHeaders, dimensionName) {
  const idx = dimensionHeaders.findIndex((h) => h.name === dimensionName);
  if (idx === -1) return null;
  return row.dimensionValues?.[idx]?.value ?? "";
}

function parseReport(report, dimensionNames, metricNames) {
  const dimensionHeaders = report.dimensionHeaders || dimensionNames.map((name) => ({ name }));
  const metricHeaders = report.metricHeaders || metricNames.map((name) => ({ name }));
  return (report.rows || []).map((row) => {
    const item = {};
    for (const dimension of dimensionNames) item[dimension] = dimensionValue(row, dimensionHeaders, dimension);
    for (const metric of metricNames) item[metric] = metricValue(row, metricHeaders, metric);
    return item;
  });
}

async function runReport({ dimensions = [], metrics, days = DAYS, limit = 20, orderByMetric = "sessions" }) {
  const auth = getAuth();
  const analyticsdata = google.analyticsdata({ version: "v1beta", auth });
  const res = await analyticsdata.properties.runReport({
    property: propertyName(),
    requestBody: {
      dateRanges: dateRange(days),
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit,
      orderBys: orderByMetric
        ? [{ metric: { metricName: orderByMetric }, desc: true }]
        : undefined,
    },
  });

  return parseReport(res.data, dimensions, metrics);
}

async function withCache(cacheKey, fn) {
  const cached = cacheGet(cacheKey);
  if (cached) return { _cached: true, _fetchedAt: cached.fetchedAt, data: cached.data };
  const data = await fn();
  cacheSet(cacheKey, data);
  return { _cached: false, _fetchedAt: new Date().toISOString(), data };
}

async function getPropertyInfo() {
  return withCache("property_info", async () => {
    const auth = getAuth();
    const analyticsadmin = google.analyticsadmin({ version: "v1beta", auth });
    const res = await analyticsadmin.properties.get({ name: propertyName() });
    return {
      propertyId: PROPERTY_ID,
      displayName: res.data.displayName,
      timeZone: res.data.timeZone,
      currencyCode: res.data.currencyCode,
    };
  });
}

async function getOverview({ days = DAYS } = {}) {
  return withCache(`overview_${days}`, async () => {
    const rows = await runReport({
      metrics: ["sessions", "totalUsers", "newUsers", "eventCount", "conversions", "totalRevenue"],
      days,
      limit: 1,
      orderByMetric: null,
    });
    return rows[0] || {};
  });
}

async function getTrafficAcquisition({ days = DAYS, limit = 20 } = {}) {
  return withCache(`traffic_${days}_${limit}`, () =>
    runReport({
      dimensions: ["sessionDefaultChannelGroup", "sessionSourceMedium"],
      metrics: ["sessions", "totalUsers", "conversions", "totalRevenue"],
      days,
      limit,
    })
  );
}

async function getLandingPages({ days = DAYS, limit = 20 } = {}) {
  return withCache(`landing_${days}_${limit}`, () =>
    runReport({
      dimensions: ["landingPagePlusQueryString"],
      metrics: ["sessions", "totalUsers", "conversions", "totalRevenue"],
      days,
      limit,
    })
  );
}

async function getDailyTrend({ days = DAYS } = {}) {
  return withCache(`daily_${days}`, () =>
    runReport({
      dimensions: ["date"],
      metrics: ["sessions", "totalUsers", "conversions", "eventCount"],
      days,
      limit: Math.min(days, 365),
      orderByMetric: null,
    })
  );
}

async function getEvents({ days = DAYS, limit = 30 } = {}) {
  return withCache(`events_${days}_${limit}`, () =>
    runReport({
      dimensions: ["eventName"],
      metrics: ["eventCount", "totalUsers"],
      days,
      limit,
      orderByMetric: "eventCount",
    })
  );
}

async function getConversionEvents({ days = DAYS, limit = 20 } = {}) {
  return withCache(`conversion_events_${days}_${limit}`, async () => {
    const rows = await runReport({
      dimensions: ["eventName"],
      metrics: ["conversions", "eventCount"],
      days,
      limit: 100,
      orderByMetric: "conversions",
    });
    return rows.filter((row) => Number(row.conversions) > 0).slice(0, limit);
  });
}

const server = new Server(
  { name: "ga4-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_property_info",
      description: "Return GA4 property metadata for the configured property.",
      inputSchema: { type: "object", properties: {}, required: [] },
    },
    {
      name: "get_overview",
      description: "Return sessions, users, new users, event count, conversions, and revenue for the configured GA4 property.",
      inputSchema: {
        type: "object",
        properties: { days: { type: "number", description: "Lookback window in days. Defaults to GA4_DAYS." } },
        required: [],
      },
    },
    {
      name: "get_traffic_acquisition",
      description: "Return GA4 traffic acquisition by channel group and source/medium.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number" },
          limit: { type: "number" },
        },
        required: [],
      },
    },
    {
      name: "get_landing_pages",
      description: "Return top GA4 landing pages by sessions with users, conversions, and revenue.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number" },
          limit: { type: "number" },
        },
        required: [],
      },
    },
    {
      name: "get_daily_trend",
      description: "Return daily GA4 sessions, users, conversions, and event count.",
      inputSchema: {
        type: "object",
        properties: { days: { type: "number" } },
        required: [],
      },
    },
    {
      name: "get_events",
      description: "Return top GA4 events by event count.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number" },
          limit: { type: "number" },
        },
        required: [],
      },
    },
    {
      name: "get_conversion_events",
      description: "Return GA4 events that have conversions in the selected window.",
      inputSchema: {
        type: "object",
        properties: {
          days: { type: "number" },
          limit: { type: "number" },
        },
        required: [],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args = {} } = request.params;

  try {
    let result;
    if (name === "get_property_info") result = await getPropertyInfo(args);
    else if (name === "get_overview") result = await getOverview(args);
    else if (name === "get_traffic_acquisition") result = await getTrafficAcquisition(args);
    else if (name === "get_landing_pages") result = await getLandingPages(args);
    else if (name === "get_daily_trend") result = await getDailyTrend(args);
    else if (name === "get_events") result = await getEvents(args);
    else if (name === "get_conversion_events") result = await getConversionEvents(args);
    else return { content: [{ type: "text", text: `Unknown tool: ${name}` }], isError: true };

    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (err) {
    return { content: [{ type: "text", text: `Error: ${err.message}` }], isError: true };
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
