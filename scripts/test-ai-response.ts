import { onAiChatBotAssistant } from "../actions/bot";

async function testAiResponse() {
  console.log(
    "🧪 Testing OpenAI gpt-5-mini AI Response with improved prompts..."
  );

  try {
    // Test with a sample message
    const testMessage = "Hello, I need help with your services";
    const domainId = "test-domain-id"; // You'll need to replace with actual domain ID
    const chatHistory = [
      { role: "user" as const, content: "Hi there" },
      {
        role: "assistant" as const,
        content: "Hello! How can I help you today?",
      },
    ];

    console.log("📝 Test message:", testMessage);
    console.log("🏢 Domain ID:", domainId);
    console.log("💬 Chat history length:", chatHistory.length);

    const response = await onAiChatBotAssistant(
      domainId,
      chatHistory,
      "user",
      testMessage,
      "test@example.com"
    );

    console.log("✅ AI Response received:", response);

    if (response && response.response) {
      console.log("🤖 AI Message content:", response.response.content);
      console.log("📏 Response length:", response.response.content.length);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

// Run the test
testAiResponse();
