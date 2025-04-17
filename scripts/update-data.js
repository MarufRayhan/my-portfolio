// scripts/process-standalone.js
const fs = require("fs").promises;
const path = require("path");

// Define a simple document processing function
// You can copy the core logic from your existing processDocument function
async function processDocument(filePath) {
  try {
    console.log(`Reading file from: ${filePath}`);
    const content = await fs.readFile(filePath, "utf8");

    // Split into chunks (adjust this logic to match your existing processor)
    const chunks = content
      .split("\n\n")
      .map((text) => ({
        text: text.trim(),
        metadata: { source: path.basename(filePath) },
      }))
      .filter((chunk) => chunk.text.length > 0);

    return { chunks };
  } catch (error) {
    console.error(`Error processing document: ${error.message}`);
    throw error;
  }
}

async function updateProcessedFile() {
  try {
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

    console.log(" Successfully updated processed data file!");
  } catch (error) {
    console.error(" Error updating processed data:", error);
    console.error("Stack:", error.stack);
    process.exit(1);
  }
}

// Run the update function
updateProcessedFile();
