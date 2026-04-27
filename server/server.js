require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the Gemini client
let ai;
try {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

const SYSTEM_INSTRUCTION = `
You are CivicBot, an Indian Election Assistant. 
Your ONLY purpose is to provide information related to the Indian election process, voting guidelines, required documents, EVMs, and polling stations.
If a user asks about anything else (e.g., coding, general knowledge, non-election topics), you MUST politely decline and state that you can only help with election-related queries.
Keep your responses concise, educational, and easy to read. Do not use markdown headers unless necessary, keep it conversational.
`;

app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      return res
        .status(500)
        .json({
          error: "Gemini API client not initialized. Check your API key.",
        });
    }

    const { history, message } = req.body;

    // Security: Input Validation
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required and must be a string." });
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    if (trimmedMessage.length > 1000) {
      return res.status(400).json({ error: "Message is too long. Maximum 1000 characters allowed." });
    }

    if (history && !Array.isArray(history)) {
      return res.status(400).json({ error: "History must be an array." });
    }

    // Convert the frontend history format {type: 'user'|'bot', text: ''}
    // to the Gemini history format {role: 'user'|'model', parts: [{text: ''}]}
    const formattedHistory = (history || []).map((msg) => ({
      role: msg.type === "bot" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    // The new v2 SDK doesn't allow pushing history easily after creation if you want to use the `.sendMessage` convenience method.
    // Instead, we can just use the `models.generateContent` method with the full history array for maximum control.

    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: trimmedMessage }] },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res
      .status(500)
      .json({ error: "Failed to generate a response from CivicBot." });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`CivicBot Proxy Server running on port ${PORT}`);
});
