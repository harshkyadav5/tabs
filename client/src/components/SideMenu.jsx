import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import {
  BookmarksNavIcon,
  NotesNavIcon,
  MusicNavIcon,
  SearchIcon,
  ClipboardNavIcon,
  ScreenshotNavIcon,
  ColorPickerNavIcon,
  ArchiveIcon,
  TrashIcon,
} from "./icons";

const featureItems = [
  { label: "Bookmarks", destination: '/bookmarks', icon: <BookmarksNavIcon /> },
  { label: "Notes", destination: '/notes', icon: <NotesNavIcon /> },
  { label: "Music", destination: '/music', icon: <MusicNavIcon /> },
  { label: "Search", destination: '/search', icon: <SearchIcon /> },
];

const toolItems = [
  { label: "Clipboard", destination: '/clipboard', icon: <ClipboardNavIcon /> },
  { label: "Screenshot", destination: '/screenshot', icon: <ScreenshotNavIcon /> },
  { label: "Color Picker", destination: '/color-picker', icon: <ColorPickerNavIcon /> },
];

const archivedItems = [
  { label: "Archive", destination: '/archive', icon: <ArchiveIcon className="w-6 h-6" /> },
];

const deletedItems = [
  { label: "Recycle Bin", destination: '/recycle-bin', icon: <TrashIcon className="w-6 h-6" /> },
];


export default function SideMenu() {
  const location = useLocation();
  const { mobileOpen, setMobileOpen } = useSidebar();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, setMobileOpen]);

  const linkClass = (path) =>
    `flex items-center space-x-3 px-3 py-2 rounded-lg tracking-wider text-sm font-medium transition ${
      location.pathname === path
        ? 'bg-gray-300 text-indigo-600'
        : 'text-gray-800 hover:bg-gray-300'
    }`;

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        role="navigation"
        aria-label="Sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white md:bg-transparent h-full p-10 pr-5 flex flex-col justify-between select-none transform transition-transform duration-300 md:static md:z-auto md:translate-x-0 md:transition-none ${
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
      <button
        type="button"
        onClick={() => setMobileOpen(false)}
        aria-label="Close menu"
        className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full transition"
      >
        &times;
      </button>

      <div className="mt-16 overflow-scroll">
        <div className="flex items-center px-1">
            <ul className="space-y-1 w-[100%]">
              <li>
                <Link
                  to="/"
                  className={linkClass('/')}
                  aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                  <span>For You</span>
                </Link>
              </li>
            </ul>

        </div>

        <div className="mb-1">
            <div className="inline-flex items-center justify-left w-full">
                <span className="text-xs font-semibold text-gray-500 pl-2 mr-2 uppercase tracking-wider">
                    Features
                </span>
                <hr className="w-64 h-px my-6 rounded-xs bg-gray-500 border-0" />
            </div>

          <ul className="space-y-1">
            {featureItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.destination}
                  className={linkClass(item.destination)}
                  aria-current={location.pathname === item.destination ? 'page' : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-1">
            <div className="inline-flex items-center justify-left w-full">
                <span className="text-xs font-semibold text-gray-500 pl-2 mr-2 uppercase tracking-wider">
                    Tools
                </span>
                <hr className="w-64 h-px my-6 rounded-xs bg-gray-500 border-0" />
            </div>

          <ul className="space-y-1">
            {toolItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.destination}
                  className={linkClass(item.destination)}
                  aria-current={location.pathname === item.destination ? 'page' : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-1">
            <div className="inline-flex items-center justify-left w-full">
                <hr className="w-64 h-px my-6 rounded-xs bg-gray-500 border-0" />
            </div>

          <ul className="space-y-1">
            {archivedItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.destination}
                  className={linkClass(item.destination)}
                  aria-current={location.pathname === item.destination ? 'page' : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}

            {deletedItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.destination}
                  className={linkClass(item.destination)}
                  aria-current={location.pathname === item.destination ? 'page' : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="text-xs text-center text-gray-500 pt-6">
        © {new Date().getFullYear()} Tabs
      </footer>
      </aside>
    </>
  );
}
