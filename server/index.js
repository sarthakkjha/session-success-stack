// index.js
const express = require("express");
const { pipe } = require("@screenpipe/js");

// Add global self object for Node.js environment
global.self = global;

const app = express();

// Simple CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const PORT = 6969;

app.get("/api/screenpipe", async (req, res) => {
  // console.log("Received request at /api/screenpipe");
  try {
    const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString();
    // console.log("Querying screenpipe with time:", fiveMinutesAgo);

    const results = await pipe.queryScreenpipe({
      startTime: fiveMinutesAgo,
      limit: 10,
      contentType: "all",
      environment: "node"
    });

    if (!results || !results.data) {
      console.log("No results found or error occurred");
      return res.json({ data: [] });
    }

    // Process and format the results
    const formattedResults = results.data.map(item => {
      if (item.type === "OCR") {
        return {
          type: "OCR",
          content: item.content,
          timestamp: item.timestamp
        };
      } else if (item.type === "Audio") {
        return {
          type: "Audio",
          content: item.content,
          timestamp: item.timestamp
        };
      }
      return null;
    }).filter(Boolean);

    res.json({ data: formattedResults });
  } catch (err) {
    console.error("Error querying screenpipe:", err);
    res.status(500).json({ error: "Failed to query Screenpipe" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
