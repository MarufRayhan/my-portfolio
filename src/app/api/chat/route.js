// app/api/chat/route.js
import { cohere } from "@ai-sdk/cohere";
import { streamText } from "ai";
import {
  findRelevantInfo,
  loadProcessedChunks,
} from "../../utils/documentProcessor";

// Initialize with an empty array - will be populated on first request
let personalInfoChunks = [];

export async function POST(req) {
  try {
    // Load the chunks if not already loaded
    if (personalInfoChunks.length === 0) {
      personalInfoChunks = await loadProcessedChunks();
    }

    const { messages } = await req.json();

    // Extract the user's latest message
    const latestMessage = messages[messages.length - 1].content;

    // Find relevant information based on the query
    const relevantInfo = await findRelevantInfo(
      latestMessage,
      personalInfoChunks
    );

    // Create a dynamic system prompt with only the relevant information
    const systemPrompt = `You are Maruf's personal AI assistant. Start the message with a friendly greeting that you are here to 
    help about Maruf who is your developer. You can make playful greeting that maruf is busy for his AWS certification exam.
    
    Below is personal information about Maruf that is relevant to the user's question.
    Use ONLY this information to answer questions about Maruf:
    
    ${relevantInfo || "No specific information found on this topic."}
    
    If the provided information doesn't contain an answer to the user's question, politely say that you don't have that specific information about Maruf. But can contact
    with maruf.rayhan14@gmail.com or via phone +358-413111797.

    If user asks something ask more generlised answer that you can help with the knowledge about Maruf, Bangladesh and Finland as
    your developer Maruf lived there. Other information you can declined. 

    Y
    
    Be conversational, helpful, and concise in your responses.`;

    // Stream the response
    // amazonq-ignore-next-line
    const result = streamText({
      model: cohere("command-r-plus"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API route:", error);

    // Return a proper error response
    return new Response(
      JSON.stringify({ error: "Failed to process your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
