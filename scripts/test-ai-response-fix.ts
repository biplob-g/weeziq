import { onAiChatBotAssistant } from "../actions/bot";

async function testAiResponseFix() {
  console.log("🧪 Testing AI Response Fix...");

  // Test with a sample domain ID and message
  const domainId = "your-test-domain-id";
  const testMessage = "Hello, how can you help me?";
  const chatHistory = [
    { role: "user" as const, content: "Hi there" },
    { role: "assistant" as const, content: "Hello! How can I help you today?" },
  ];

  try {
    console.log("🔍 Testing AI response generation...");
    const response = await onAiChatBotAssistant(
      domainId,
      chatHistory,
      "user",
      testMessage
    );

    if (response && response.response) {
      console.log("✅ AI response received:", response.response);
      console.log("📝 Response content:", response.response.content);
      console.log("🎭 Response role:", response.response.role);

      // Check if response format is consistent
      if (response.response.role === "assistant" && response.response.content) {
        console.log("✅ Response format is correct");
      } else {
        console.log("❌ Response format is incorrect");
      }
    } else if (response && response.error) {
      console.log("❌ AI Error:", response.error);
    } else {
      console.log("❌ No response received");
    }
  } catch (error) {
    console.error("💥 Error testing AI response fix:", error);
  }
}

// Run the test
testAiResponseFix();
