// Test script to check Google APIs and OAuth configuration
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log("🔍 Testing Google APIs and OAuth Configuration...\n");

console.log("Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log("\n❌ Missing required environment variables!");
  process.exit(1);
}

console.log("\n🔍 Troubleshooting Steps for 404 Error:");

console.log("\n1. **Check Google Cloud Console Project:**");
console.log("   - Go to: https://console.cloud.google.com/");
console.log("   - Make sure you're in the correct project");
console.log("   - Project should match client ID: " + GOOGLE_CLIENT_ID);

console.log("\n2. **Enable Required APIs:**");
console.log("   - Go to: APIs & Services > Library");
console.log("   - Search for and enable: 'Google Sheets API'");
console.log("   - Search for and enable: 'Google Drive API'");
console.log("   - Search for and enable: 'Google+ API' (if available)");

console.log("\n3. **Check OAuth Consent Screen:**");
console.log("   - Go to: APIs & Services > OAuth consent screen");
console.log("   - Make sure the app is configured");
console.log("   - Add your email as a test user if in testing mode");

console.log("\n4. **Verify OAuth Credentials:**");
console.log("   - Go to: APIs & Services > Credentials");
console.log("   - Find your OAuth 2.0 Client ID");
console.log("   - Check that it's configured for 'Web application'");
console.log("   - JavaScript origins should be: http://localhost:3000");
console.log(
  "   - Redirect URIs should be: http://localhost:3000/api/integrations/google/callback"
);

console.log("\n5. **Test OAuth URL Components:**");
const testUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log("\n   Test URL:");
console.log(testUrl);

console.log("\n6. **Alternative Test URLs:**");
console.log("   Try these variations:");

// Test with different scopes
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/drive",
];

scopes.forEach((scope) => {
  const altUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    "http://localhost:3000/api/integrations/google/callback"
  )}&scope=${encodeURIComponent(
    scope
  )}&response_type=code&access_type=offline&prompt=consent`;
  console.log(`   - ${scope}:`);
  console.log(`     ${altUrl}`);
});

console.log("\n7. **Check for Common Issues:**");
console.log("   - Make sure you're not in incognito/private browsing mode");
console.log("   - Clear browser cache and cookies");
console.log("   - Try a different browser");
console.log("   - Check if your Google account has 2FA enabled");
console.log("   - Make sure you're logged into the correct Google account");

console.log("\n8. **Verify Project Status:**");
console.log("   - Check if the project is active and not suspended");
console.log("   - Verify billing is set up (if required)");
console.log("   - Check if there are any API quotas exceeded");

console.log("\n🎯 Next Steps:");
console.log(
  "1. Follow steps 1-4 above to verify your Google Cloud Console setup"
);
console.log("2. Try the test URLs in step 5-6");
console.log("3. If still getting 404, try creating a new OAuth 2.0 client ID");
console.log("4. Check Google Cloud Console logs for any errors");
