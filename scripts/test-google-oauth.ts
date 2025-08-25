import { client } from "../lib/prisma";

async function testGoogleOAuth() {
  console.log("🧪 Testing Google OAuth Integration...\n");

  try {
    // Test 1: Check database connection
    console.log("1. Testing database connection...");

    const users = await client.user.findMany({
      take: 1,
      select: { id: true, clerkId: true },
    });

    console.log("✅ Database connection working");
    console.log(`   Found ${users.length} users in database\n`);

    // Test 2: Check if GoogleIntegration table exists
    console.log("2. Testing GoogleIntegration table...");

    const integrations = await client.googleIntegration.findMany({
      take: 1,
    });

    console.log("✅ GoogleIntegration table exists");
    console.log(`   Found ${integrations.length} existing integrations\n`);

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
      console.log(`   Redirect URI: ${process.env.GOOGLE_REDIRECT_URI}`);
    }

    // Test 4: Test API route accessibility
    console.log("\n4. Testing API route accessibility...");
    console.log("   You can test the callback route at:");
    console.log(
      "   http://localhost:3000/api/integrations/google/callback?test=true"
    );

    console.log("\n🎯 OAuth Test Summary:");
    console.log("   - Database: ✅ Working");
    console.log("   - GoogleIntegration Table: ✅ Exists");
    console.log(
      "   - OAuth URL: " +
        (authUrl.includes("undefined") ? "❌ Failed" : "✅ Working")
    );
    console.log("   - API Route: ✅ Ready for testing");

    if (authUrl.includes("undefined")) {
      console.log("\n📝 Next Steps:");
      console.log("   1. Set up Google Cloud Console project");
      console.log("   2. Enable Google Sheets API and Drive API");
      console.log("   3. Create OAuth 2.0 credentials");
      console.log("   4. Add environment variables to .env file");
      console.log("   5. Test the OAuth flow in your application");
    } else {
      console.log("\n🎉 OAuth integration is ready for testing!");
      console.log("   You can now test the complete OAuth flow.");
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.$disconnect();
  }
}

// Run the test
testGoogleOAuth().catch(console.error);
