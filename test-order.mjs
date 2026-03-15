import fs from 'fs';
import path from 'path';

/**
 * STANDALONE TEST SCRIPT: Insert an Order into SoapLedger
 * 
 * Usage: node test-order.mjs
 */

async function runTest() {
  console.log('--- SoapLedger Order Integration Test ---');

  // 1. Load Env Vars manually from .env.local
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.error('Error: .env.local file not found');
    return;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = Object.fromEntries(
    envContent.split('\n')
      .filter(line => line.includes('=') && !line.startsWith('#'))
      .map(line => {
        const [key, ...val] = line.split('=');
        return [key.trim(), val.join('=').trim().replace(/^["']|["']$/g, '')];
      })
  );

  const API_URL = env.SOAPLEDGER_API_URL;
  const API_KEY = env.SOAPLEDGER_API_KEY;

  if (!API_URL || !API_KEY) {
    console.error('Error: SOAPLEDGER_API_URL or SOAPLEDGER_API_KEY missing in .env.local');
    return;
  }

  // 2. Fetch a real product ID first to make the test valid
  console.log('Fetching products to get a valid ID...');
  const prodRes = await fetch(`${API_URL.replace(/\/$/, '')}/api/products`, {
    headers: { 'x-api-key': API_KEY }
  });
  
  if (!prodRes.ok) {
    console.error('Failed to fetch products:', prodRes.status, await prodRes.text());
    return;
  }
  
  const products = await prodRes.json();
  if (!products.length) {
    console.error('No products found in SoapLedger to test with.');
    return;
  }

  const testProductId = products[0].id;
  const testPrice = parseFloat(products[0].price) || 250;

  // 3. Construct the Test Payload
  const testOrder = {
    customer: {
      name: "Test User (Script)",
      phone: "919876543210",
      address: "123 Test Street, Panjim, Goa 403001"
    },
    items: [
      {
        product_id: testProductId,
        price: testPrice,
        qty: 1
      }
    ],
    shipping: 100,
    source: "Website Test Script"
  };

  console.log('\nSending Payload:', JSON.stringify(testOrder, null, 2));

  // 4. Submit the Order
  const res = await fetch(`${API_URL.replace(/\/$/, '')}/api/orders/incoming`, {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(testOrder)
  });

  const status = res.status;
  const responseBody = await res.text();

  console.log('\n--- Result ---');
  console.log('Status Code:', status);
  console.log('Response Body:', responseBody);

  if (status >= 200 && status < 300) {
    console.log('\n✅ SUCCESS: Order should now be visible in SoapLedger.');
  } else {
    console.log('\n❌ FAILED: Check the error message above.');
  }
}

runTest().catch(err => console.error('Unexpected Error:', err));
