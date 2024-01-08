"use client";
import HomeIcon from "./Icons/Fruits";
import Link from "next/link";
import FruitsIcon from "./Icons/Fruits";
import { useContext, useState } from "react";
import "@/styles/hamburgers.css";
import Image from "next/image";
import { GlobalContext } from "@/context/globalContext";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const { prefersDarkMode, setPrefersDarkMode } = useContext(GlobalContext);

  function handleMenu() {
    setIsCollapsed((state) => !state);
  }

  function toggleColorMode() {
    const currentMode = localStorage.getItem("colorMode"),
      newMode = currentMode === "dark" ? "light" : "dark";

    localStorage.setItem("colorMode", newMode);
    setPrefersDarkMode((state) => !state);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header className="absolute flex items-center flex-col justify-around gap-0 md:gap-2 md:flex-row left-8 top-6 border-2 transition-all duration-1000 border-accent-primary md:border px-4 py-2 rounded-lg will-change-content">
      <button
        onClick={handleMenu}
        id="menu"
        tabIndex={0}
        aria-label="Menu"
        className={`grid hamburger hamburger--vortex ${
          !isCollapsed && "is-active"
        }`}
        type="button"
        aria-controls="navigation"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <nav className="flex flex-col gap-2 justify-center text-2xl text-light">
        <Link
          href="/"
          className="animate__animated hover:scale-110 active:scale-95 hidden flex gap-3 hover:text-accent-primary hover:scale-110"
        >
          <HomeIcon />
          Home
        </Link>
        <a
          id="fruits"
          className="animate__animated hover:scale-110 active:scale-95 hidden flex gap-3 hover:text-accent-primary hover:scale-110"
        >
          <FruitsIcon />
          Fruits
        </a>
      </nav>

      <button
        className="animate__animated hidden md:grid hover:scale-110 active:scale-95 transition-all"
        type="button"
        onClick={toggleColorMode}
      >
        {!prefersDarkMode ? (
          <Image
            src="/icons/icons8-moon-78.png"
            alt="Switch to Dark mode"
            id="toggleColorMode"
            width="40"
            height="40"
          />
        ) : (
          <Image
            src="/icons/icons8-light-mode-78.png"
            alt="Switch to Light mode"
            id="toggleColorMode"
            width="40"
            height="40"
          />
        )}
      </button>
    </header>
  );
}
