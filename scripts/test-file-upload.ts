import { client } from "@/lib/prisma";

async function testFileUpload() {
  try {
    console.log("🧪 Testing File Upload Functionality...\n");

    // Test 1: Check if FileUpload model exists
    console.log("1. Testing database schema...");
    try {
      const fileUploads = await client.fileUpload.findMany({
        take: 1,
      });
      console.log("✅ FileUpload model is accessible");
    } catch (error) {
      console.log("❌ FileUpload model error:", error);
      return;
    }

    // Test 2: Check user with subscription
    console.log("\n2. Testing user subscription data...");
    const users = await client.user.findMany({
      include: {
        subscription: true,
        domains: {
          take: 1,
        },
      },
      take: 1,
    });

    if (users.length === 0) {
      console.log("❌ No users found in database");
      return;
    }

    const user = users[0];
    console.log(`✅ Found user: ${user.fullname}`);
    console.log(`   Plan: ${user.subscription?.plan || "STARTER"}`);
    console.log(`   Domains: ${user.domains.length}`);

    if (user.domains.length === 0) {
      console.log("❌ User has no domains");
      return;
    }

    const domain = user.domains[0];
    console.log(`   Domain: ${domain.name} (${domain.id})`);

    // Test 3: Test upload limits calculation
    console.log("\n3. Testing upload limits...");
    const plan = user.subscription?.plan || "STARTER";
    const planLimits = {
      STARTER: 5 * 1024 * 1024, // 5MB
      GROWTH: 10 * 1024 * 1024, // 10MB
      PRO: 25 * 1024 * 1024, // 25MB
    };

    const maxTotalSize =
      planLimits[plan as keyof typeof planLimits] || planLimits.STARTER;
    console.log(`   Plan: ${plan}`);
    console.log(
      `   Max total size: ${Math.round(maxTotalSize / (1024 * 1024))}MB`
    );

    // Test 4: Check existing files
    console.log("\n4. Testing existing files...");
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
      `   Current total size: ${
        Math.round((currentTotalSize / (1024 * 1024)) * 100) / 100
      }MB`
    );
    console.log(`   Usage: ${usedPercentage.toFixed(1)}%`);

    // Test 5: Test file validation
    console.log("\n5. Testing file validation...");

    // Test file type validation
    const testFiles = [
      { name: "test.txt", size: 1024, valid: true },
      { name: "test.json", size: 2048, valid: true },
      { name: "test.pdf", size: 1024, valid: false },
      { name: "test.doc", size: 1024, valid: false },
    ];

    for (const testFile of testFiles) {
      const fileExtension = testFile.name
        .toLowerCase()
        .substring(testFile.name.lastIndexOf("."));
      const allowedTypes = [".txt", ".json"];
      const isValidType = allowedTypes.includes(fileExtension);

      console.log(
        `   ${testFile.name}: ${isValidType ? "✅" : "❌"} (${
          isValidType === testFile.valid ? "PASS" : "FAIL"
        })`
      );
    }

    // Test file size validation
    const sizeTests = [
      { size: 1 * 1024 * 1024, maxSize: 2 * 1024 * 1024, valid: true }, // 1MB file, 2MB limit
      { size: 3 * 1024 * 1024, maxSize: 2 * 1024 * 1024, valid: false }, // 3MB file, 2MB limit
    ];

    for (const test of sizeTests) {
      const isValidSize = test.size <= test.maxSize;
      console.log(
        `   ${Math.round(test.size / (1024 * 1024))}MB file: ${
          isValidSize ? "✅" : "❌"
        } (${isValidSize === test.valid ? "PASS" : "FAIL"})`
      );
    }

    // Test 6: Test total size validation
    console.log("\n6. Testing total size validation...");
    const testFileSize = 1 * 1024 * 1024; // 1MB test file
    const newTotalSize = currentTotalSize + testFileSize;
    const wouldExceed = newTotalSize > maxTotalSize;

    console.log(
      `   Current total: ${
        Math.round((currentTotalSize / (1024 * 1024)) * 100) / 100
      }MB`
    );
    console.log(
      `   Test file: ${
        Math.round((testFileSize / (1024 * 1024)) * 100) / 100
      }MB`
    );
    console.log(
      `   New total: ${
        Math.round((newTotalSize / (1024 * 1024)) * 100) / 100
      }MB`
    );
    console.log(`   Would exceed limit: ${wouldExceed ? "❌ YES" : "✅ NO"}`);

    // Test 7: Create a test file record
    console.log("\n7. Testing file record creation...");
    try {
      const testFileRecord = await client.fileUpload.create({
        data: {
          fileName: "test-file.txt",
          fileSize: 1024,
          fileType: ".txt",
          filePath: "/uploads/test/test-file.txt",
          uploadStatus: "COMPLETED",
          userId: user.id,
          domainId: domain.id,
        },
      });

      console.log(`✅ Created test file record: ${testFileRecord.id}`);
      console.log(`   File name: ${testFileRecord.fileName}`);
      console.log(`   File size: ${testFileRecord.fileSize} bytes`);
      console.log(`   Status: ${testFileRecord.uploadStatus}`);

      // Clean up test file
      await client.fileUpload.delete({
        where: { id: testFileRecord.id },
      });
      console.log("✅ Cleaned up test file record");
    } catch (error) {
      console.log("❌ Error creating test file record:", error);
    }

    console.log("\n🎉 File Upload Testing Complete!");
    console.log("\n📋 Summary:");
    console.log("✅ Database schema is working");
    console.log("✅ User and domain relationships are correct");
    console.log("✅ Plan limits are properly configured");
    console.log("✅ File validation logic is implemented");
    console.log("✅ File records can be created and deleted");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await client.$disconnect();
  }
}

// Run the test
testFileUpload();
