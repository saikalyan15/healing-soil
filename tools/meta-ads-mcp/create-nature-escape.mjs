import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Blob } from 'node:buffer';

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
if (!token) {
  console.error('Missing token');
  process.exit(1);
}

const API = 'https://graph.facebook.com/v22.0';
const ACT = 'act_896452193393277';
const PAGE_ID = '593186757220288';
const IG_ID = '17841473235727704';
const PIXEL_ID = '1321242129962420';
const IMAGE_PATH =
  'C:/Users/sai/.cursor/projects/e-Projects-Healing-Soil-Suite-healing-soil/assets/c__Users_sai_AppData_Roaming_Cursor_User_workspaceStorage_eb70755b710b068d4437636a729efa23_images_Soaps_from_Goa-c5d9f516-5b6d-4893-8027-99c4a798c851.jpg';

const LANDING =
  'https://healingsoil.in/?utm_source=facebook&utm_medium=paid&utm_campaign=hs_nature_escape_blr_aug2026&utm_content=botanical_poster';

const PRIMARY_TEXT = `Handmade soap from a farm in Goa. No SLS, no parabens, no synthetic fragrance.

Four bars for ₹1,000, and shipping is free on that order.

If you have already moved off commercial soap, this is a quiet place to start.`;

const HEADLINE = 'Handmade soap from a Goa farm';
const DESCRIPTION = 'Starter bundle of four bars for ₹1,000.';

async function graphGet(path, params = {}) {
  const url = new URL(`${API}${path}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, typeof v === 'object' ? JSON.stringify(v) : String(v));
  }
  const res = await fetch(url);
  const json = await res.json();
  return { ok: res.ok, status: res.status, json };
}

async function graphPost(path, body) {
  const url = new URL(`${API}${path}`);
  const form = new URLSearchParams();
  form.set('access_token', token);
  for (const [k, v] of Object.entries(body)) {
    if (v === undefined || v === null) continue;
    form.set(k, typeof v === 'string' ? v : String(v));
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });
  const json = await res.json();
  return { ok: res.ok, status: res.status, json };
}

function fail(step, result) {
  console.error(`FAIL ${step} ${result.status}`);
  console.error(JSON.stringify(result.json, null, 2));
  process.exit(1);
}

const log = {};

const cap = await graphPost(`/${ACT}`, { spend_cap: 1500000 });
log.spend_cap = { ok: cap.ok, status: cap.status, json: cap.json };
if (!cap.ok) {
  const alt = await graphPost(`/${ACT}`, { spend_cap: 500000 });
  log.spend_cap_alt = { ok: alt.ok, status: alt.status, json: alt.json };
}

const bytes = readFileSync(IMAGE_PATH);
const form = new FormData();
form.append('access_token', token);
form.append('filename', new Blob([bytes], { type: 'image/jpeg' }), 'healing-soil-nature-escape.jpg');
const uploadRes = await fetch(`${API}/${ACT}/adimages`, { method: 'POST', body: form });
const uploadJson = await uploadRes.json();
log.upload = { ok: uploadRes.ok, status: uploadRes.status, json: uploadJson };
if (!uploadRes.ok) fail('upload', log.upload);

const images = uploadJson.images || {};
const imageHash = Object.values(images)[0]?.hash;
if (!imageHash) fail('image_hash', log.upload);
log.image_hash = imageHash;

const campaign = await graphPost(`/${ACT}/campaigns`, {
  name: 'HS | Website Sales | Nature Escape | Bengaluru | Aug 2026',
  objective: 'OUTCOME_SALES',
  status: 'PAUSED',
  special_ad_categories: JSON.stringify([]),
  daily_budget: '15000',
  bid_strategy: 'LOWEST_COST_WITHOUT_CAP',
});
log.campaign = campaign;
if (!campaign.ok) fail('campaign', campaign);
const campaignId = campaign.json.id;

const targeting = {
  geo_locations: {
    cities: [
      {
        key: '1017930',
        radius: 40,
        distance_unit: 'kilometer',
      },
    ],
    location_types: ['home', 'recent'],
  },
  age_min: 28,
  age_max: 45,
  genders: [2],
  targeting_automation: { advantage_audience: 1 },
};

let adset = await graphPost(`/${ACT}/adsets`, {
  name: 'Bengaluru women 28-45 | Purchase | Advantage+',
  campaign_id: campaignId,
  optimization_goal: 'OFFSITE_CONVERSIONS',
  billing_event: 'IMPRESSIONS',
  status: 'PAUSED',
  destination_type: 'WEBSITE',
  promoted_object: JSON.stringify({
    pixel_id: PIXEL_ID,
    custom_event_type: 'PURCHASE',
  }),
  targeting: JSON.stringify(targeting),
  attribution_spec: JSON.stringify([
    { event_type: 'CLICK_THROUGH', window_days: 7 },
    { event_type: 'VIEW_THROUGH', window_days: 1 },
  ]),
});
log.adset = adset;

if (!adset.ok) {
  adset = await graphPost(`/${ACT}/adsets`, {
    name: 'Bengaluru women 28-45 | Landing page views',
    campaign_id: campaignId,
    optimization_goal: 'LANDING_PAGE_VIEWS',
    billing_event: 'IMPRESSIONS',
    status: 'PAUSED',
    destination_type: 'WEBSITE',
    targeting: JSON.stringify(targeting),
  });
  log.adset_fallback = adset;
  if (!adset.ok) fail('adset', adset);
}
const adsetId = adset.json.id;

const creative = await graphPost(`/${ACT}/adcreatives`, {
  name: 'Nature Escape botanical poster | Shop | Aug 2026',
  object_story_spec: JSON.stringify({
    page_id: PAGE_ID,
    instagram_user_id: IG_ID,
    link_data: {
      image_hash: imageHash,
      link: LANDING,
      message: PRIMARY_TEXT,
      name: HEADLINE,
      description: DESCRIPTION,
      call_to_action: {
        type: 'SHOP_NOW',
        value: { link: LANDING },
      },
    },
  }),
  url_tags: 'utm_source=facebook&utm_medium=paid&utm_campaign=hs_nature_escape_blr_aug2026&utm_content=botanical_poster',
});
log.creative = creative;
if (!creative.ok) fail('creative', creative);
const creativeId = creative.json.id;

const ad = await graphPost(`/${ACT}/ads`, {
  name: 'Nature Escape botanical poster | Aug 2026',
  adset_id: adsetId,
  creative: JSON.stringify({ creative_id: creativeId }),
  status: 'PAUSED',
});
log.ad = ad;
if (!ad.ok) fail('ad', ad);

const preview = await graphGet(`/${ad.json.id}/previews`, {
  ad_format: 'DESKTOP_FEED_STANDARD',
});
log.preview = { ok: preview.ok, status: preview.status, has_html: Boolean(preview.json?.data?.[0]?.body) };

const account = await graphGet(`/${ACT}`, {
  fields: 'spend_cap,amount_spent,funding_source_details,account_status',
});
log.account_after = account.json;

console.log(JSON.stringify(log, null, 2));
