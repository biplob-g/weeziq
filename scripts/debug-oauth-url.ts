// Debug script to show the exact OAuth URL being generated
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

console.log("🔍 Debugging Google OAuth URL...\n");

console.log("Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);
console.log(
  `GOOGLE_REDIRECT_URI: ${GOOGLE_REDIRECT_URI ? "✅ Set" : "❌ Missing"}`
);

if (GOOGLE_CLIENT_ID && GOOGLE_REDIRECT_URI) {
  const scopes = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
  ];

  const authUrl =
    `https://accounts.google.com/oauth/authorize?` +
    `client_id=${GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(scopes.join(" "))}&` +
    `response_type=code&` +
    `access_type=offline&` +
    `prompt=consent`;

  console.log("\n🔗 Generated OAuth URL:");
  console.log(authUrl);

  console.log("\n📋 URL Components:");
  console.log(`- Client ID: ${GOOGLE_CLIENT_ID}`);
  console.log(`- Redirect URI: ${GOOGLE_REDIRECT_URI}`);
  console.log(`- Scopes: ${scopes.join(", ")}`);

  console.log("\n🔍 Troubleshooting Steps:");
  console.log("1. Copy the OAuth URL above and paste it in your browser");
  console.log(
    "2. If you get a 404, check your Google Cloud Console configuration:"
  );
  console.log("   - Go to https://console.cloud.google.com/");
  console.log("   - Select your project");
  console.log("   - Go to APIs & Services > Credentials");
  console.log(
    "   - Check that your OAuth 2.0 Client ID has the correct redirect URI"
  );
  console.log(
    "   - The redirect URI should be: http://localhost:3000/api/integrations/google/callback"
  );
  console.log("3. Make sure Google Sheets API and Drive API are enabled");
} else {
  console.log("\n❌ Missing required environment variables!");
  console.log(
    "Please check your .env.local file and ensure all Google OAuth variables are set."
  );
}
