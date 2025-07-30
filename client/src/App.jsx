import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Notes from "./pages/Notes";
import Bookmarks from "./pages/Bookmarks";
import Clipboard from "./pages/Clipboard";
import ColorPicker from "./pages/ColorPicker";
import HomeLayout from "./layouts/HomeLayout";
import SimpleLayout from "./layouts/SimpleLayout";

export default function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-300 dark:from-black dark:to-gray-900 transition-colors duration-300">
      {!isAuthPage && <Navbar />}

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/clipboard" element={<Clipboard />} />
          <Route path="/color-picker" element={<ColorPicker />} />
        </Route>

        <Route element={<SimpleLayout />}>
          <Route path="/music" element={<Music />} />
        </Route>
      </Routes>
    </div>
  );
}
