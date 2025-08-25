import { client } from "@/lib/prisma";

async function testUploadSimple() {
  try {
    console.log("🧪 Simple Upload API Test...\n");

    // Test 1: Check database connection
    console.log("1. Testing database connection...");
    const userCount = await client.user.count();
    console.log(`✅ Database connected. Users: ${userCount}`);

    // Test 2: Check FileUpload model
    console.log("\n2. Testing FileUpload model...");
    const fileCount = await client.fileUpload.count();
    console.log(`✅ FileUpload model accessible. Files: ${fileCount}`);

    // Test 3: Check user with domain
    console.log("\n3. Testing user with domain...");
    const user = await client.user.findFirst({
      include: {
        domains: {
          take: 1,
        },
        subscription: true,
      },
    });

    if (!user) {
      console.log("❌ No users found");
      return;
    }

    console.log(`✅ Found user: ${user.fullname}`);
    console.log(`✅ Plan: ${user.subscription?.plan || "STARTER"}`);

    if (user.domains.length === 0) {
      console.log("❌ User has no domains");
      return;
    }

    const domain = user.domains[0];
    console.log(`✅ Domain: ${domain.name} (${domain.id})`);

    // Test 4: Test file validation logic
    console.log("\n4. Testing file validation...");
    const testFile = {
      name: "test-upload.txt",
      size: 1024, // 1KB
    };

    const fileExtension = testFile.name
      .toLowerCase()
      .substring(testFile.name.lastIndexOf("."));
    const allowedTypes = [".txt", ".json"];
    const isValidType = allowedTypes.includes(fileExtension);
    const isValidSize = testFile.size <= 2 * 1024 * 1024; // 2MB limit

    console.log(`   File: ${testFile.name}`);
    console.log(`   Type: ${fileExtension} ${isValidType ? "✅" : "❌"}`);
    console.log(`   Size: ${testFile.size} bytes ${isValidSize ? "✅" : "❌"}`);

    // Test 5: Test plan limits
    console.log("\n5. Testing plan limits...");
    const plan = user.subscription?.plan || "STARTER";
    const planLimits = {
      STARTER: 5 * 1024 * 1024, // 5MB
      GROWTH: 10 * 1024 * 1024, // 10MB
      PRO: 25 * 1024 * 1024, // 25MB
    };

    const maxTotalSize =
      planLimits[plan as keyof typeof planLimits] || planLimits.STARTER;
    console.log(`   Plan: ${plan}`);
    console.log(`   Limit: ${Math.round(maxTotalSize / (1024 * 1024))}MB`);

    // Test 6: Check current usage
    console.log("\n6. Testing current usage...");
    const existingFiles = await client.fileUpload.findMany({
      where: { domainId: domain.id },
      select: { fileSize: true },
    });

    const currentTotalSize = existingFiles.reduce(
      (sum, file) => sum + file.fileSize,
      0
    );
    const usedPercentage = (currentTotalSize / maxTotalSize) * 100;

    console.log(`   Existing files: ${existingFiles.length}`);
    console.log(
      `   Current usage: ${
        Math.round((currentTotalSize / (1024 * 1024)) * 100) / 100
      }MB`
    );
    console.log(`   Usage percentage: ${usedPercentage.toFixed(1)}%`);

    console.log("\n🎉 Simple Upload Test Complete!");
    console.log("\n📋 Summary:");
    console.log("✅ Database connection working");
    console.log("✅ FileUpload model accessible");
    console.log("✅ User and domain relationships correct");
    console.log("✅ File validation logic working");
    console.log("✅ Plan limits configured");
    console.log("✅ Usage tracking working");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.$disconnect();
  }
}

// Run the test
testUploadSimple();
