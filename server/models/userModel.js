import pool from "../db/db.js";

export async function createUser({ username, email, passwordHash, createdAt, profilePicture }) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash, created_at, profile_picture)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, username, email, created_at, profile_picture`,
    [username, email, passwordHash, createdAt, profilePicture]
  );

  return result.rows[0];
}

export async function findUserByEmail(email) {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  return result.rows[0];
}

export async function findUserByUsername(username) {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );

  return result.rows[0];
}

export async function findUserById(id) {
  const result = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [id]
  );

  return result.rows[0];
}