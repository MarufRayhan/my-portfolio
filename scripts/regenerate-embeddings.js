// scripts/regenerate-embeddings.js
import { processDocument } from "../src/app/utils/documentProcessor.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    console.log("🔄 Regenerating embeddings...\n");

    // Check for API key
    if (!process.env.COHERE_API_KEY) {
      throw new Error("❌ COHERE_API_KEY not found in .env file");
    }

    // Path to your source text file
    const sourceFile = path.join(__dirname, "..", "data", "personal-info.txt");

    console.log(`📄 Reading from: ${sourceFile}`);

    // Use the existing processDocument function
    const result = await processDocument(sourceFile);

    console.log("\n✅ Success!");
    console.log(`   Generated ${result.length} chunks with embeddings`);
    console.log(
      `   Each embedding has ${result[0].embedding.length} dimensions`
    );
    console.log("   Saved to: data/processed-personal-info.json\n");
  } catch (error) {
    console.error("\n❌ Error:", error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
