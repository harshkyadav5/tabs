import { useEffect, useRef, useState } from "react";

export default function ScrollingText({ text, className = "", width = 240, speed = 30, gap = 100, startDelay = 5000, loopPause = 3000 }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const styleElRef = useRef(null);
  const animNameRef = useRef(`marquee_${Math.random().toString(36).slice(2)}`);
  const [textWidth, setTextWidth] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [animActive, setAnimActive] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (!textRef.current || !containerRef.current) return;
      const w = textRef.current.scrollWidth;
      setTextWidth(w);
      setIsOverflowing(w > containerRef.current.clientWidth);
    };
    measure();

    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      ro.observe(textRef.current);
      ro.observe(containerRef.current);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, [text, width]);

  // Initial delay before first scroll
  useEffect(() => {
    if (!isOverflowing) {
      setPhase("idle");
      return;
    }
    setPhase("startWait");
    const t = setTimeout(() => setPhase("scrolling"), startDelay);
    return () => clearTimeout(t);
  }, [isOverflowing, startDelay, textWidth]);

  // Scroll loop control (pause between loops)
  useEffect(() => {
    if (phase !== "scrolling" || !isOverflowing || !textWidth) return;

    const scrollDistance = textWidth + gap;
    const duration = (scrollDistance / speed) * 1000;
    const name = animNameRef.current;

    const injectKeyframes = () => {
      if (styleElRef.current) {
        document.head.removeChild(styleElRef.current);
        styleElRef.current = null;
      }
      const css = `
        @keyframes ${name} {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${scrollDistance}px); }
        }
      `;
      const styleEl = document.createElement("style");
      styleEl.setAttribute("data-marquee", name);
      styleEl.appendChild(document.createTextNode(css));
      document.head.appendChild(styleEl);
      styleElRef.current = styleEl;
    };

    injectKeyframes();

    let running = true;

    const loop = () => {
      if (!running) return;
      setAnimActive(true);
      setTimeout(() => {
        setAnimActive(false);
        setTimeout(loop, loopPause); // pause before restart
      }, duration);
    };

    loop();

    return () => {
      running = false;
      if (styleElRef.current) {
        document.head.removeChild(styleElRef.current);
        styleElRef.current = null;
      }
    };
  }, [phase, isOverflowing, textWidth, gap, speed, loopPause]);

  const scrollDistance = textWidth ? textWidth + gap : 0;
  const durationSec = scrollDistance / (speed || 1);

  const mask =
    isOverflowing && animActive
      ? "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 12%, rgba(0,0,0,1) 88%, rgba(0,0,0,0))"
      : "none";

  const wrapperStyle =
    animActive && isOverflowing && textWidth
      ? {
          display: "inline-flex",
          whiteSpace: "nowrap",
          animation: `${animNameRef.current} ${durationSec}s linear 1`,
        }
      : { display: "inline-flex", whiteSpace: "nowrap", transform: "translateX(0)" };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden whitespace-nowrap"
      style={{
        width,
        WebkitMaskImage: mask,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
      }}
    >
      <div style={wrapperStyle}>
        <span
          ref={textRef}
          className={`${className} inline-block`}
          style={
            !animActive && isOverflowing
              ? {
                  maxWidth: `${width}px`,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }
              : { display: "inline-block" }
          }
        >
          {text}
        </span>
        {animActive && isOverflowing && (
          <span
            style={{ display: "inline-block", paddingLeft: `${gap}px` }}
            className={className}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
}
