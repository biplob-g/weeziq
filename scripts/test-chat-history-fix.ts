import { onFindCustomerByIP } from "../actions/conversation";

async function testChatHistoryFix() {
  console.log("🧪 Testing Chat History Fix...");

  // Test with a sample domain ID (you'll need to replace this with a real one)
  const domainId = "your-test-domain-id";

  try {
    console.log("🔍 Testing onFindCustomerByIP function...");
    const customer = await onFindCustomerByIP(domainId);

    if (customer) {
      console.log("✅ Customer found:", customer.name);
      console.log("📊 Total chat rooms:", customer.chatRoom?.length || 0);

      customer.chatRoom?.forEach((room, index) => {
        console.log(`  - Chat room ${index + 1}:`, {
          id: room.id,
          messageCount: room.message?.length || 0,
          createdAt: room.createdAt,
          updatedAt: room.updatedAt,
        });
      });

      // Check if rooms are within 14 days
      const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
      const recentRooms =
        customer.chatRoom?.filter(
          (room) => room.createdAt >= fourteenDaysAgo
        ) || [];

      console.log("📅 Chat rooms within 14 days:", recentRooms.length);
    } else {
      console.log("❌ No customer found for this IP/domain combination");
    }
  } catch (error) {
    console.error("💥 Error testing chat history fix:", error);
  }
}

// Run the test
testChatHistoryFix();
