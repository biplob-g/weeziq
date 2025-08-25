#!/usr/bin/env tsx

/**
 * Test script for visitor tracking functionality
 */

import { io } from "socket.io-client";

async function testVisitorTracking() {
  console.log("🧪 Testing visitor tracking functionality...\n");

  try {
    // Connect to socket server
    const socket = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    console.log("🔌 Connecting to socket server...");

    socket.on("connect", () => {
      console.log("✅ Connected to socket server");
      console.log(`📊 Socket ID: ${socket.id}\n`);

      // Test 1: Join as a visitor
      console.log("1️⃣ Testing visitor join...");
      const testDomainId = "test-domain-123";
      const testVisitorId = `visitor_${Date.now()}`;

      socket.emit("visitor-joined-domain", {
        domainId: testDomainId,
        visitorId: testVisitorId,
        visitorData: {
          socketId: socket.id,
          userAgent: "Test Browser",
          timestamp: new Date(),
        },
      });

      console.log(
        `👤 Joined as visitor: ${testVisitorId} to domain: ${testDomainId}`
      );

      // Test 2: Request domain stats
      console.log("\n2️⃣ Testing domain stats request...");
      socket.emit("get-domain-stats", { domainId: testDomainId });

      // Test 3: Request all domain stats
      console.log("\n3️⃣ Testing all domain stats request...");
      socket.emit("get-all-domain-stats");

      // Test 4: Send visitor activity
      console.log("\n4️⃣ Testing visitor activity...");
      socket.emit("visitor-activity", {
        domainId: testDomainId,
        visitorId: testVisitorId,
      });

      // Listen for responses
      socket.on("domain-stats", (data) => {
        console.log("📊 Domain stats received:", data);
      });

      socket.on("all-domain-stats", (data) => {
        console.log("📊 All domain stats received:", data);
      });

      socket.on("visitor-joined-domain", (data) => {
        console.log("👤 Visitor joined notification received:", data);
      });

      socket.on("visitor-left-domain", (data) => {
        console.log("👤 Visitor left notification received:", data);
      });

      // Test 5: Leave as visitor after 5 seconds
      setTimeout(() => {
        console.log("\n5️⃣ Testing visitor leave...");
        socket.emit("visitor-left-domain", {
          domainId: testDomainId,
          visitorId: testVisitorId,
        });
        console.log(
          `👤 Left as visitor: ${testVisitorId} from domain: ${testDomainId}`
        );

        // Disconnect after 2 more seconds
        setTimeout(() => {
          console.log("\n🔌 Disconnecting from socket server...");
          socket.disconnect();
          console.log("✅ Test completed successfully!");
          process.exit(0);
        }, 2000);
      }, 5000);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Connection error:", error);
      process.exit(1);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Disconnected:", reason);
    });
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

// Run the test
testVisitorTracking().catch(console.error);
