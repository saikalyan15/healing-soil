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
if (!token) {
  console.error('Missing META_ADS_ACCESS_TOKEN');
  process.exit(1);
}

const API = 'https://graph.facebook.com/v22.0';
async function get(path, params = {}) {
  const url = new URL(`${API}${path}`);
  url.searchParams.set('access_token', token);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v));
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok) {
    const err = json?.error || json;
    throw new Error(`${res.status} ${path}: ${JSON.stringify(err)}`);
  }
  return json;
}

const me = await get('/me', { fields: 'id,name' });
const perms = await get('/me/permissions');
const accounts = await get('/me/adaccounts', {
  fields: 'id,name,account_status,currency,timezone_name,amount_spent,balance,disable_reason,funding_source_details,business,account_id',
  limit: 50,
});
const pages = await get('/me/accounts', { fields: 'id,name,instagram_business_account', limit: 50 });

console.log(JSON.stringify({
  me: { id: me.id, name: me.name },
  permissions: (perms.data || []).map((p) => `${p.permission}:${p.status}`),
  accounts: accounts.data,
  pages: pages.data,
}, null, 2));
