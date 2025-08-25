import { io } from "socket.io-client";

// Test customer room joining functionality
async function testCustomerRoomJoining() {
  console.log("🧪 Testing customer room joining functionality...");

  // Connect admin client
  const adminSocket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
  });

  // Connect customer client
  const customerSocket = io("http://localhost:3001", {
    transports: ["websocket", "polling"],
  });

  const testRoomId = "existing-chat-room-123";
  const testCustomerId = "existing-customer-456";
  const testCustomerName = "Existing Customer";

  // Admin setup
  adminSocket.on("connect", () => {
    console.log("✅ Admin connected to Socket.io server");
    console.log("🔌 Admin Socket ID:", adminSocket.id);
  });

  // Admin listens for customer joined room
  adminSocket.on("customer-joined-room", (data) => {
    console.log("👤 Admin received customer joined room notification:", data);
    console.log("🎯 Admin should now auto-select room:", data.roomId);
  });

  // Customer setup
  customerSocket.on("connect", () => {
    console.log("✅ Customer connected to Socket.io server");
    console.log("🔌 Customer Socket ID:", customerSocket.id);

    // Simulate existing customer joining their previous room
    setTimeout(() => {
      console.log("📤 Customer joining existing room...");

      // Join the room (simulating existing customer)
      customerSocket.emit("join-room", {
        roomId: testRoomId,
        userId: testCustomerId,
        userName: testCustomerName,
      });

      // Notify admin that customer joined
      customerSocket.emit("customer-joined-room", {
        roomId: testRoomId,
        customerId: testCustomerId,
        customerName: testCustomerName,
      });
    }, 1000);
  });

  // Customer sends a message
  customerSocket.on("user-joined", (data) => {
    console.log("👋 Customer joined room:", data);

    setTimeout(() => {
      console.log("📤 Customer sending message in existing room...");
      customerSocket.emit("send-message", {
        roomId: testRoomId,
        message: "Hello! I'm back to continue our conversation.",
        userId: testCustomerId,
        userName: testCustomerName,
        role: "user",
      });
    }, 2000);
  });

  // Admin joins the same room after customer notification
  adminSocket.on("customer-joined-room", (data) => {
    setTimeout(() => {
      console.log("📤 Admin joining customer's room...");
      adminSocket.emit("join-room", {
        roomId: data.roomId,
        userId: "admin",
        userName: "Admin User",
      });
    }, 500);
  });

  // Listen for messages
  adminSocket.on("new-message", (data) => {
    console.log("📨 Admin received message:", {
      id: data.id,
      message: data.message,
      role: data.role,
      userId: data.userId,
      userName: data.userName,
    });
  });

  customerSocket.on("new-message", (data) => {
    console.log("📨 Customer received message:", {
      id: data.id,
      message: data.message,
      role: data.role,
      userId: data.userId,
      userName: data.userName,
    });
  });

  // Handle connection errors
  adminSocket.on("connect_error", (error) => {
    console.error("❌ Admin connection error:", error);
  });

  customerSocket.on("connect_error", (error) => {
    console.error("❌ Customer connection error:", error);
  });

  // Disconnect after 10 seconds
  setTimeout(() => {
    console.log("🔌 Disconnecting test sockets...");
    adminSocket.disconnect();
    customerSocket.disconnect();
    process.exit(0);
  }, 10000);
}

// Run the test
testCustomerRoomJoining().catch(console.error);
