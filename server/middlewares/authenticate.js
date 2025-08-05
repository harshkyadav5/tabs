import jwt from "jsonwebtoken";
import pool from "../db/db.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userQuery = await pool.query("SELECT * FROM users WHERE id = $1", [decoded.userId]);
    if (userQuery.rows.length === 0) throw new Error("User not found");

    req.user = userQuery.rows[0];
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default authenticate;
