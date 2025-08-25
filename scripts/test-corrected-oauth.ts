// Test script for the corrected OAuth URL
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log("🧪 Testing Corrected OAuth URL...\n");

console.log("Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log("\n❌ Missing environment variables!");
  process.exit(1);
}

console.log("\n🔗 Corrected OAuth URL:");
const correctedUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log(correctedUrl);

console.log("\n📋 URL Components:");
console.log(`- Client ID: ${GOOGLE_CLIENT_ID}`);
console.log(
  `- Redirect URI: http://localhost:3000/api/integrations/google/callback`
);
console.log(`- Scopes: spreadsheets, userinfo.email`);
console.log(`- Response Type: code`);
console.log(`- Access Type: offline`);
console.log(`- Prompt: consent`);

console.log("\n🎯 Testing Instructions:");
console.log("1. Copy the URL above and paste it in your browser");
console.log("2. You should see Google's consent screen");
console.log("3. Authorize the app");
console.log("4. You'll be redirected to your callback URL");

console.log("\n🔍 Expected Flow:");
console.log("1. Browser opens Google consent screen");
console.log("2. You see permissions for Google Sheets and email access");
console.log(
  "3. After authorization, redirect to: http://localhost:3000/api/integrations/google/callback?code=..."
);
console.log("4. The callback should process the authorization code");
console.log(
  "5. You should be redirected back to /integration with success message"
);

console.log("\n⚠️  If you still get 404:");
console.log(
  "- Make sure OAuth consent screen is configured in Google Cloud Console"
);
console.log("- Verify the client ID is correct");
console.log("- Check that the redirect URI is added to OAuth credentials");
console.log("- Ensure you're in the correct Google Cloud project");
