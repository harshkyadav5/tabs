import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function HomeLayout() {
  return (
    <div className="flex">
      <SideMenu />
      <main className="ml-80 py-20 px-8 max-w-4xl w-full">
        <Outlet />
      </main>
    </div>
  );
}
