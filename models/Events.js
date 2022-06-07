const mongoose = require("mongoose");

const EventsSchema = new mongoose.Schema(
  {
    event_name: String,
    start_date: Date,
    end_date: Date,
    place: String,
    description: String,
    code: String,
    user: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const EventsModel = mongoose.model("Event", EventsSchema);

module.exports = EventsModel;
