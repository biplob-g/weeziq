// Simple OAuth test with minimal configuration
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

console.log("🔍 Simple OAuth Test...\n");

if (!GOOGLE_CLIENT_ID) {
  console.log("❌ GOOGLE_CLIENT_ID not found in .env.local");
  process.exit(1);
}

console.log("✅ GOOGLE_CLIENT_ID found:", GOOGLE_CLIENT_ID);

// Test with the most basic OAuth configuration
const basicUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code`;

console.log("\n🔗 Basic OAuth URL (no prompt, no access_type):");
console.log(basicUrl);

console.log("\n🔗 Alternative URL (with prompt=consent):");
const promptUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&prompt=consent`;
console.log(promptUrl);

console.log("\n🔗 Alternative URL (with access_type=offline):");
const offlineUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&access_type=offline`;
console.log(offlineUrl);

console.log("\n📋 Test these URLs in order:");
console.log("1. Try the basic URL first");
console.log("2. If that fails, try the prompt URL");
console.log("3. If that fails, try the offline URL");
console.log(
  "4. If all fail, the issue is with Google Cloud Console configuration"
);

console.log("\n🎯 Expected Results:");
console.log("- If you see Google's consent screen: ✅ OAuth is working");
console.log("- If you see 404: ❌ Google Cloud Console configuration issue");
console.log(
  "- If you see 'redirect_uri_mismatch': ❌ Redirect URI not configured correctly"
);
