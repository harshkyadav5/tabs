import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

export default function HomeLayout() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <SideMenu />
      <main className="flex-1 pt-20 pb-16 px-4 md:pt-24 md:pr-10 md:pl-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
