import { io } from "socket.io-client";

// Test Socket.io connection
async function testSocketIO() {
  console.log("🧪 Testing Socket.io connection...");

  const socket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
  });

  // Test connection
  socket.on("connect", () => {
    console.log("✅ Socket.io connected successfully!");
    console.log("🔌 Socket ID:", socket.id);

    // Test joining a room
    socket.emit("join-room", {
      roomId: "test-room",
      userId: "test-user",
      userName: "Test User",
    });

    // Test sending a message
    setTimeout(() => {
      socket.emit("send-message", {
        roomId: "test-room",
        message: "Hello from test!",
        userId: "test-user",
        userName: "Test User",
        role: "user",
      });
      console.log("📤 Test message sent");
    }, 1000);

    // Test listening for messages
    socket.on("new-message", (data) => {
      console.log("📨 Received message:", data);
    });

    // Test user joined
    socket.on("user-joined", (data) => {
      console.log("👋 User joined:", data);
    });

    // Test room users
    socket.on("room-users", (data) => {
      console.log("👥 Room users:", data);
    });

    // Disconnect after 5 seconds
    setTimeout(() => {
      console.log("🔌 Disconnecting test socket...");
      socket.disconnect();
      process.exit(0);
    }, 5000);
  });

  socket.on("connect_error", (error) => {
    console.error("❌ Socket.io connection failed:", error);
    process.exit(1);
  });

  socket.on("disconnect", () => {
    console.log("🔌 Socket.io disconnected");
  });
}

// Run the test
testSocketIO().catch(console.error);
