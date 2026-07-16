import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/authRoutes.js";
import suggestionsRoutes from "./routes/suggestionsRoutes.js";
import clipboardRoutes from "./routes/clipboardRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes);
app.use("/api/suggestions", suggestionsRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/clipboard", clipboardRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
