#!/usr/bin/env tsx

/**
 * Test Customer Chat Flow
 *
 * This script tests the complete customer chat flow including:
 * - Customer creation
 * - Chat room creation
 * - Message storage
 * - Customer retrieval by IP
 */

import { client } from "../lib/prisma";

async function main() {
  console.log("🚀 Testing Customer Chat Flow...");

  try {
    // Test IP for development
    const testIP = "192.168.1.100";
    const testDomainId = "ede79619-e4a2-45ff-a8e5-141bd7e6fba6"; // Real domain ID

    console.log("🔧 Test parameters:");
    console.log("  - IP:", testIP);
    console.log("  - Domain ID:", testDomainId);

    // 1. Verify domain exists
    const domain = await client.domain.findUnique({
      where: { id: testDomainId },
    });

    if (!domain) {
      console.log("❌ Domain not found. Please ensure the domain exists.");
      return;
    }
    console.log("✅ Domain found:", domain.name);

    // 2. Clean up any existing test customers
    console.log("🧹 Cleaning up existing test data...");
    await client.customer.deleteMany({
      where: {
        ipAddress: testIP,
        domainId: testDomainId,
      },
    });

    // 3. Create a test customer with multiple chat rooms
    console.log("👤 Creating test customer...");
    const customer = await client.customer.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        phone: "+1234567890",
        countryCode: "+1",
        ipAddress: testIP,
        domainId: testDomainId,
        chatRoom: {
          create: [
            {
              message: {
                create: [
                  {
                    message: "Hello, I need help with my account",
                    role: "CUSTOMER",
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                  },
                  {
                    message:
                      "Hi! I'd be happy to help you with your account. What specific issue are you experiencing?",
                    role: "OWNER",
                    createdAt: new Date(
                      Date.now() - 2 * 60 * 60 * 1000 + 30000
                    ), // 2 hours ago + 30 seconds
                  },
                  {
                    message: "I can't login to my dashboard",
                    role: "CUSTOMER",
                    createdAt: new Date(
                      Date.now() - 2 * 60 * 60 * 1000 + 60000
                    ), // 2 hours ago + 1 minute
                  },
                ],
              },
            },
            {
              createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
              message: {
                create: [
                  {
                    message: "Hi again, I have another question",
                    role: "CUSTOMER",
                    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
                  },
                  {
                    message: "Of course! What can I help you with?",
                    role: "OWNER",
                    createdAt: new Date(
                      Date.now() - 1 * 60 * 60 * 1000 + 30000
                    ), // 1 hour ago + 30 seconds
                  },
                ],
              },
            },
            {
              createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
              message: {
                create: [
                  {
                    message: "Quick question about billing",
                    role: "CUSTOMER",
                    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        chatRoom: {
          include: {
            message: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    console.log(
      "✅ Customer created with",
      customer.chatRoom.length,
      "chat rooms"
    );

    // 4. Test customer retrieval by IP (simulating the actual flow)
    console.log("🔍 Testing customer retrieval by IP...");
    const foundCustomer = await client.customer.findFirst({
      where: {
        ipAddress: testIP,
        domainId: testDomainId,
        createdAt: {
          gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // Within 14 days
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        countryCode: true,
        ipAddress: true,
        createdAt: true,
        chatRoom: {
          where: {
            createdAt: {
              gte: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            },
          },
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            message: {
              select: {
                id: true,
                message: true,
                role: true,
                createdAt: true,
              },
              orderBy: {
                createdAt: "asc",
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (foundCustomer) {
      console.log("✅ Customer found by IP!");
      console.log("  - Name:", foundCustomer.name);
      console.log("  - Email:", foundCustomer.email);
      console.log("  - Total chat rooms:", foundCustomer.chatRoom.length);

      foundCustomer.chatRoom.forEach((room, index) => {
        console.log(
          `  - Chat room ${index + 1}:`,
          room.message.length,
          "messages"
        );
        room.message.forEach((msg, msgIndex) => {
          console.log(
            `    - Message ${msgIndex + 1} (${msg.role}):`,
            msg.message.substring(0, 50)
          );
        });
      });

      // Test the logic that determines if user has previous messages
      const hasAnyPreviousMessages = foundCustomer.chatRoom?.some(
        (room) => room.message && room.message.length > 0
      );
      console.log("  - Has previous messages:", hasAnyPreviousMessages);
    } else {
      console.log("❌ Customer not found by IP");
    }

    console.log("✅ Test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  } finally {
    await client.$disconnect();
  }
}

// Run the test
main()
  .then(() => {
    console.log("🏁 Test script finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Script failed:", error);
    process.exit(1);
  });
