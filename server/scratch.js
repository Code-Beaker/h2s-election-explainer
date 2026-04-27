const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function run() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
    });
    console.log("Success:", response.text);
  } catch (error) {
    console.error("SDK Error Message:", error.message);
    if (error.status) console.error("Status:", error.status);
    if (error.details) console.error("Details:", JSON.stringify(error.details, null, 2));
  }
}
run();
