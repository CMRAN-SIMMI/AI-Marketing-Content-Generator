const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const passport = require("passport");
const session = require("express-session");
require("./config/passport");

// Load environment variables
dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch(err => {
    console.log(err);
  });
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());


app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 AI Marketing Content Generator Backend is Running!",
  });
});

// Handle Unknown Routes (404)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler (500)
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});