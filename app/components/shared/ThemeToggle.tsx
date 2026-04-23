/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      className="cursor-pointer"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <p className="text-2xl font-semibold">
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </p>
    </button>
  );
}

export default ThemeToggle;
