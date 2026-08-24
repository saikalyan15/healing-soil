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
  if (!res.ok) throw new Error(`${res.status} ${path}: ${JSON.stringify(json.error || json)}`);
  return json;
}

const act = 'act_896452193393277';
const campaigns = await get(`/${act}/campaigns`, {
  fields: 'id,name,objective,status,effective_status,daily_budget,lifetime_budget,bid_strategy,created_time,updated_time,start_time,stop_time,special_ad_categories',
  limit: 50,
});
const insights = await get(`/${act}/insights`, {
  fields: 'spend,impressions,clicks,ctr,cpc,cpm,actions,purchase_roas,cost_per_action_type,reach',
  date_preset: 'last_90d',
});
const pixels = await get(`/${act}/adspixels`, { fields: 'id,name,is_unavailable,last_fired_time' });
const instagram = await get('/17841473235727704', { fields: 'id,username,name' });
const billing = await get(`/${act}`, {
  fields: 'funding_source_details,spend_cap,min_daily_budget,account_status,disable_reason,tos_accepted,business',
});

const campaignDetails = [];
for (const c of campaigns.data || []) {
  const adsets = await get(`/${c.id}/adsets`, {
    fields: 'id,name,status,effective_status,daily_budget,lifetime_budget,optimization_goal,billing_event,destination_type,targeting,promoted_object,start_time',
    limit: 20,
  });
  const ads = await get(`/${c.id}/ads`, {
    fields: 'id,name,status,effective_status,creative{id,name,title,body,object_story_spec,thumbnail_url}',
    limit: 20,
  });
  campaignDetails.push({
    campaign: c,
    adsets: (adsets.data || []).map((a) => ({
      id: a.id,
      name: a.name,
      status: a.status,
      effective_status: a.effective_status,
      daily_budget: a.daily_budget,
      lifetime_budget: a.lifetime_budget,
      optimization_goal: a.optimization_goal,
      billing_event: a.billing_event,
      destination_type: a.destination_type,
      geo: a.targeting?.geo_locations,
      age_min: a.targeting?.age_min,
      age_max: a.targeting?.age_max,
      genders: a.targeting?.genders,
      interests: a.targeting?.flexible_spec,
    })),
    ads: ads.data || [],
  });
}

console.log(JSON.stringify({ billing, pixels: pixels.data, instagram, last90d: insights.data, campaigns: campaignDetails }, null, 2));
