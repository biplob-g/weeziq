// Test script for fresh OAuth credentials after proper setup
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log("🧪 Testing Fresh OAuth Setup...\n");

console.log("Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log(
    "\n❌ Please complete the Google Cloud Console setup and add credentials to .env.local"
  );
  console.log("\n📋 Setup Checklist:");
  console.log("1. ✅ Create new Google Cloud project");
  console.log("2. ✅ Enable Google Sheets API and Drive API");
  console.log("3. ✅ Configure OAuth consent screen");
  console.log("4. ✅ Create OAuth 2.0 client ID");
  console.log("5. ❌ Add credentials to .env.local file");
  process.exit(1);
}

console.log("\n🔗 Test OAuth URL:");
const testUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log(testUrl);

console.log("\n📋 Testing Instructions:");
console.log("1. Copy the URL above and paste it in your browser");
console.log("2. You should see Google's consent screen");
console.log("3. If you see 404, the OAuth consent screen is not configured");
console.log("4. If you see 'redirect_uri_mismatch', the redirect URI is wrong");

console.log("\n🎯 Expected Flow:");
console.log("1. Browser opens Google consent screen");
console.log("2. You authorize the app");
console.log(
  "3. You're redirected to: http://localhost:3000/api/integrations/google/callback?code=..."
);
console.log("4. The integration should complete successfully");

console.log("\n🔍 If you still get 404:");
console.log("- Make sure you're in the correct Google Cloud project");
console.log("- Verify OAuth consent screen is configured");
console.log("- Check that the client ID matches exactly");
console.log("- Ensure you're logged into the correct Google account");
