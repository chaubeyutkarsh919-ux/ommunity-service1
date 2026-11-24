// 2.js - Express Middleware & Advanced API Server
// Week 3 Lecture: Express Middlewares, Request Lifecycle, and API Engine

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. BUILT-IN MIDDLEWARE
// ==========================================
// Parses incoming requests with JSON payloads
app.use(express.json());

// ==========================================
// 2. CUSTOM APPLICATION-LEVEL MIDDLEWARES
// ==========================================

// Request Logging Middleware (Tracks method, URL, timestamp & execution time)
const logMiddleware = (req, res, next) => {
    req.name = "John Doe"; // Attaching custom property to request object
    req.requestTime = new Date().toISOString();
    const startTime = Date.now();

    console.log(`[${req.requestTime}] ${req.method} ${req.url}`);

    // Log response status and duration once request finishes
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        console.log(`[${req.method} ${req.url}] completed in ${duration}ms with status ${res.statusCode}`);
    });

    next(); // CRITICAL: Always call next() to pass control to the next middleware/handler
};

// API Key Verification Middleware (Secures protected endpoints)
const apiCheckMiddleware = (req, res, next) => {
    // Whitelist public routes that do not require an API key
    const publicRoutes = ["/", "/health", "/about"];
    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Check for API key in query parameters or x-api-key header
    const apiKey = req.query.apiKey || req.headers["x-api-key"];
    const VALID_API_KEY = "antigravity123";

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized: Missing API Key",
            hint: "Pass ?apiKey=antigravity123 in URL or add \"x-api-key: antigravity123\" to headers"
        });
    }

    if (apiKey !== VALID_API_KEY) {
        return res.status(403).json({
            success: false,
            error: "Forbidden: Invalid API Key provided"
        });
    }

    // API Key valid, proceed to route
    next();
};

// Mount global middlewares
app.use(logMiddleware);
app.use(apiCheckMiddleware);

// ==========================================
// 3. CORE LECTURE ROUTES
// ==========================================

// Root endpoint: displays user context attached by logMiddleware
app.get("/", (req, res) => {
    console.log("Request user context:", req.name);
    res.json({
        message: "Hello World! Express Middleware Server is active.",
        user: req.name,
        timestamp: req.requestTime
    });
});

// Sample data endpoint (Protected by apiCheckMiddleware)
app.get("/data", (req, res) => {
    const sampleData = [
        { id: 1, title: "Week 3 - Middlewares", category: "Core Backend", status: "Active" },
        { id: 2, title: "Week 3 - Auth & Tokens", category: "Security", status: "Pending" },
        { id: 3, title: "Week 3 - Error Handlers", category: "Architecture", status: "Active" }
    ];

    res.json({
        success: true,
        count: sampleData.length,
        data: sampleData
    });
});

// Data submission endpoint demonstrating req.body processing
app.post("/data", (req, res) => {
    const { title, category } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            error: "Validation failed: \"title\" and \"category\" fields are required."
        });
    }

    const newItem = {
        id: Date.now(),
        title,
        category,
        createdBy: req.name,
        createdAt: req.requestTime
    };

    res.status(201).json({
        success: true,
        message: "Item created successfully",
        item: newItem
    });
});

// ==========================================
// 4. APPLIED METRIC-ENGINEERING TELEMETRY API
// ==========================================

// Telemetry state simulating localized gravitational metric inducer
let metricState = {
    active: true,
    yorkCurvature: {
        thetaTop: -0.042, // Compression ahead (1/m)
        thetaBottom: 0.042, // Expansion behind (1/m)
        gradientDelta: -0.084 // Net upward acceleration gradient
    },
    quantumVacuum: {
        squeezeParameterR: 1.84,
        squeezingPhaseRad: 0.00,
        negativeEnergyDensityJoulesM3: -3.84e14, // <T_00> < 0
        metamaterialResonanceTHz: 30.5
    },
    propulsionPower: {
        fusionCoreOutputGW: 120,
        cryogenicHeatLoadMW: 1.2,
        superconductingTempKelvin: 4.2
    },
    localInertialGForce: 0.00 // Zero proper acceleration inside Minkowski bubble
};

// GET: Current metric inducer telemetry
app.get("/api/antigravity/status", (req, res) => {
    res.json({
        success: true,
        system: "Coherent Metric Inducer (CMI) Flight Telemetry",
        telemetry: metricState,
        serverTime: new Date().toISOString()
    });
});

// POST: Modulate metric parameters (squeeze parameter, phase, or gradient)
app.post("/api/antigravity/modulate", (req, res) => {
    const { squeezeParameterR, squeezingPhaseRad, netThrustLevel } = req.body;

    if (squeezeParameterR !== undefined) {
        metricState.quantumVacuum.squeezeParameterR = Number(squeezeParameterR);
        metricState.quantumVacuum.negativeEnergyDensityJoulesM3 = -(Math.sinh(squeezeParameterR) ** 2) * 1e14;
    }

    if (squeezingPhaseRad !== undefined) {
        metricState.quantumVacuum.squeezingPhaseRad = Number(squeezingPhaseRad);
    }

    if (netThrustLevel !== undefined) {
        const factor = Math.max(0, Math.min(1, Number(netThrustLevel)));
        metricState.yorkCurvature.thetaTop = -0.042 * factor;
        metricState.yorkCurvature.thetaBottom = 0.042 * factor;
        metricState.yorkCurvature.gradientDelta = -0.084 * factor;
    }

    res.json({
        success: true,
        message: "Metric parameters successfully modulated",
        updatedState: metricState
    });
});

// ==========================================
// 5. GLOBAL 404 & ERROR HANDLING MIDDLEWARES
// ==========================================

// Catch-all 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "404: Endpoint not found",
        path: req.originalUrl
    });
});

// Global Error-Handling Middleware (Must take 4 arguments: err, req, res, next)
app.use((err, req, res, next) => {
    console.error("Global Error Caught:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: "Internal Server Error",
        details: err.message
    });
});

// ==========================================
// 6. SERVER INITIALIZATION
// ==========================================
app.listen(PORT, () => {
    console.log(`==============================================`);
    console.log(`Server is running on port ${PORT}`);
    console.log(`Endpoint: http://localhost:${PORT}/`);
    console.log(`Data Endpoint: http://localhost:${PORT}/data?apiKey=antigravity123`);
    console.log(`Telemetry API: http://localhost:${PORT}/api/antigravity/status?apiKey=antigravity123`);
    console.log(`==============================================`);
});