const express = require("express");
const colorRoutes = require("./routes/colorRoutes");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 4000;

const allowedOrigins = ["http://192.168.1.190:3000", "http://localhost:3000"];

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Add this middleware to log incoming requests
app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${
      req.headers.origin
    }`
  );
  next();
});

app.use((req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, private"
  );
  next();
});

app.use("/api", colorRoutes);

// Add a test route
app.get("/test", (req, res) => {
  res.send("Server is reachable");
});

const ip = "0.0.0.0"; // Listen on all available network interfaces
app.listen(port, ip, () => {
  console.log(`RAL Color API listening at http://${ip}:${port}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
