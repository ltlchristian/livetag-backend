const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema(
  {
    activity_name: String,
    activity_date: Date,
    description: String,
    price: Number,
    event: { type: mongoose.Types.ObjectId, ref: "Event" },
  },
  { timestamps: true }
);

const ActivitiesModel = mongoose.model("Activities", ActivitiesSchema);

module.exports = ActivitiesModel;
