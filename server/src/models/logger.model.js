import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);

export { Log };
