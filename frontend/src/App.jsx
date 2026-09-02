

import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
    // User form states
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Post form states
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [postUser, setPostUser] = useState("");

    // Data states
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    // Message states
    const [userMessage, setUserMessage] = useState("");
    const [postMessage, setPostMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Get posts
    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/posts`);

            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }

            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Get users
    const fetchUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`);

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Load data when page opens
    useEffect(() => {
        fetchUsers();
        fetchPosts();
    }, []);

    // Create User
    const handleUserSubmit = async (e) => {
        e.preventDefault();

        if (!userName || !userEmail) {
            setUserMessage("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setUserMessage("");

            const response = await fetch(`${API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userName,
                    email: userEmail,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create user");
            }

            setUserMessage("User created successfully! ✅");

            setUserName("");
            setUserEmail("");

            fetchUsers();
        } catch (error) {
            setUserMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Create Post
    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (!postTitle || !postContent || !postUser) {
            setPostMessage("Please fill all fields");
            return;
        }

        try {
            setLoading(true);
            setPostMessage("");

            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: postTitle,
                    content: postContent,
                    user: postUser,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to create post");
            }

            setPostMessage("Post created successfully! ✅");

            setPostTitle("");
            setPostContent("");
            setPostUser("");

            fetchPosts();
        } catch (error) {
            setPostMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <h1>Schema Reference App 🚀</h1>
                <p>Mongoose User & Post Reference</p>
            </header>

            <main className="container">

                {/* Forms */}
                <div className="forms-container">

                    {/* User Form */}
                    <div className="card">
                        <h2>Create User</h2>

                        <form onSubmit={handleUserSubmit}>

                            <label>Name</label>

                            <input
                                type="text"
                                placeholder="Enter user name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />

                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                            />

                            <button type="submit" disabled={loading}>
                                {loading ? "Adding..." : "Add User"}
                            </button>

                        </form>

                        {userMessage && (
                            <p className="message">{userMessage}</p>
                        )}
                    </div>


                    {/* Post Form */}
                    <div className="card">
                        <h2>Create Post</h2>

                        <form onSubmit={handlePostSubmit}>

                            <label>Title</label>

                            <input
                                type="text"
                                placeholder="Enter post title"
                                value={postTitle}
                                onChange={(e) => setPostTitle(e.target.value)}
                            />

                            <label>Content</label>

                            <textarea
                                placeholder="Enter post content"
                                value={postContent}
                                onChange={(e) => setPostContent(e.target.value)}
                            />

                            <label>Select User</label>

                            <select
                                value={postUser}
                                onChange={(e) => setPostUser(e.target.value)}
                            >
                                <option value="">
                                    -- Select User --
                                </option>

                                {users.map((user) => (
                                    <option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {user.name} - {user.email}
                                    </option>
                                ))}
                            </select>

                            <button type="submit" disabled={loading}>
                                {loading ? "Adding..." : "Add Post"}
                            </button>

                        </form>

                        {postMessage && (
                            <p className="message">{postMessage}</p>
                        )}
                    </div>

                </div>


                {/* Posts */}
                <section className="posts-section">

                    <div className="posts-header">
                        <h2>All Posts</h2>

                        <button
                            className="refresh-btn"
                            onClick={() => {
                                fetchUsers();
                                fetchPosts();
                            }}
                        >
                            Refresh
                        </button>
                    </div>

                    {posts.length === 0 ? (
                        <div className="empty">
                            <p>No posts found.</p>
                            <p>Create a post using the form above.</p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div className="post-card" key={post._id}>

                                <h3>{post.title}</h3>

                                <p className="content">
                                    {post.content}
                                </p>

                                <div className="user-info">

                                    <strong>👤 User Information</strong>

                                    {post.user ? (
                                        <>
                                            <p>
                                                <strong>Name:</strong>{" "}
                                                {post.user.name}
                                            </p>

                                            <p>
                                                <strong>Email:</strong>{" "}
                                                {post.user.email}
                                            </p>
                                        </>
                                    ) : (
                                        <p>User information not available</p>
                                    )}

                                </div>

                                <small>
                                    Post ID: {post._id}
                                </small>

                            </div>
                        ))
                    )}

                </section>

            </main>
        </div>
    );
}

export default App;