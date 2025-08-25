// Debug script to trace the OAuth flow
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

console.log("🔍 Debugging OAuth Flow...\n");

console.log("Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);
console.log(
  `GOOGLE_REDIRECT_URI: ${GOOGLE_REDIRECT_URI ? "✅ Set" : "❌ Missing"}`
);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log("\n❌ Missing required environment variables!");
  process.exit(1);
}

console.log("\n🔗 Generated OAuth URL:");
const scopes = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/userinfo.email",
];

const authUrl =
  `https://accounts.google.com/oauth/authorize?` +
  `client_id=${GOOGLE_CLIENT_ID}&` +
  `redirect_uri=${encodeURIComponent(
    GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/api/integrations/google/callback"
  )}&` +
  `scope=${encodeURIComponent(scopes.join(" "))}&` +
  `response_type=code&` +
  `access_type=offline&` +
  `prompt=consent`;

console.log(authUrl);

console.log("\n📋 URL Breakdown:");
console.log(`- Base URL: https://accounts.google.com/oauth/authorize`);
console.log(`- Client ID: ${GOOGLE_CLIENT_ID}`);
console.log(
  `- Redirect URI: ${
    GOOGLE_REDIRECT_URI ||
    "http://localhost:3000/api/integrations/google/callback"
  }`
);
console.log(`- Scopes: ${scopes.join(", ")}`);
console.log(`- Response Type: code`);
console.log(`- Access Type: offline`);
console.log(`- Prompt: consent`);

console.log("\n🎯 Testing Steps:");
console.log("1. Copy the URL above and paste it in your browser");
console.log("2. If you get 404, the issue is with Google Cloud Console");
console.log("3. If you see consent screen, the issue is with the callback");

console.log("\n🔍 Common 404 Causes:");
console.log("1. OAuth consent screen not configured");
console.log("2. Wrong Google Cloud project selected");
console.log("3. Client ID doesn't match the project");
console.log("4. APIs not enabled (Google Sheets API, Drive API)");

console.log("\n📋 Google Cloud Console Checklist:");
console.log("1. Go to https://console.cloud.google.com/");
console.log("2. Select the correct project");
console.log("3. Go to APIs & Services > OAuth consent screen");
console.log("4. Make sure it's configured (not 'Not configured')");
console.log("5. Go to APIs & Services > Credentials");
console.log("6. Check OAuth 2.0 Client ID matches your .env.local");
console.log(
  "7. Verify redirect URI is: http://localhost:3000/api/integrations/google/callback"
);
console.log("8. Go to APIs & Services > Library");
console.log("9. Enable Google Sheets API and Google Drive API");

console.log("\n⚠️  If you still get 404:");
console.log("- Try creating a completely new Google Cloud project");
console.log("- Set up OAuth consent screen from scratch");
console.log("- Create new OAuth 2.0 credentials");
console.log("- Make sure you're logged into the correct Google account");
