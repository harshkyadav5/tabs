import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ClipboardItem from "../components/ClipboardItem";
import { useToast } from "../context/ToastContext";

const dummyClipboard = [
  { id: 1, description: "Email Template", content: "Hello, thank you for reaching out..." },
  { id: 2, description: "Link to Docs", content: "https://docs.example.com" },
  { id: 3, description: "", content: "This one has a lot more text so the height will be bigger.\nLine 2\nLine 3\nLine 4" },
  { id: 4, description: "Short note", content: "Tiny" },
  { id: 5, description: "Big content", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent mollis felis sit amet ex sollicitudin, eget fringilla turpis hendrerit.\nAnother line.\nMore lines.\nEven more lines.\nThis will be tall. oij fiuuhufh uuc hreh iev eh erhyeh yhvyh eryh yhvyh verhy hrrehcyh fh yi" },
];

export default function Clipboard() {
  const [items, setItems] = useState(dummyClipboard);
  const { showToast } = useToast();

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to Clipboard!", "success");
  };

  const handleEditDescription = (id, newDescription) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, description: newDescription } : item))
    );
  };

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
      <div className="p-8 rounded-2xl bg-white shadow-lg h-full">
        <Navbar />

        <div className="mt-4 columns-3 gap-3 space-y-3">
          {items.map((item) => (
            <ClipboardItem
              key={item.id}
              item={item}
              onCopy={handleCopy}
              onEditDescription={handleEditDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
