const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const mongoose = require("mongoose");
const contentRoutes = require("./routes/contentRoutes");
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const errorHandler = require("./middleware/errorHandler");
const chatRoutes = require("./routes/chatRoutes");
const passport = require("passport");
const session = require("express-session");


require("./config/passport");


//console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);
//console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET ? "Loaded" : "Not Loaded");
//console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "Not Loaded");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected"))
  .catch(err => {
    console.log(err);
  });
const app = express();
app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/content", contentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chat", chatRoutes);

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
  console.log(`✅ Server is running on port ${PORT}`);
});