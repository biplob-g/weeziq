#!/usr/bin/env tsx

/**
 * Check Existing Domains
 *
 * This script checks what domains exist in the database
 */

import { client } from "../lib/prisma";

async function main() {
  console.log("🔍 Checking existing domains...");

  try {
    const domains = await client.domain.findMany({
      select: {
        id: true,
        name: true,
        icon: true,
      },
    });

    console.log(`📊 Found ${domains.length} domains:`);
    domains.forEach((domain, index) => {
      console.log(`  ${index + 1}. ${domain.name} (${domain.id})`);
    });

    if (domains.length === 0) {
      console.log("ℹ️ No domains found. You may need to create one first.");
    }
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
}

// Run the script
main()
  .then(() => {
    console.log("🏁 Script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
