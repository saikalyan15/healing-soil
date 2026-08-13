import { existsSync, readFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..', '..');
const envFile = resolve(projectRoot, '.env.local');
let accessToken = process.env.META_ADS_ACCESS_TOKEN?.trim();

// Read only the required key. Loading .env.local as executable shell code could
// run unrelated content, so parse the token as data instead.
if (!accessToken && existsSync(envFile)) {
  for (const envLine of readFileSync(envFile, 'utf8').split(/\r?\n/u)) {
    const match = envLine.match(/^\s*META_ADS_ACCESS_TOKEN\s*=\s*(.*)$/u);
    if (!match) continue;

    accessToken = match[1].trim();
    if (
      (accessToken.startsWith('"') && accessToken.endsWith('"')) ||
      (accessToken.startsWith("'") && accessToken.endsWith("'"))
    ) {
      accessToken = accessToken.slice(1, -1);
    }
    break;
  }
}

if (!accessToken) {
  console.error('Meta Ads token is missing from .env.local.');
  process.exit(1);
}

const serverEntry = resolve(
  scriptDir,
  'node_modules',
  'meta-ads-mcp-server',
  'dist',
  'index.js',
);

if (!existsSync(serverEntry)) {
  console.error('Meta Ads MCP dependencies are missing. Run npm ci in tools/meta-ads-mcp.');
  process.exit(1);
}

const child = spawn(process.execPath, [serverEntry], {
  stdio: 'inherit',
  env: {
    ...process.env,
    META_ADS_ACCESS_TOKEN: accessToken,
    // The registered audit connector is always read-only.
    META_ADS_ENABLE_WRITE_TOOLS: 'false',
  },
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => child.kill(signal));
}

child.on('error', (error) => {
  console.error(`Unable to start Meta Ads MCP: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code) => process.exit(code ?? 1));
