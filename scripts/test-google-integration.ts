import { client } from "../lib/prisma";

async function testGoogleIntegration() {
  console.log("🧪 Testing Google Sheets Integration...\n");

  try {
    // Test 1: Check if database tables exist
    console.log("1. Testing database schema...");

    // Try to query the GoogleIntegration table
    const integrations = await client.googleIntegration.findMany({
      take: 1,
    });

    console.log("✅ Database schema is working");
    console.log(`   Found ${integrations.length} existing integrations\n`);

    // Test 2: Check environment variables
    console.log("2. Testing environment variables...");

    const requiredVars = [
      "GOOGLE_CLIENT_ID",
      "GOOGLE_CLIENT_SECRET",
      "GOOGLE_REDIRECT_URI",
    ];

    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
      console.log("❌ Missing environment variables:");
      missingVars.forEach((varName) => console.log(`   - ${varName}`));
      console.log("\n   Please set these in your .env file\n");
    } else {
      console.log("✅ All required environment variables are set\n");
    }

    // Test 3: Test OAuth URL generation
    console.log("3. Testing OAuth URL generation...");

    const scopes = [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive",
    ];

    const authUrl =
      `https://accounts.google.com/oauth/authorize?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(
        process.env.GOOGLE_REDIRECT_URI || ""
      )}&` +
      `scope=${encodeURIComponent(scopes.join(" "))}&` +
      `response_type=code&` +
      `access_type=offline&` +
      `prompt=consent`;

    if (authUrl.includes("undefined")) {
      console.log(
        "❌ OAuth URL generation failed - missing environment variables"
      );
    } else {
      console.log("✅ OAuth URL generation working");
      console.log(`   URL length: ${authUrl.length} characters`);
    }

    console.log("\n🎯 Integration Test Summary:");
    console.log("   - Database: ✅ Working");
    console.log(
      "   - Environment: " +
        (missingVars.length === 0 ? "✅ Set" : "❌ Missing")
    );
    console.log(
      "   - OAuth URL: " +
        (authUrl.includes("undefined") ? "❌ Failed" : "✅ Working")
    );

    if (missingVars.length > 0) {
      console.log("\n📝 Next Steps:");
      console.log("   1. Set up Google Cloud Console project");
      console.log("   2. Enable Google Sheets API and Drive API");
      console.log("   3. Create OAuth 2.0 credentials");
      console.log("   4. Add environment variables to .env file");
      console.log("   5. Run database migration: npx prisma migrate dev");
    } else {
      console.log("\n🎉 Integration is ready for testing!");
      console.log("   You can now test the OAuth flow in your application.");
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.$disconnect();
  }
}

// Run the test
testGoogleIntegration().catch(console.error);
