import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./db.js"; // now importing and using directly
import vehiclesRoutes from "./routes/vehicles.js"; // your route
import maintenanceRoutes from "./routes/maintenance.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Fleet Management System is up!");
});

// routes
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/maintenance", maintenanceRoutes);

// Start server only after DB connects
db.connect()
  .then(() => {
    console.log("✅ Connected to PostgreSQL");
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Could not connect to PostgreSQL", err);
  });
