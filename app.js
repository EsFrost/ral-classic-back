const express = require("express");
const colorRoutes = require("./routes/colorRoutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 8080;

// Configure CORS
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET"], // Allow all methods
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

// Handle preflight requests
app.options("*", cors(corsOptions));

app.use("/ral-classic/api", colorRoutes);

app.listen(port, () => {
  console.log(`RAL Color API listening at http://localhost:${port}`);
  console.log("CORS is now open to all origins");
});
