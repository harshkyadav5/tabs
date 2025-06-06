import React from "react";
import { Outlet } from "react-router-dom";

export default function SimpleLayout() {
  return (
    <main className="py-20 px-8 max-w-screen-xl w-full mx-auto self-center">
      <Outlet />
    </main>
  );
}
