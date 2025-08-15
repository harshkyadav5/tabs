import React from "react";
import { Outlet } from "react-router-dom";

export default function SimpleLayout() {
  return (
    <main className="py-18 bg-white z-0 w-full mx-auto self-center">
      <Outlet />
    </main>
  );
}
