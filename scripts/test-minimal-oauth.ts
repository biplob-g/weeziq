// Minimal OAuth test - most basic configuration
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

console.log("🧪 Minimal OAuth Test...\n");

if (!GOOGLE_CLIENT_ID) {
  console.log("❌ GOOGLE_CLIENT_ID not found");
  process.exit(1);
}

console.log("✅ GOOGLE_CLIENT_ID found:", GOOGLE_CLIENT_ID);

// Test 1: Most basic OAuth URL (no scopes, no extra params)
const basicUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&response_type=code`;

console.log("\n🔗 Test 1 - Basic OAuth URL (no scopes):");
console.log(basicUrl);

// Test 2: With minimal scope
const minimalUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code`;

console.log("\n🔗 Test 2 - Minimal scope:");
console.log(minimalUrl);

// Test 3: With all parameters (your current setup)
const fullUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log("\n🔗 Test 3 - Full setup (your current):");
console.log(fullUrl);

console.log("\n📋 Test these URLs in order:");
console.log("1. Try Test 1 first (most basic)");
console.log("2. If that works, try Test 2");
console.log("3. If that works, try Test 3");
console.log("4. If all fail, the issue is Google Cloud Console configuration");

console.log("\n🎯 Expected Results:");
console.log("- If you see Google's consent screen: ✅ OAuth is working");
console.log("- If you see 404: ❌ Google Cloud Console configuration issue");
console.log(
  "- If you see 'redirect_uri_mismatch': ❌ Redirect URI not configured correctly"
);

console.log("\n🔍 If all tests fail:");
console.log("- Your OAuth consent screen is not configured");
console.log("- You're in the wrong Google Cloud project");
console.log("- The client ID doesn't match the project");
console.log("- Required APIs are not enabled");
