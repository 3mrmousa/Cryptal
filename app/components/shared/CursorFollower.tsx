"use client";

import { useLayoutEffect, useState } from "react";

type Pos = { x: number; y: number };

function CursorFollower() {
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    function handleMove(e: PointerEvent) {
      setPos({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        left: -15,
        top: -15,
        width: 30,
        height: 30,
        borderRadius: "50%",
        opacity: 0.2,
        pointerEvents: "none",
        zIndex: 9999,
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
      className="bg-black dark:bg-white hidden lg:block"
    />
  );
}

export default CursorFollower;
