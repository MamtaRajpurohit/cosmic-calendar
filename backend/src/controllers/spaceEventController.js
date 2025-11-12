// src/controllers/spaceEventController.js
import { PromptTemplate } from "@langchain/core/prompts";
import { llm } from "../config/groqClient.js";
import { extractJSON } from "../utils/jsonParser.js";

export const getSpaceEvent = async (req, res) => {
  try {
    const { date } = req.body;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const prompt = PromptTemplate.fromTemplate(`
      You are a space history expert with deep knowledge of Indian and global space programs.
      Given the exact date {date} (YYYY-MM-DD), find any *real* space exploration event that occurred on that date.

      PRIORITY:
      1️⃣ If it’s an Indian event (ISRO, Indian satellites, Indian astronauts, etc.), describe that.
      2️⃣ Otherwise, return a major *global* space event.

      Example output:
      {{{{ 
        "year": "2017",
        "title": "PSLV-C37 Launch – 104 Satellites",
        "description": "On February 15, 2017, ISRO successfully launched PSLV-C37 carrying 104 satellites, setting a world record for the most satellites launched in a single mission.",
        "found": true,
        "isIndian": true
      }}}}

      If no real event is found, return:
      {{{{ 
        "year": null,
        "title": null,
        "description": "No real space event recorded for this date.",
        "found": false,
        "isIndian": false
      }}}}

      Return JSON ONLY. Do not include any explanations or text before or after JSON.
      Date: {date}
      `);

    const chain = prompt.pipe(llm);
    const response = await chain.invoke({ date });

    // ✅ Use extractJSON instead of manual parsing
    const fallback = {
      year: "Unknown",
      title: "Space Event",
      description: "Unable to retrieve event details.",
      found: false,
      isIndian: false,
    };
    const eventData = extractJSON(response.content || "", fallback);

    res.json(eventData);
  } catch (error) {
    console.error("Error fetching space event:", error);
    res.status(500).json({
      error: "Failed to fetch space event",
      message: error.message,
    });
  }
};
