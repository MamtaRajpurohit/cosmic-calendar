import Event from "../models/Event.js";

// Get event by date (MM-DD)
export const getEventByDate = async (req, res) => {
  try {
    // Access the date from query params
    const date = req.query.date?.trim(); 
    if (!date) {
      return res.status(400).json({ message: "Please provide a date (MM-DD)" });
    }

    const event = await Event.findOne({ date });

    if (!event) {
      return res.status(404).json({ message: `No event found for this date` });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get Daily Wow Event
export const getWowEvent = async (req, res) => {
  try {
    const wowEvent = await Event.findOne({ isWowEvent: true });
    if (!wowEvent) {
      return res.status(404).json({ message: "No Wow Event found" });
    }
    res.json(wowEvent);
  } catch (error) {
    console.error("Error fetching Wow Event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add new event (admin/curator)
export const addEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
