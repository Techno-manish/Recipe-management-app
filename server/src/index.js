import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: ".env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`APP listening on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("FAILED TO CONNECT DB!!!", error);
  });
