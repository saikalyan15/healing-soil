const fs = require('fs');
const path = require('path');

/**
 * node scripts/stamp-batch.js <dataFile> <count>
 * e.g. node scripts/stamp-batch.js src/data/comparisons.ts 5
 */

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: node scripts/stamp-batch.js <dataFile> <count>');
  process.exit(1);
}

const dataFile = args[0];
const count = parseInt(args[1], 10);

if (isNaN(count)) {
  console.error('Invalid count');
  process.exit(1);
}

const filePath = path.resolve(process.cwd(), dataFile);
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

const today = new Date().toISOString().split('T')[0];
let stampedCount = 0;
const stampedSlugs = [];

// Find entries that have publishedAt: null
// We'll look for objects starting with { and containing publishedAt: null
// We'll use a simple state machine or regex to find the top-level slug.

const entryRegex = /\{\s+slug:\s*['"]([^'"]+)['"][\s\S]*?publishedAt:\s*null/g;

content = content.replace(entryRegex, (match, slug) => {
  if (stampedCount < count) {
    stampedCount++;
    stampedSlugs.push(slug);
    return match.replace('publishedAt: null', `publishedAt: '${today}'`);
  }
  return match;
});

if (stampedCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully stamped ${stampedCount} entries in ${dataFile} with ${today}:`);
  stampedSlugs.forEach(slug => console.log(` - ${slug}`));
} else {
  console.log('No entries found with publishedAt: null');
}
