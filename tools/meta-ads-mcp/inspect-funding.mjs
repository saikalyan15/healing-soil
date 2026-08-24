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
async function get(path, params = {}) {
  const url = new URL(`${API}${path}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  }
  const res = await fetch(url);
  const json = await res.json();
  return { ok: res.ok, status: res.status, json };
}

const act = 'act_896452193393277';
const pixel = '1321242129962420';
const results = {};
results.account = await get(`/${act}`, {
  fields: 'spend_cap,amount_spent,min_campaign_group_spend_cap,funding_source_details,currency,account_status,disable_reason',
});
results.funding = await get(`/${act}/funding_source_details_set`);
results.customconversions = await get(`/${act}/customconversions`, { fields: 'id,name,pixel,custom_event_type,is_archived' });
results.pixelstats = await get(`/${pixel}/stats`, { aggregation: 'event', start_time: Math.floor(Date.now() / 1000) - 30 * 86400 });
results.geo = await get('/search', { type: 'adgeolocation', q: 'Bangalore', location_types: JSON.stringify(['city']) });
results.interests = await get(`/${act}/targetingsearch`, { q: 'natural skincare', limit: 8 });
results.interests2 = await get('/search', { type: 'adinterest', q: 'Ayurveda' });
results.interests3 = await get('/search', { type: 'adinterest', q: 'organic soap' });

console.log(JSON.stringify(results, null, 2));
