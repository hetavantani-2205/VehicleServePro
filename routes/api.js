const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/ai/diagnose", async (req, res) => {
  try {
    const { symptom } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a professional senior car mechanic. A customer says: "${symptom}". 
    1. Briefly explain what might be wrong.
    2. Suggest 2-3 specific maintenance checks.
    3. Keep it professional, concise, and helpful. 
    4. End with: "Would you like to book an inspection?"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ advice: response.text() });
  } catch (error) {
    res.status(500).json({ error: "AI Diagnostics failed" });
  }
});