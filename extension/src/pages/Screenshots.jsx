import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { icons } from "../components/icons";
import { useToast } from "../context/ToastContext";

export default function ScreenshotPage() {
  const [screenshot, setScreenshot] = useState(null);
  const [history, setHistory] = useState([]);
  const [isCaptureMenuOpen, setIsCaptureMenuOpen] = useState(false);
  const { showToast } = useToast();

  const handleCapture = async () => {
    try {
      const fakeScreenshotUrl = "https://images.unsplash.com/photo-1639629509821-c54cdd984227?q=80&w=2001&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3DD";
      setScreenshot(fakeScreenshotUrl);
      setHistory((prev) => [fakeScreenshotUrl, ...prev].slice(0, 8));
      setIsCaptureMenuOpen(false);
    } catch (error) {
      showToast("Failed to capture screenshot", "error");
    }
  };

  const handleCopy = async () => {
    if (!screenshot) return;
    const response = await fetch(screenshot);
    const blob = await response.blob();
    await navigator.clipboard.write([
      new ClipboardItem({ [blob.type]: blob })
    ]);
    showToast("Screenshot copied!", "success");
  };

  const handleUpload = async () => {
    if (!screenshot) return;

    showToast("Screenshot uploaded!", "success");
  };

  return (
    <div className="bg-slate-100 relative w-[600px] p-5 overflow-hidden font-montserrat">
      <div className="z-10 p-8 rounded-2xl bg-white shadow-lg h-full relative">
        <Navbar />

        <div className="mt-6 flex gap-6">
          <div className="flex flex-col items-center gap-4 flex-1">
            <div className="relative">
              <div
                className="w-44 h-44 rounded-2xl border border-white/40 shadow-lg backdrop-blur-sm transition-all overflow-hidden bg-slate-200"
              >
                {screenshot ? (
                  <img
                    src={screenshot}
                    alt="Screenshot Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                    No Screenshot
                  </div>
                )}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none" />
              <button
                onClick={() => setIsCaptureMenuOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white/60 border border-white/30 rounded-full shadow-md hover:shadow-lg hover:bg-white/80 transition-all backdrop-blur-sm active:scale-95"
              >
                {icons["camera"]}
                <span className="font-medium text-gray-700 text-base">
                  Take Screenshot
                </span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <div
              className="flex justify-between items-center text-base px-5 py-3 rounded-3xl bg-white/50 border border-white/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95"
              onClick={handleCopy}
            >
              <span className="text-gray-700 font-medium">Copy</span>
              {icons["copy"]}
            </div>
            <div
              className="flex justify-between items-center text-base px-5 py-3 rounded-3xl bg-white/50 border border-white/30 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all cursor-pointer active:scale-95"
              onClick={handleUpload}
            >
              <span className="text-gray-700 font-medium">Upload</span>
              {icons["upload"]}
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-3 tracking-wide">
                Recent Screenshots
              </p>
              <div className="grid grid-cols-4 gap-3">
                {history.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setScreenshot(img)}
                    className="w-12 h-12 rounded-lg border border-white/40 cursor-pointer hover:scale-110 transition-transform shadow-md overflow-hidden"
                  >
                    <img
                      src={img}
                      alt="history"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isCaptureMenuOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-2xl z-50 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-2xl transform scale-95 animate-scaleIn flex flex-col items-center gap-4">
              <p className="text-lg font-medium text-gray-700">Select Capture Mode</p>
              <div className="flex gap-3 mt-2 text-base">
                <button
                  onClick={handleCapture}
                  className="px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300/90 text-gray-700 transition-all duration-200 font-medium border border-slate-300/40 active:scale-95"
                >
                  Full Page
                </button>
                <button
                  onClick={() => setIsCaptureMenuOpen(false)}
                  className="px-5 py-2 rounded-full bg-transparent border border-gray-400 text-gray-700 font-medium hover:bg-gray-400 active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}
