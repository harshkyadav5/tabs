import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Clipboard from "./pages/Clipboard";
// import ColorPicker from "./pages/ColorPicker";
// import Music from "./pages/Music";
// import Screenshots from "./pages/Screenshots";
// import Bookmarks from "./pages/Bookmarks";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/clipboard" element={<Clipboard />} />
      {/* <Route path="/color-picker" element={<ColorPicker />} /> */}
      {/* <Route path="/music" element={<Music />} /> */}
      {/* <Route path="/screenshots" element={<Screenshots />} /> */}
      {/* <Route path="/bookmarks" element={<Bookmarks />} /> */}
    </Routes>
  );
}
