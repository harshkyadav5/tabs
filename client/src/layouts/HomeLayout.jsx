import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function HomeLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideMenu />
      <main className="flex-1 pt-24 pb-16 pr-10 pl-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
