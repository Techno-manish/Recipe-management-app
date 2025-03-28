import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logRequests } from "./middlewares/logger.middleware.js";
import path from "path";
import { fileURLToPath } from "url"; // Needed for ES module compatibility

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(logRequests);
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "900kb" }));
app.use(express.urlencoded({ extended: true, limit: "900kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRoute from "./routes/user.route.js";
import recipeRoute from "./routes/recipe.route.js";
import categoryRoute from "./routes/category.route.js";

// routes declaration
app.use("/api/v1/users/", userRoute);
app.use("/api/v1/recipe/", recipeRoute);
app.use("/api/v1/category/", categoryRoute);

// 👉 Serve React Frontend (ONLY in Production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  // Catch-all route to serve index.html for React client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

export { app };
