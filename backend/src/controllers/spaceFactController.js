// src/controllers/spaceFactController.js
import { PromptTemplate } from '@langchain/core/prompts';
import { llm } from '../config/groqClient.js';
import { extractJSON } from '../utils/jsonParser.js';

export const getSpaceFact = async (req, res) => {
  try {
    const prompt = PromptTemplate.fromTemplate(`
You are a space science educator. Generate an interesting and mind-blowing space fact.
Return JSON ONLY:
{{
  "question": "An intriguing question",
  "answer": "A fascinating detailed answer"
}}
    `);

    const chain = prompt.pipe(llm);
    const response = await chain.invoke({});
    const factData = extractJSON(response.content, {
      question: "What makes space fascinating?",
      answer: "Space is full of mysteries waiting to be discovered!"
    });

    res.json(factData);
  } catch (error) {
    console.error('Error generating space fact:', error);
    res.status(500).json({ error: 'Failed to generate space fact', message: error.message });
  }
};
