import React, { useState, useEffect } from "react";
import FolderItem from "../components/FolderItem";
import BookmarkList from "../components/BookmarkList";

const addBookmark = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M11 2C7.229 2 5.343 2 4.172 3.129C3 4.257 3 6.074 3 9.708v8.273c0 2.306 0 3.459.773 3.871
         1.496.8 4.304-1.867 5.637-2.67.773-.465 1.16-.698 1.59-.698s.817.233 1.59.698c1.333.803 
         4.14 3.47 5.637 2.67c.773-.412.773-1.565.773-3.871V13m-2-3V2m-4 4h8"/>
  </svg>
);

const addFolder = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="M18 13.5v8m4-4h-8m-7-11h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 
         .827.827c.465.695.502 1.851.505 3.667M12 6.5l-.633-1.267c-.525-1.05-1.005-2.106-2.168-2.542C8.69 
         2.5 8.108 2.5 6.944 2.5c-1.816 0-2.724 0-3.406.38A3 3 0 0 0 2.38 
         4.038C2 4.72 2 5.628 2 7.444V10.5c0 4.714 0 7.071 1.464 8.535C4.822 
         20.394 6.944 20.493 11 20.5"/>
  </svg>
);

const folderi = (
  <svg viewBox="0 0 24 24" fill="url(#grad)" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#fde68a" />
      </linearGradient>
    </defs>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M7 7h9.75c2.107 0 3.16 0 3.917.506a3 3 0 0 1 
         .827.827C22 9.09 22 10.143 22 12.25c0 3.511 0 5.267-.843 6.528a5 5 0 0 1-1.38 
         1.38C18.518 21 16.762 21 13.25 21H12c-4.714 0-7.071 0-8.536-1.465C2 
         18.072 2 15.715 2 11V7.944c0-1.816 0-2.724.38-3.406A3 3 0 0 1 
         3.538 3.38C4.22 3 5.128 3 6.944 3C8.108 3 8.69 3 9.2 3.191c1.163.436 
         1.643 1.493 2.168 2.542L12 7"
      fill="url(#grad)"
    />
  </svg>
);

const star = (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
    <path fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
      d="m13.728 3.444l1.76 3.549c.24.494.88.968 1.42 1.058l3.189.535c2.04.343 2.52 1.835 
         1.05 3.307l-2.48 2.5c-.42.423-.65 1.24-.52 1.825l.71 3.095c.56 2.45-.73 3.397-2.88 
         2.117l-2.99-1.785c-.54-.322-1.43-.322-1.98 0L8.019 21.43c-2.14 1.28-3.44.322-2.88-2.117l.71-3.095c.13-.585-.1-1.402-.52-1.825l-2.48-2.5C1.39 10.42 1.86 8.929 3.899 8.586l3.19-.535c.53-.09 
         1.17-.564 1.41-1.058l1.76-3.549c.96-1.925 2.52-1.925 3.47 0"/>
  </svg>
);

const folders = [
  { name: "Work" },
  { name: "Personal" },
  { name: "Projects" },
  { name: "Ideas" },
  { name: "Research" },
  { name: "Reading List" },
  { name: "Design" },
];

const bookmarks = [
  {
    title: "Webflow",
    url: "https://www.webflow.com/",
    views: 371,
    description: "My favorite of all of these",
  },
  {
    title: "Bubble.io",
    url: "https://bubble.io/",
    views: 121,
  },
  {
    title: "Play",
    url: "https://www.createwithplay.com/",
    views: 29,
    description: "Design in Swift from your mobile device. Super cool.",
  },
  {
    title: "Ycode",
    url: "https://www.ycode.com/",
    views: 27,
    description: "Brand new and I haven’t tried this one yet, but looks cool.",
  },
  {
    title: "Webflow",
    url: "https://www.webflow.com/",
    views: 371,
    description: "My favorite of all of these",
  },
  {
    title: "Bubble.io",
    url: "https://bubble.io/",
    views: 121,
  },
  {
    title: "Play",
    url: "https://www.createwithplay.com/",
    views: 29,
    description: "Design in Swift from your mobile device. Super cool.",
  },
  {
    title: "Ycode",
    url: "https://www.ycode.com/",
    views: 27,
    description: "Brand new and I haven’t tried this one yet, but looks cool.",
  },
  {
    title: "Webflow",
    url: "https://www.webflow.com/",
    views: 371,
    description: "My favorite of all of these",
  },
  {
    title: "Bubble.io",
    url: "https://bubble.io/",
    views: 121,
  },
  {
    title: "Play",
    url: "https://www.createwithplay.com/",
    views: 29,
    description: "Design in Swift from your mobile device. Super cool.",
  },
  {
    title: "Ycode",
    url: "https://www.ycode.com/",
    views: 27,
    description: "Brand new and I haven’t tried this one yet, but looks cool.",
  },
];

export default function Bookmarks() {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const folderScrollRef = React.useRef(null);

  const handleScroll = () => {
    const el = folderScrollRef.current;
    if (!el)
      return;

    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;

    setAtStart(scrollLeft <= 1);
    setAtEnd(scrollLeft >= maxScrollLeft - 1);
  };

  useEffect(() => {
    const el = folderScrollRef.current;
    if (!el)
      return;

    handleScroll();
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="w-full font-montserrat">
      
      {/* Top bar with buttons */}
      <div className="w-full rounded-4xl mb-8">
        <div className="px-4 w-full flex justify-end">
          <div className="flex items-center border border-gray-400 bg-white/70 rounded-full p-3">
            <button className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200">
              {addBookmark}
            </button>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2" />
            <button className="p-2 hover:bg-black/85 text-gray-800 hover:text-white rounded-full transition duration-200">
              {addFolder}
            </button>
          </div>
        </div>
      </div>

      {/* Folders Section */}
      <div className="w-full rounded-4xl mb-8 p-4 bg-white shadow-[0_3px_25px_rgba(0,0,0,0.15)]">
        <div className="pb-4 flex justify-end">
          <button className="px-4 py-2 text-sm font-medium rounded-full text-gray-800 hover:bg-black/85 hover:text-white transition duration-200">
            View All
          </button>
        </div>

        <div
          ref={folderScrollRef}
          className={`flex overflow-x-auto whitespace-nowrap space-x-4 p-4 pt-0 transition-all duration-200 ${
            !atStart && !atEnd
              ? "mask-to-l-r"
              : !atStart
              ? "mask-to-r"
              : !atEnd
              ? "mask-to-l"
              : ""
          }`}
        >
          
          {/* Favorite Folder */}
          <FolderItem
            icon={folderi}
            overlay={star}
            label="Favorite"
            tooltip="Favorite Bookmarks"
            onClick={() => console.log("Clicked: Favorite")}
          />

          {/* Dynamic Folder Items */}
          {folders.map((folder, i) => (
            <FolderItem
              key={i}
              icon={folderi}
              overlay={folder.name.charAt(0).toUpperCase()}
              label={folder.name}
              tooltip={folder.name}
              onClick={() => console.log("Clicked folder:", folder.name)}
            />
          ))}

        </div>
      </div>

      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Bookmarks</h1>
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </aside>
  );
}
