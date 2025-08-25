import { client } from "@/lib/prisma";

async function migratePlanNames() {
  try {
    console.log("Starting plan name migration...");

    // Find all users with old plan names
    const usersWithOldPlans = await client.billings.findMany({
      where: {
        plan: {
          in: ["STANDARD", "ULTIMATE"],
        },
      },
      include: {
        User: {
          select: {
            fullname: true,
            clerkId: true,
          },
        },
      },
    });

    console.log(`Found ${usersWithOldPlans.length} users with old plan names`);

    // Migrate STANDARD to GROWTH
    const standardUsers = usersWithOldPlans.filter(
      (user) => user.plan === "STANDARD"
    );
    if (standardUsers.length > 0) {
      console.log(
        `Migrating ${standardUsers.length} STANDARD users to GROWTH...`
      );
      await client.billings.updateMany({
        where: {
          plan: "STANDARD",
        },
        data: {
          plan: "GROWTH",
        },
      });
    }

    // Migrate ULTIMATE to PRO
    const ultimateUsers = usersWithOldPlans.filter(
      (user) => user.plan === "ULTIMATE"
    );
    if (ultimateUsers.length > 0) {
      console.log(`Migrating ${ultimateUsers.length} ULTIMATE users to PRO...`);
      await client.billings.updateMany({
        where: {
          plan: "ULTIMATE",
        },
        data: {
          plan: "PRO",
        },
      });
    }

    console.log("Plan name migration completed successfully!");

    // Verify the migration
    const remainingOldPlans = await client.billings.findMany({
      where: {
        plan: {
          in: ["STANDARD", "ULTIMATE"],
        },
      },
    });

    if (remainingOldPlans.length === 0) {
      console.log("✅ All old plan names have been successfully migrated!");
    } else {
      console.log(
        `⚠️  ${remainingOldPlans.length} users still have old plan names`
      );
    }
  } catch (error) {
    console.error("Error during plan migration:", error);
  } finally {
    await client.$disconnect();
  }
}

// Run the migration
migratePlanNames();
