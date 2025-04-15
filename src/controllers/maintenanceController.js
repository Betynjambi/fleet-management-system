// Purpose: Only contains the backend logic — the what to do ie Talk to the database, Handle validation, Return responses
// Does NOT: Define route paths like router.get() or router.post()

import db from "../db.js";

// POST /api/maintenance
export const logMaintenance = async (req, res) => {
  const { vehicle_id, description } = req.body;

  if (!vehicle_id || !description || description.trim() === "") {
    return res.status(400).json({ error: "Vehicle ID and description are required" });
  }

  try {
    const vehicle = await db.query("SELECT id FROM vehicles WHERE id = $1", [vehicle_id]);
    if (vehicle.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const result = await db.query(
      `INSERT INTO maintenance (vehicle_id, description)
       VALUES ($1, $2) RETURNING *`,
      [vehicle_id, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error logging maintenance:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /api/maintenance/:vehicleId
export const getMaintenanceHistory = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM maintenance WHERE vehicle_id = $1 ORDER BY date_performed DESC`,
      [vehicleId]
    );

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching maintenance records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
