const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const hospitalRoutes= require("./routes/hospitalRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/hospitals", hospitalRoutes);

// MongoDB connection
mongoose.connect("mongodb+srv://mayarocksinghm_db_user:12345@zenvita.nh0vi4k.mongodb.net/?appName=Zenvita")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});