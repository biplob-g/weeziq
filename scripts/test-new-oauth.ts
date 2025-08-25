// Test script for new OAuth credentials
import { config } from "dotenv";
import { resolve } from "path";

// Load environment variables
config({ path: resolve(process.cwd(), ".env.local") });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

console.log("🧪 Testing New OAuth Credentials...\n");

console.log("Current Environment Variables:");
console.log(`GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID ? "✅ Set" : "❌ Missing"}`);
console.log(
  `GOOGLE_CLIENT_SECRET: ${GOOGLE_CLIENT_SECRET ? "✅ Set" : "❌ Missing"}`
);

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.log("\n❌ Please add your new OAuth credentials to .env.local file");
  console.log("Format:");
  console.log("GOOGLE_CLIENT_ID=your-new-client-id");
  console.log("GOOGLE_CLIENT_SECRET=your-new-client-secret");
  process.exit(1);
}

console.log("\n🔗 Generated OAuth URLs for Testing:");

// Test with minimal scope first
const minimalUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/userinfo.email"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log("\n1. **Minimal Scope (userinfo.email):**");
console.log(minimalUrl);

// Test with full scopes
const fullUrl = `https://accounts.google.com/oauth/authorize?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  "http://localhost:3000/api/integrations/google/callback"
)}&scope=${encodeURIComponent(
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive"
)}&response_type=code&access_type=offline&prompt=consent`;

console.log("\n2. **Full Scopes (spreadsheets + drive):**");
console.log(fullUrl);

console.log("\n📋 Testing Instructions:");
console.log("1. Copy the minimal scope URL and paste it in your browser");
console.log("2. If it works, you should see Google's consent screen");
console.log(
  "3. If it still shows 404, there's an issue with the Google Cloud Console setup"
);
console.log("4. Try the full scope URL after the minimal one works");

console.log("\n🔍 If you still get 404:");
console.log("- Double-check the OAuth consent screen is configured");
console.log("- Verify the APIs are enabled");
console.log("- Make sure you're in the correct Google Cloud project");
console.log("- Check that the client ID matches exactly");
