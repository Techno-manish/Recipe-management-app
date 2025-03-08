import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { logRequests } from "./middlewares/logger.middleware.js";

const app = express();
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
// import recipeRoute from "./routes/recipe.route.js";

// routes declaration

app.use("/api/v1/users/", userRoute);
//http://localhost:8000/api/v1/users/register
//http://localhost:8000/api/v1/users/login

// app.use("/api/v1/recipe/", recipeRoute);

export { app };
