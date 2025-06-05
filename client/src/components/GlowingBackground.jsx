import React from "react";

export default function GlowingBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="blur-blob blur-blob-1" />
      <div className="blur-blob blur-blob-2" />
      <div className="blur-blob blur-blob-3" />
      <div className="blur-blob blur-blob-4" />
    </div>
  );
}
