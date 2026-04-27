const { GoogleGenAI } = require('@google/genai');

// Initialize the Gemini client
// In Vercel, you set GEMINI_API_KEY in the project settings (Environment Variables)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `
You are CivicBot, an Indian Election Assistant. 
Your ONLY purpose is to provide information related to the Indian election process, voting guidelines, required documents, EVMs, and polling stations.
If a user asks about anything else (e.g., coding, general knowledge, non-election topics), you MUST politely decline and state that you can only help with election-related queries.
Keep your responses concise, educational, and easy to read. Do not use markdown headers unless necessary, keep it conversational.
`;

module.exports = async (req, res) => {
  // Add CORS headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { history, message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const formattedHistory = (history || []).map(msg => ({
      role: msg.type === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const contents = [
      ...formattedHistory,
      { role: 'user', parts: [{ text: message }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    res.status(200).json({ reply: response.text });

  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate a response from CivicBot." });
  }
};
