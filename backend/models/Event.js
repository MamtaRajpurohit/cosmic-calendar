import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  date: {
    type: String, // Format: MM-DD
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  sourceLink: {
    type: String,
    required: true,
  },
  isWowEvent: {
    type: Boolean,
    default: false,
  },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
