import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envFile = resolve(import.meta.dirname, '..', '..', '.env.local');
let token = process.env.META_ADS_ACCESS_TOKEN?.trim();
if (!token && existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split(/\r?\n/u)) {
    const match = line.match(/^\s*META_ADS_ACCESS_TOKEN\s*=\s*(.*)$/u);
    if (!match) continue;
    token = match[1].trim().replace(/^['"]|['"]$/g, '');
    break;
  }
}
const API = 'https://graph.facebook.com/v22.0';
const ACT = 'act_896452193393277';

async function graphGet(path, params = {}) {
  const url = new URL(`${API}${path}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  }
  const res = await fetch(url);
  return { ok: res.ok, status: res.status, json: await res.json() };
}

const campaigns = await graphGet(`/${ACT}/campaigns`, {
  fields: 'id,name,objective,status,effective_status,daily_budget,created_time',
  limit: 10,
});
console.log(JSON.stringify(campaigns.json, null, 2));
