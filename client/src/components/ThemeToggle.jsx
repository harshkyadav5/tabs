import React, { useState, useRef, useEffect } from "react";

const THEME_KEY = "tabs-app-theme";

const icons = {
  light: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-500" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Zm4 8a4 4 0 1 1-8 0a4 4 0 0 1 8 0Zm-.464 4.95l.707.707a1 1 0 0 0 1.414-1.414l-.707-.707a1 1 0 0 0-1.414 1.414Zm2.12-10.607a1 1 0 0 1 0 1.414l-.706.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM17 11a1 1 0 1 0 0-2h-1a1 1 0 1 0 0 2h1Zm-7 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1ZM5.05 6.464A1 1 0 1 0 6.465 5.05l-.708-.707a1 1 0 0 0-1.414 1.414l.707.707Zm1.414 8.486l-.707.707a1 1 0 0 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414ZM4 11a1 1 0 1 0 0-2H3a1 1 0 0 0 0 2h1Z" clip-rule="evenodd"/></svg>
  ),
  dark: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black dark:text-gray-200" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M7.455 2.004a.75.75 0 0 1 .26.77a7 7 0 0 0 9.958 7.967a.75.75 0 0 1 1.067.853A8.5 8.5 0 1 1 6.647 1.921a.75.75 0 0 1 .808.083Z" clip-rule="evenodd"/></svg>
  ),
  system: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-900 dark:text-slate-200" viewBox="0 0 24 24"><g fill="currentColor"><path fill-rule="evenodd" d="M2.879 3.844C2 4.687 2 6.044 2 8.76v.96c0 2.715 0 4.073.879 4.916c.878.844 2.293.844 5.121.844h8c2.828 0 4.243 0 5.121-.844c.879-.843.879-2.2.879-4.916v-.96c0-2.715 0-4.073-.879-4.916C20.243 3 18.828 3 16 3H8c-2.828 0-4.243 0-5.121.844Z" clip-rule="evenodd"/><path d="M18.237 19.596L12.75 17.84v-2.36h-1.5v2.36l-5.487 1.756a.714.714 0 0 0-.474.911a.757.757 0 0 0 .948.455L12 19.118l5.763 1.845a.757.757 0 0 0 .949-.456a.714.714 0 0 0-.475-.91Z" opacity=".5"/></g></svg>
  ),
};

export default function ThemeToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "system");

  const toggleRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    function applyTheme(value) {
      if (value === "dark") {
        root.classList.add("dark");
      } else if (value === "light") {
        root.classList.remove("dark");
      } else {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (isDark) root.classList.add("dark");
        else root.classList.remove("dark");
      }
    }

    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  function handleSelect(newTheme) {
    setTheme(newTheme);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={toggleRef}>
      <button
        aria-label="Select theme"
        onClick={() => setIsOpen((v) => !v)}
        className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800 transition"
      >
        {icons[theme]}
      </button>

      {isOpen && (
        <ul
          className="
            absolute right-0 mt-2 w-40
            bg-white dark:bg-gray-700
            rounded-xl p-2
            shadow-xl border border-white/20 dark:border-white/10
            ring-1 ring-white dark:ring-black ring-opacity-5
            focus:outline-none
            z-50
            flex flex-col gap-y-1
          "
        >
          {["light", "dark", "system"].map((mode) => (
            <li key={mode}>
              <button
                onClick={() => handleSelect(mode)}
                className={`
                  flex items-center px-4 py-2 w-full text-left
                  hover:bg-gray-100 dark:hover:bg-gray-500
                  hover:text-black
                  ${theme === mode ? "bg-blue-500 text-white" : ""}
                  rounded-lg
                  transition-colors duration-200
                `}
              >
                <div className="flex items-center space-x-2 dark:text-white">
                  {icons[mode]}
                  <span className="capitalize">{mode}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
