// Only contains backend logic (no router)

import db from "../db.js";

// CREATE a new vehicle
export const createVehicle = async (req, res) => {
  const { license_plate, model, manufacturer, year } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO vehicles (license_plate, model, manufacturer, year)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [license_plate, model, manufacturer, year]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error inserting vehicle:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET all vehicles or filter by status
export const getAllVehicles = async (req, res) => {
    const { status, page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;
  
    try {
      let result;
      if (status) {
        result = await db.query(
          "SELECT * FROM vehicles WHERE status = $1 ORDER BY id DESC LIMIT $2 OFFSET $3",
          [status, limit, offset]
        );
      } else {
        result = await db.query(
          "SELECT * FROM vehicles ORDER BY id DESC LIMIT $1 OFFSET $2",
          [limit, offset]
        );
      }
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

// GET vehicle count
export const getVehicleCount = async (req, res) => {
  try {
    const result = await db.query("SELECT COUNT(*) FROM vehicles");
    res.status(200).json({ count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    console.error("Error counting vehicles:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET single vehicle by ID with maintenance history
export const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleResult = await db.query("SELECT * FROM vehicles WHERE id = $1", [id]);

    if (vehicleResult.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const maintenanceResult = await db.query(
      "SELECT * FROM maintenance WHERE vehicle_id = $1 ORDER BY date_performed DESC",
      [id]
    );

    const vehicle = vehicleResult.rows[0];
    vehicle.maintenance_history = maintenanceResult.rows;

    res.status(200).json(vehicle);
  } catch (err) {
    console.error("Error fetching vehicle + maintenance:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE a vehicle
export const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const { license_plate, model, manufacturer, year, status } = req.body;

  try {
    const result = await db.query(
      `UPDATE vehicles
       SET license_plate = $1, model = $2, manufacturer = $3, year = $4, status = $5
       WHERE id = $6 RETURNING *`,
      [license_plate, model, manufacturer, year, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating vehicle:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a vehicle
export const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query("DELETE FROM vehicles WHERE id = $1 RETURNING *", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    res.status(200).json({ message: "Vehicle deleted", vehicle: result.rows[0] });
  } catch (err) {
    console.error("Error deleting vehicle:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
