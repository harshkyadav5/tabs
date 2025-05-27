import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-slate-300 dark:from-black dark:to-gray-900 transition-colors duration-300">
      <Navbar />
      <Home />
      {/* <SignUp /> */}
      {/* <SignIn /> */}
    </div>
  );
}