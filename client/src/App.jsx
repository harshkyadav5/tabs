import React from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import MusicNavbar from "./components/MusicNavbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Notes from "./pages/Notes";
import Bookmarks from "./pages/Bookmarks";
import Clipboard from "./pages/Clipboard";
import ScreenshotGallery from "./pages/ScreenshotGallery";
import ColorPicker from "./pages/ColorPicker";
import Archive from "./pages/Archive";
import RecycleBin from "./pages/RecycleBin";
import HomeLayout from "./layouts/HomeLayout";
import SimpleLayout from "./layouts/SimpleLayout";

const MusicPageWrapper = () => {
  const { query } = useParams();
  return <Music query={query} />;
};

export default function App() {
  const location = useLocation();

  const isAuthPage = location.pathname === "/signin" || location.pathname === "/signup";
  const isProfilePage = location.pathname === "/profile";
  const isMusicPage = location.pathname.startsWith("/music");

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-300 transition-colors duration-300">
      {!isAuthPage && !isProfilePage && !isMusicPage && <Navbar />}
      {isProfilePage && <Navbar />}
      {isMusicPage && <MusicNavbar />}

      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/profile" element={<Profile />} />

        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/clipboard" element={<Clipboard />} />
          <Route path="/screenshot" element={<ScreenshotGallery />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/recycle-bin" element={<RecycleBin />} />
          <Route path="/archive" element={<Archive />} />
        </Route>

        <Route element={<SimpleLayout />}>
          <Route path="/music" element={<Music />} />
          <Route path="/music/search/:query" element={<MusicPageWrapper />} />
        </Route>
      </Routes>
    </div>
  );
}
