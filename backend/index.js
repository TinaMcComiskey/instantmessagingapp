const express = require("express"); // Express library to create the server
const cors = require("cors"); // Communicate with frontend
const mongoose = require("mongoose"); // Database
const userRoute = require("./routes/userRoute"); // Import user routes
const chatRoute = require("./routes/chatRoute"); // Import chat routes
const messageRoute = require("./routes/messageRoute"); // Import message routes

const app = express(); // Create an instance of Express application
require("dotenv").config(); // Load environment variables from .env file

// ---Middleware---
app.use(express.json()); // Parse JSON bodies in requests
app.use(cors()); // enable CORS
app.use("/api/users", userRoute); // handle routes for user-related requests
app.use("/api/chats", chatRoute); // handle routes for chat-related requests
app.use("/api/messages", messageRoute); // handle routes for message-related requests
// ----------------

// Root route to test if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to chat app APIs...");
});

const port = process.env.PORT || 5000; // Define port number (from env or 5000)
const uri = process.env.DATABASE; // Define database from .env

// Start the server and listen on the defined port
app.listen(port, (req, res) => {
  // req requests from frontend, res sends data to frontend
  console.log(`Server running on port: ${port}`);
});

// Connect to MongoDB Database
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
