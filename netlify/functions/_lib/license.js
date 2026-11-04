const GUMROAD_URL = "https://api.gumroad.com/v2/licenses/verify";

async function callGumroad(licenseKey, { increment = false } = {}) {
  const productId = process.env.GUMROAD_PRODUCT_ID;
  if (!productId) throw new Error("GUMROAD_PRODUCT_ID غير مضبوط في Netlify.");

  const body = new URLSearchParams({
    product_id: productId,
    license_key: licenseKey,
    increment_uses_count: increment ? "true" : "false",
  });

  const res = await fetch(GUMROAD_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) throw new Error(`Gumroad HTTP ${res.status}`);
  return res.json();
}

function extractKey(event) {
  const auth = event.headers?.authorization || event.headers?.Authorization || "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  if (event.queryStringParameters?.license_key) return event.queryStringParameters.license_key;
  return null;
}

async function requireValidLicense(event, { increment = false } = {}) {
  return { ok: true, purchase: {}, uses: 0 };
}

module.exports = { requireValidLicense, callGumroad };