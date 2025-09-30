// scripts/process-standalone.js
require("dotenv").config({ path: ".env.local" });
const fs = require("fs").promises;
const path = require("path");
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Function to generate embedding for a text chunk
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
}

// Process document and generate embeddings
async function processDocument(filePath) {
  try {
    console.log(`Reading file from: ${filePath}`);
    const content = await fs.readFile(filePath, "utf8");

    // Split into chunks
    const rawChunks = content
      .split("\n\n")
      .map((text) => ({
        text: text.trim(),
        metadata: { source: path.basename(filePath) },
      }))
      .filter((chunk) => chunk.text.length > 0);

    console.log(`Found ${rawChunks.length} chunks. Generating embeddings...`);

    // Generate embeddings for each chunk
    const chunksWithEmbeddings = [];
    for (let i = 0; i < rawChunks.length; i++) {
      const chunk = rawChunks[i];
      console.log(`Processing chunk ${i + 1}/${rawChunks.length}...`);

      const embedding = await generateEmbedding(chunk.text);
      chunksWithEmbeddings.push({
        ...chunk,
        embedding: embedding,
      });

      // Small delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("✓ All embeddings generated successfully!");
    return { chunks: chunksWithEmbeddings };
  } catch (error) {
    console.error(`Error processing document: ${error.message}`);
    throw error;
  }
}

async function updateProcessedFile() {
  try {
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY environment variable is not set!");
    }

    // Define file paths
    const rawFilePath = path.join(process.cwd(), "data", "personal-info.txt");
    const processedFilePath = path.join(
      process.cwd(),
      "data",
      "processed-personal-info.json"
    );

    console.log(`Reading raw data from: ${rawFilePath}`);

    // Process the document
    const processed = await processDocument(rawFilePath);

    // Save the processed data to JSON
    console.log(`Writing processed data to: ${processedFilePath}`);
    await fs.writeFile(
      processedFilePath,
      JSON.stringify(processed, null, 2),
      "utf8"
    );

    console.log("✅ Successfully updated processed data file with embeddings!");
  } catch (error) {
    console.error("❌ Error updating processed data:", error);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
}

// Run the update function
updateProcessedFile();
