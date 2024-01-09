"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import IFruit from "./fruitInterface";

export interface IFruitContext {
  showInfo: boolean;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
  fruit: IFruit | null;
  setFruit: Dispatch<SetStateAction<IFruit | null>>;
}

export const initialFruitContext: IFruitContext = {
  showInfo: false,
  setShowInfo: () => {},
  fruit: null,
  setFruit: () => {},
};

export const FruitContext = createContext<IFruitContext>(initialFruitContext);

export function FruitProvider({ children }: { children: React.ReactNode }) {
  // Fruit state
  const [showInfo, setShowInfo] = useState(false);
  const [fruit, setFruit] = useState<IFruit | null>(null);

  // store object
  const store: IFruitContext = { showInfo, setShowInfo, fruit, setFruit };

  return (
    <FruitContext.Provider value={store}>{children}</FruitContext.Provider>
  );
}
