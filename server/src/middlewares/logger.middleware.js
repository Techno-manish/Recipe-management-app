import { Log } from "../models/logger.model.js";

const logRequests = async (req, res, next) => {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  console.log(`Logging Request: ${timestamp} ${req.method} ${req.originalUrl}`);

  try {
    await Log.create({
      method: req.method,
      url: req.originalUrl,
      timestamp,
    });

    console.log("✅ Log saved to MongoDB!");
  } catch (error) {
    console.error("❌ Error saving log:", error);
  }

  next();
};

export { logRequests };
