const fs = require("fs");
const path = require("path");
const resumePath = path.resolve(__dirname, "../resume-data/resume.txt");
const resumeData = fs.readFileSync(resumePath, "utf-8");

function generatePrompt(userQuery) {
  return `
You are a chatbot assistant trained on the following resume:

${resumeData}

Please answer the following query concisely, without any extra explanation or thinking process. Focus on giving a direct response based on the resume:

"${userQuery}"
`;
}

module.exports = generatePrompt;
