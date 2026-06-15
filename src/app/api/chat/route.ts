import { chat, toServerSentEventsResponse } from "@tanstack/ai";
import { groqText } from "@tanstack/ai-groq";
import { createCodeMode } from "@tanstack/ai-code-mode";
import { createQuickJSIsolateDriver } from "@tanstack/ai-isolate-quickjs";
import { fetchWeatherTool } from "@/tools/weatherTool";

export const POST = async (request: Request) => {
  // Check for API key
  if (!process.env.GROQ_API_KEY) {
    return new Response(
      JSON.stringify({
        error: "GROQ_API_KEY not configured",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const body = await request.json();

  try {
    const { tool, systemPrompt } = createCodeMode({
      driver: createQuickJSIsolateDriver(),
      tools: [fetchWeatherTool],
      timeout: 30_000,
    });

    const stream = chat({
      adapter: groqText("llama-3.3-70b-versatile"),
      systemPrompts: ["You are a helpful weather assistant.", systemPrompt],
      tools: [tool],
      messages: body.messages,
    });

    // Convert stream to HTTP response
    return toServerSentEventsResponse(stream);
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An error occurred",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
