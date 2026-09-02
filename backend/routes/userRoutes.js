const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// POST /posts
router.post("/", async (req, res) => {
    try {
        const { title, content, user } = req.body;

        const post = await Post.create({
            title,
            content,
            user,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

// GET /posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;