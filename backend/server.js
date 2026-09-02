const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Export app for Vercel
module.exports = app;

// Local development
if (require.main === module) {
    app.listen(process.env.PORT || 5000, () => {
        console.log(
            `Server running on http://localhost:${process.env.PORT || 5000}`
        );
    });
}