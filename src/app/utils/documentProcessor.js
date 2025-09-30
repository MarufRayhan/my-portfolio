// utils/documentProcessor.js
import fs from "fs/promises";
import { cohere } from "@ai-sdk/cohere";
import path from "path";

// Function to process your document initially
export async function processDocument(filePath) {
  try {
    // Read the text file
    const text = await fs.readFile(filePath, "utf-8");

    // Split into meaningful chunks (paragraphs or sections)
    // This uses double newlines as section separators
    let chunks = text.split("\n\n").filter((chunk) => chunk.trim() !== "");

    // For better results, clean and prepare each chunk
    chunks = chunks.map((chunk) => {
      // Remove excess whitespace and normalize text
      return chunk.trim().replace(/\s+/g, " ");
    });

    // Add simple metadata like chunk index and first few words as a title
    const chunksWithMetadata = chunks.map((chunk, index) => {
      const title = chunk.split(" ").slice(0, 5).join(" ") + "...";
      return {
        id: index,
        text: chunk,
        title,
      };
    });

    // Generate and store embeddings
    const chunksWithEmbeddings = await addEmbeddings(chunksWithMetadata);
    console.log("chunk with embesiing", chunksWithEmbeddings);

    // Save processed data for faster loading in production
    await fs.writeFile(
      "./data/processed-personal-info.json",
      JSON.stringify(chunksWithEmbeddings)
    );

    return chunksWithEmbeddings;
  } catch (error) {
    console.error("Error processing document:", error);
    throw error;
  }
}

// Function to generate embeddings for each chunk
async function addEmbeddings(chunks) {
  // Extract just the text from each chunk for embedding
  const textsToEmbed = chunks.map((chunk) => chunk.text);

  try {
    // Call Cohere's embedding API
    const response = await fetch("https://api.cohere.ai/v1/embed", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: textsToEmbed,
        model: "embed-english-v3.0",
        input_type: "search_document",
      }),
    });

    const data = await response.json();

    console.log("embedd created");

    if (!data.embeddings) {
      throw new Error("Failed to get embeddings: " + JSON.stringify(data));
    }

    // Add embeddings to the chunks
    return chunks.map((chunk, i) => ({
      ...chunk,
      embedding: data.embeddings[i],
    }));
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw error;
  }
}

// Function to get embeddings for the user query
async function getQueryEmbedding(query) {
  try {
    const response = await fetch("https://api.cohere.ai/v1/embed", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        texts: [query],
        model: "embed-english-v3.0",
        input_type: "search_query",
      }),
    });

    const data = await response.json();

    if (!data.embeddings || !data.embeddings[0]) {
      throw new Error("Failed to get query embedding");
    }

    return data.embeddings[0];
  } catch (error) {
    console.error("Error generating query embedding:", error);
    throw error;
  }
}

// Cosine similarity function to compare embeddings
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magA * magB);
}

// Main function to find relevant information
export async function findRelevantInfo(query, chunksWithEmbeddings) {
  try {
    // Get embedding for the query
    const queryEmbedding = await getQueryEmbedding(query);

    const chunks = Array.isArray(chunksWithEmbeddings)
      ? chunksWithEmbeddings
      : chunksWithEmbeddings.chunks;

    // Calculate similarity for each chunk
    const chunksWithSimilarity = chunks.map((chunk) => ({
      ...chunk,
      similarity: cosineSimilarity(queryEmbedding, chunk.embedding),
    }));

    console.log("code not coming here");

    // Sort by similarity score (highest first)
    const sortedChunks = chunksWithSimilarity.sort(
      (a, b) => b.similarity - a.similarity
    );

    // Select top chunks that are most relevant
    // Adjust the threshold and max chunks based on your needs
    const similarityThreshold = 0.65; // Minimum similarity score to consider
    const maxChunks = 3; // Maximum number of chunks to return

    console.log("it is fine here 1");

    const relevantChunks = sortedChunks
      .filter((chunk) => chunk.similarity > similarityThreshold)
      .slice(0, maxChunks);

    console.log("it is fine here 2");

    // If no chunks meet the threshold, return the single best match
    if (relevantChunks.length === 0 && sortedChunks.length > 0) {
      relevantChunks.push(sortedChunks[0]);
    }

    // Format the relevant information for inclusion in the prompt
    const formattedInfo = relevantChunks
      .map((chunk) => `[Section: ${chunk.title}]\n${chunk.text}`)
      .join("\n\n");

    return formattedInfo;
  } catch (error) {
    console.error("Error finding relevant info:", error);
    // Fallback - return empty string or default message
    return "";
  }
}

// Helper function to load processed chunks from saved file
export async function loadProcessedChunks() {
  // Define the path to the pre-processed file
  const filePath = path.join(
    process.cwd(),
    "data",
    "processed-personal-info.json"
  );

  try {
    console.log("Reading processed data from:", filePath);
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);

    // Return the chunks array, not the first chunk or the whole object
    const chunksWithEmbeddings = data.chunks || [];

    console.log("type of chunkembeding", typeof chunksWithEmbeddings);
    console.log("Is array?", Array.isArray(chunksWithEmbeddings));
    console.log("Number of chunks:", chunksWithEmbeddings.length);

    return chunksWithEmbeddings;
  } catch (error) {
    console.error("Error reading processed data:", error);
    return [
      {
        text: "I'm Maruf, a software developer. You can contact me through the contact form on this website.",
        metadata: { source: "fallback" },
      },
    ];
  }
}
