const express = require("express");
const router = express.Router();
const axios = require("axios");
const generatePrompt = require("../utils/promptGenerator");

const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
const TOGETHER_MODEL = "deepseek-ai/DeepSeek-R1-Distill-Qwen-14B";

router.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const prompt = generatePrompt(question);

    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: TOGETHER_MODEL,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,  // Lower temperature for more focused answers
        max_tokens: 512,   // Adjust if necessary based on the length of the response
      },
      {
        headers: {
          Authorization: `Bearer ${TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();

    // Clean up any unwanted thinking process or extra tags
    const cleanedAnswer = answer.replace(/<think>[\s\S]*?<\/think>/, "").trim();

    res.json({ answer: cleanedAnswer });
  } catch (error) {
    console.error("Error fetching response:", error.message);
    res.status(500).json({ error: "Failed to get response from Together AI" });
  }
});

module.exports = router;
