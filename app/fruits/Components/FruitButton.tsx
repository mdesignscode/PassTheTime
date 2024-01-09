"use client";

import { useContext } from "react";
import IFruit from "./fruitInterface";
import { GlobalContext } from "@/context/globalContext";
import { FruitContext } from "./context";

export default function FruitButton({ fruit }: { fruit: IFruit }) {
  const { setShowInfo, setFruit } = useContext(FruitContext);
  const { setShowLightbox } = useContext(GlobalContext);

  function handleShowInfo() {
    setFruit(fruit)
    setShowLightbox(true);
    setShowInfo(true);
  }

  return (
    <button
      type="button"
      className="fruit-button border-2 border-accent-primary p-2 rounded-lg bg-primary hover:-translate-y-1 active:translate-y-0"
      onClick={handleShowInfo}
    >
      {fruit.name}
    </button>
  );
}
