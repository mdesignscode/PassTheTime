"use client";

import { GlobalContext } from "@/context/globalContext";
import { useContext } from "react";

export default function Overlay() {
  const { showLightbox } = useContext(GlobalContext),
    overlayClass = showLightbox ? "opacity-85" : "opacity-0 hidden"

  return (
    <div
      id="overlay"
      className={`transition-all h-screen w-screen bg-dark absolute z-10 ${overlayClass}`}
    ></div>
  );
}
