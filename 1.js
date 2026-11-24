// 1.js - Express Middleware Introduction
// Week 3 Lecture: Basic Application-Level Middlewares

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 1: Logging & attaching properties to the request object
const logMiddleware = (req, res, next) => {
    req.name = "John Doe";
    console.log("Request URL:", req.url, "| Request Method:", req.method);
    next(); // Move to the next middleware or route handler
};

// Middleware 2: API validation check
const apiCheckMiddleware = (req, res, next) => {
    // Example validation check
    const apiKey = req.query.apiKey || req.headers["x-api-key"];
    console.log("Checking API access for:", req.url);

    // If query has ?apiKey=12345 or header x-api-key: 12345, allow
    if (!apiKey || apiKey !== "12345") {
        console.warn("API check failed: Invalid or missing API key");
        return res.status(403).json({ error: "Forbidden: Provide valid ?apiKey=12345" });
    }

    next(); // Valid key, proceed to route
};

// Register middlewares globally
app.use(logMiddleware);

// Public route (before auth middleware)
app.get("/", (req, res) => {
    console.log("Request name:", req.name);
    res.send(`Hello World! Greeting from ${req.name}`);
});

// Protected route (using apiCheckMiddleware)
app.get("/data", apiCheckMiddleware, (req, res) => {
    res.json({
        message: "Data access granted",
        user: req.name,
        records: [10, 20, 30, 40]
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});