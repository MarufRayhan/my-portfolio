// scripts/update-data.js
const fs = require("fs").promises;
const path = require("path");

// Import your processDocument function
const { processDocument } = require("../app/api/chat/utils/documentProcessor");

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

    console.log("✅ Successfully updated processed data file!");
  } catch (error) {
    console.error("❌ Error updating processed data:", error);
    process.exit(1);
  }
}

// Run the update function
updateProcessedFile();
