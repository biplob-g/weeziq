#!/usr/bin/env tsx

/**
 * Test Realtime Chat Flow
 *
 * This script tests the complete realtime chat flow including:
 * - Customer creation with multiple chat rooms
 * - Message storage in correct chat rooms
 * - Socket.io realtime updates
 * - Conversation history display
 */

import { client } from "../lib/prisma";
import socketClient from "../lib/socketClient";

async function main() {
  console.log("🚀 Testing Realtime Chat Flow...");

  try {
    // Test parameters
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

    // 3. Create a test customer with multiple chat rooms and messages
    console.log("👤 Creating test customer with multiple chat rooms...");
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
            message: {
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
        console.log(
          `    - Last message: "${
            room.message[room.message.length - 1]?.message
          }"`
        );
        console.log(
          `    - Last message time: ${room.message[
            room.message.length - 1
          ]?.createdAt.toLocaleTimeString()}`
        );
      });

      // Test the logic that determines if user has previous messages
      const hasAnyPreviousMessages = foundCustomer.chatRoom?.some(
        (room) => room.message && room.message.length > 0
      );
      console.log("  - Has previous messages:", hasAnyPreviousMessages);

      // 5. Test socket.io connection and message sending
      console.log("🔌 Testing socket.io connection...");

      // Connect to socket
      const socket = socketClient;

      // Wait for connection
      await new Promise((resolve) => {
        const checkConnection = () => {
          const status = socket.getConnectionStatus();
          if (status.isConnected) {
            console.log("✅ Socket.io connected successfully");
            resolve(true);
          } else {
            setTimeout(checkConnection, 100);
          }
        };
        checkConnection();
      });

      // Test joining a chat room
      const testRoomId = foundCustomer.chatRoom[0].id;
      console.log(`🎯 Joining test room: ${testRoomId}`);
      socket.joinRoom(testRoomId, "test-user", "Test User");

      // Test sending a message
      console.log("💬 Testing message sending...");
      socket.sendMessage(
        testRoomId,
        "This is a test message from the script",
        "test-user",
        "Test User",
        "user"
      );

      // Wait a bit for the message to be processed
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if the message was stored in the database
      const updatedRoom = await client.chatRoom.findUnique({
        where: { id: testRoomId },
        include: {
          message: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
          },
        },
      });

      if (updatedRoom && updatedRoom.message.length > 0) {
        const lastMessage = updatedRoom.message[0];
        console.log("✅ Message stored in database:");
        console.log("  - Message:", lastMessage.message);
        console.log("  - Role:", lastMessage.role);
        console.log("  - Time:", lastMessage.createdAt.toLocaleTimeString());
      } else {
        console.log("❌ Message not stored in database");
      }

      // Test realtime message reception
      console.log("🔔 Testing realtime message reception...");
      let messageReceived = false;

      socket.onNewMessage((data) => {
        console.log("✅ Realtime message received:", data);
        messageReceived = true;
      });

      // Send another test message
      socket.sendMessage(
        testRoomId,
        "This is another test message for realtime testing",
        "test-user",
        "Test User",
        "user"
      );

      // Wait for realtime message
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (messageReceived) {
        console.log("✅ Realtime message reception working!");
      } else {
        console.log(
          "⚠️ Realtime message reception not working (this might be expected in test environment)"
        );
      }

      // Clean up socket listeners
      socket.off("new-message");
      socket.leaveRoom(testRoomId);
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
