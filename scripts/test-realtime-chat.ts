import { io } from "socket.io-client";

// Test real-time chat functionality
async function testRealtimeChat() {
  console.log("🧪 Testing real-time chat functionality...");

  // Connect to Socket.io server
  const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
  });

  const testRoomId = "test-chat-room-123";
  const testUserId = "test-user-456";
  const testUserName = "Test User";

  // Test connection
  socket.on("connect", () => {
    console.log("✅ Connected to Socket.io server");
    console.log("🔌 Socket ID:", socket.id);

    // Join test room
    socket.emit("join-room", {
      roomId: testRoomId,
      userId: testUserId,
      userName: testUserName,
    });

    // Send a test message after 1 second
    setTimeout(() => {
      console.log("📤 Sending test message...");
      socket.emit("send-message", {
        roomId: testRoomId,
        message: "Hello from test! This is a real-time message.",
        userId: testUserId,
        userName: testUserName,
        role: "user",
      });
    }, 1000);
  });

  // Listen for messages
  socket.on("new-message", (data) => {
    console.log("📨 Received message:", {
      id: data.id,
      message: data.message,
      role: data.role,
      userId: data.userId,
      userName: data.userName,
      timestamp: data.timestamp,
    });
  });

  // Listen for user joined
  socket.on("user-joined", (data) => {
    console.log("👋 User joined:", data);
  });

  // Listen for room users
  socket.on("room-users", (data) => {
    console.log("👥 Room users:", data);
  });

  // Handle connection errors
  socket.on("connect_error", (error) => {
    console.error("❌ Connection error:", error);
  });

  // Handle disconnection
  socket.on("disconnect", (reason) => {
    console.log("🔌 Disconnected:", reason);
  });

  // Test multiple messages
  setTimeout(() => {
    console.log("📤 Sending second test message...");
    socket.emit("send-message", {
      roomId: testRoomId,
      message: "This is a second test message from the same user.",
      userId: testUserId,
      userName: testUserName,
      role: "user",
    });
  }, 3000);

  // Test admin message
  setTimeout(() => {
    console.log("📤 Sending admin test message...");
    socket.emit("send-message", {
      roomId: testRoomId,
      message: "Hello! This is an admin response.",
      userId: "admin-789",
      userName: "Admin User",
      role: "assistant",
    });
  }, 5000);

  // Disconnect after 10 seconds
  setTimeout(() => {
    console.log("🔌 Disconnecting test socket...");
    socket.disconnect();
    process.exit(0);
  }, 10000);
}

// Run the test
testRealtimeChat().catch(console.error);
