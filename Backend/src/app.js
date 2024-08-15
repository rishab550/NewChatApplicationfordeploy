import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

// Initialize Express app
const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://newchatapplicationfordeploy.onrender.com", // Adjust to your frontend URL
    credentials: true,
  }),
);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Serve static files from the Vite build output directory
const __dirname = path.resolve(); // Resolve directory name for path operations
app.use(express.static(path.join(__dirname, "Frontend/vite-project/dist")));

// Routes
import router from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import activeUserRouter from "./routes/activeUsers.route.js";

// Route handling
app.use("/api/v1/users", router);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/active-users", activeUserRouter);

// Serve the frontend application for all other routes
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Frontend", "vite-project", "dist", "index.html"),
  );
});

// Export the app
export default app;

// Start the server (usually done in a separate file, e.g., server.js or index.js)
// Import this app and call app.listen(PORT) there.
