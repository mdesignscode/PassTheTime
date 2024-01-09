"use client";
import HomeIcon from "./Icons/Fruits";
import Link from "next/link";
import FruitsIcon from "./Icons/Fruits";
import { useContext, useState } from "react";
import "@/styles/app.css";
import "@/styles/hamburgers.css";
import Image from "next/image";
import { GlobalContext } from "@/context/globalContext";
import "animate.css";

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navLinks = [
    {
      path: "/",
      icon: <HomeIcon />,
      name: "Home",
    },
    {
      path: `/fruits`,
      icon: <FruitsIcon />,
      name: "Fruits",
    },
  ];

  const { prefersDarkMode, setPrefersDarkMode, setShowLightbox, showLightbox } =
    useContext(GlobalContext);

  function handleMenu() {
    requestAnimationFrame(() => {
      const navigation = document.querySelector("nav"),
        navLinks = Array.from(navigation?.querySelectorAll("a") || []);

      setTimeout(
        () => {
          setShowLightbox((state) => !state);
          setIsCollapsed((state) => !state);
        },
        isCollapsed ? 0 : navLinks.length * 300
      );

      navLinks.forEach((link, index) => {
        link.style.transition = `opacity 1s ${(index * 150)}ms`;
        link.style.opacity = !isCollapsed ? "0" : "1";
      });
    });
  }

  function toggleColorMode() {
    const currentMode = localStorage.getItem("colorMode"),
      newMode = currentMode === "dark" ? "light" : "dark";

    localStorage.setItem("colorMode", newMode);
    setPrefersDarkMode((state) => !state);
    document.documentElement.classList.toggle("dark");
  }

  return (
    <header
      className={`absolute flex items-center flex-col justify-around gap-0 md:gap-2 md:flex-row left-8 top-6 border-2 transition-all duration-1000 border-accent-primary md:border px-4 py-2 rounded-lg will-change-content ${
        showLightbox && !isCollapsed ? "z-20" : "z-0"
      }`}
    >
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

      <nav
        className={`${
          !isCollapsed && "m-2"
        } flex flex-col gap-2 justify-center text-2xl text-light`}
      >
        {navLinks.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.path}
              style={{ opacity: 0 }}
              className={`${
                isCollapsed && "absolute -z-10 hidden"
              } hover:scale-110 active:scale-95  flex gap-3 hover:text-accent-primary hover:scale-110`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>

      <button
        className={`animate__animated ${
          isCollapsed && "hidden"
        } md:grid hover:scale-110 active:scale-95 transition-all`}
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
