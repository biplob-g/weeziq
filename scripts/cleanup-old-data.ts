#!/usr/bin/env tsx

/**
 * Cleanup Script for Old Chat Rooms and Customers
 *
 * This script automatically deletes chat rooms and customers older than 14 days
 * to maintain the 14-day retention policy.
 *
 * Usage:
 * npm run cleanup:old-data
 *
 * Or run directly:
 * npx tsx scripts/cleanup-old-data.ts
 */

import { onCleanupOldData } from "../actions/conversation";

async function main() {
  console.log("🚀 Starting automatic cleanup of old data...");
  console.log("📅 Retention period: 14 days");
  console.log("⏰ Current time:", new Date().toISOString());
  console.log("");

  try {
    const result = await onCleanupOldData();

    if (result.success) {
      console.log("✅ Cleanup completed successfully!");
      console.log(`📊 Results:`);
      console.log(`  - Deleted ${result.deletedChatRooms} old chat rooms`);
      console.log(`  - Deleted ${result.deletedCustomers} old customers`);
      console.log("");
      console.log(
        "🎉 All old data has been cleaned up according to the 14-day retention policy."
      );
    } else {
      console.error("❌ Cleanup failed:", result.error);
      process.exit(1);
    }
  } catch (error) {
    console.error("💥 Unexpected error during cleanup:", error);
    process.exit(1);
  }
}

// Run the cleanup
main()
  .then(() => {
    console.log("🏁 Cleanup script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
