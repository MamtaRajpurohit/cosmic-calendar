// src/controllers/scientistController.js
import { PromptTemplate } from '@langchain/core/prompts';
import { llm } from '../config/groqClient.js';
import { extractJSON } from '../utils/jsonParser.js';

export const getScientist = async (req, res) => {
  try {
    const randomSeed = Math.floor(Math.random() * 10000);

    const prompt = PromptTemplate.fromTemplate(`
You are a science historian. Using the random seed ${randomSeed},
randomly select a scientist who contributed to space, astronomy, astrophysics, or physics.

Return JSON ONLY:
{{
  "country": "Country of origin",
  "hint": "A one-line hint about their achievement",
  "name": "Scientist's full name",
  "details": "2-3 sentences about their contributions"
}}
    `);

    const chain = prompt.pipe(llm);
    const response = await chain.invoke({});
    const scientistData = extractJSON(response.content, {
      country: "Unknown",
      hint: "A brilliant mind in science",
      name: "Scientist",
      details: "Unable to retrieve scientist details. Please try again."
    });

    res.json(scientistData);
  } catch (error) {
    console.error('Error generating scientist info:', error);
    res.status(500).json({ error: 'Failed to generate scientist info', message: error.message });
  }
};
