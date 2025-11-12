// // server.js
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import { ChatGroq } from '@langchain/groq';
// import { PromptTemplate } from '@langchain/core/prompts';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Groq LLM
// const llm = new ChatGroq({
//   apiKey: process.env.GROQ_API_KEY,
//   model: 'llama-3.3-70b-versatile',
//   temperature: 0.9,
//   top_p: 0.9,
// });

// // Route: Get Space Event by Date
// app.post('/api/space-event', async (req, res) => {
//   try {
//     const { date } = req.body;
    
//     if (!date) {
//       return res.status(400).json({ error: 'Date is required' });
//     }

//     const [year, month, day] = date.split('-');
//     const formattedDate = `${month}-${day}`;

//     const prompt = PromptTemplate.fromTemplate(
//        `You are a space history expert with deep knowledge of both global and Indian space programs. Given the date {date} (month-day format), provide information about space exploration events that actually happened on this date in history.

//         PRIORITY SEARCH ORDER:
//         1. FIRST, check for ANY Indian space events (ISRO, Indian satellites, Indian astronauts, Indian space missions, Indian space achievements) - include even small milestones
//         2. If no Indian event found, then look for major global space events

//         INDIAN SPACE COVERAGE:
//         - Include ALL ISRO missions and launches
//         - Indian satellite deployments (communication, navigation, earth observation, etc.)
//         - Indian astronaut activities and training
//         - ISRO organizational milestones
//         - Indo-foreign space collaborations
//         - Indian space science achievements
//         - Even small Indian space-related events are important

//         Return the response in the following JSON format ONLY (no additional text):
//         {{
//         "year": "YYYY",
//         "title": "Brief Event Title",
//         "description": "2-3 sentences describing the event in an engaging way. For Indian events, include specific details like mission names, rocket names (PSLV, GSLV, etc.), satellite names, and significance.",
//         "found": true,
//         "isIndian": true/false
//         }}

//         If NO space event (Indian or global) actually occurred on this date in real history, return:
//         {{
//         "year": null,
//         "title": null,
//         "description": null,
//         "found": false,
//         "isIndian": false
//         }}

//         IMPORTANT: 
//         - Only return real historical events. Do NOT make up fictional events.
//         - Be factually accurate with dates, names, and details.
//         - Prioritize Indian space events over global events.
//         - For Indian events, be as detailed as possible.

//         Date: {date}`
//     );

//     const chain = prompt.pipe(llm);
//     const response = await chain.invoke({ date: formattedDate });

//     // Parse the response
//     let eventData;
//     try {
//       // Extract JSON from response
//       const content = response.content;
//       const jsonMatch = content.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         eventData = JSON.parse(jsonMatch[0]);
        
//         // If no event found, return null to indicate no event
//         if (eventData.found === false) {
//           return res.json({
//             year: null,
//             title: null,
//             description: null,
//             found: false,
//             isIndian: false
//           });
//         }
        
//         // Ensure isIndian flag is present
//         if (eventData.isIndian === undefined) {
//           eventData.isIndian = false;
//         }
//       } else {
//         throw new Error('No JSON found in response');
//       }
//     } catch (parseError) {
//       console.error('Parse error:', parseError);
//       // Fallback response
//       eventData = {
//         year: "Unknown",
//         title: "Space Event",
//         description: "Unable to retrieve event details. Please try again.",
//         found: false
//       };
//     }

//     res.json(eventData);
//   } catch (error) {
//     console.error('Error fetching space event:', error);
//     res.status(500).json({ 
//       error: 'Failed to fetch space event',
//       message: error.message 
//     });
//   }
// });

// // Route: Get Random Space Fact
// app.get('/api/space-fact', async (req, res) => {
//   try {
//     const prompt = PromptTemplate.fromTemplate(
//        `You are a space science educator. Generate an interesting and mind-blowing space fact that will wow people.

//         Return the response in the following JSON format ONLY (no additional text):
//         {{
//         "question": "An intriguing question that makes people curious",
//         "answer": "A fascinating answer with specific details and numbers that explains the phenomenon"
//         }}

//         Make it educational, accurate, and exciting. Focus on lesser-known facts about planets, stars, space phenomena, or space exploration.`
//     );

//     const chain = prompt.pipe(llm);
//     const response = await chain.invoke({});

//     let factData;
//     try {
//       const content = response.content;
//       const jsonMatch = content.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         factData = JSON.parse(jsonMatch[0]);
//       } else {
//         throw new Error('No JSON found in response');
//       }
//     } catch (parseError) {
//       console.error('Parse error:', parseError);
//       factData = {
//         question: "What makes space fascinating?",
//         answer: "Space is full of mysteries waiting to be discovered! Try generating another fact."
//       };
//     }

//     res.json(factData);
//   } catch (error) {
//     console.error('Error generating space fact:', error);
//     res.status(500).json({ 
//       error: 'Failed to generate space fact',
//       message: error.message 
//     });
//   }
// });

// app.get('/api/scientist', async (req, res) => {
//   try {
//     const randomSeed = Math.floor(Math.random() * 10000);

//     const prompt = PromptTemplate.fromTemplate(`
//         You are a science historian. Using the random seed ${randomSeed}, 
//         randomly select a famous scientist who made significant contributions 
//         to space science, astronomy, astrophysics, rocket science, or physics.

//         Return the response in the following JSON format ONLY (no extra text):

//         {{
//         "country": "Country of origin",
//         "hint": "A one-sentence hint about their major achievement (without revealing their name)",
//         "name": "Scientist's full name",
//         "details": "2-3 sentences about their life, major contributions, and impact on science"
//         }}

//         Avoid repeating the same scientist frequently. Include diversity in gender, nationality, and field of expertise.
//     `);

//     const chain = prompt.pipe(llm);
//     const response = await chain.invoke({});  // No variables needed

//     let scientistData;
//     try {
//       const content = response.content || response.text || '';
//       const jsonMatch = content.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         scientistData = JSON.parse(jsonMatch[0]);
//       } else {
//         throw new Error('No valid JSON found');
//       }
//     } catch (parseError) {
//       console.error('Parse error:', parseError);
//       scientistData = {
//         country: "Unknown",
//         hint: "A brilliant mind in science",
//         name: "Scientist",
//         details: "Unable to retrieve scientist details. Please try again."
//       };
//     }

//     res.json(scientistData);
//   } catch (error) {
//     console.error('Error generating scientist info:', error);
//     res.status(500).json({
//       error: 'Failed to generate scientist info',
//       message: error.message
//     });
//   }
// });


// // Health check route
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', message: 'Server is running' });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/health`);
// });

// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import spaceEventRoutes from './src/routes/spaceEventRoutes.js';
import spaceFactRoutes from './src/routes/spaceFactRoutes.js';
import scientistRoutes from './src/routes/scientistRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/space-event', spaceEventRoutes);
app.use('/api/space-fact', spaceFactRoutes);
app.use('/api/scientist', scientistRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok', message: 'Server is running' }));

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🩺 Health check: http://localhost:${PORT}/health`);
});
