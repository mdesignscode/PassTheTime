"use client";

import storageAvailable from "@/Components/localStorageDetection";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

export interface IGlobalContext {
  storageIsAvailable: boolean;
  setPrefersDarkMode: Dispatch<SetStateAction<boolean>>;
  prefersDarkMode: boolean;
}

export const initialGlobalContext: IGlobalContext = {
  storageIsAvailable: false,
  setPrefersDarkMode: () => {},
  prefersDarkMode: false
};

export const GlobalContext =
  createContext<IGlobalContext>(initialGlobalContext);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  // global state
  // app uses localStorage
  const [storageIsAvailable, setStorageIsAvailable] = useState(false);
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    const localStorageAvailable = storageAvailable()
    // detect storage feature
    setStorageIsAvailable(localStorageAvailable);

    // get html element
    const htmlElement = document.documentElement,
      // get default color mode
      prefersDarkMode =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      // get stored color mode
      preference = localStorageAvailable ? localStorage.getItem("colorMode") : "light";

    // set current color mode
    let colorMode = preference
      ? preference
      : prefersDarkMode
      ? "dark"
      : "light";

    // use default mode
    if (!preference) {
      localStorage.setItem("colorMode", colorMode);
    }

    setPrefersDarkMode(colorMode === "dark");

    // set dark mode for tailwind
    htmlElement.classList.toggle("dark", colorMode === "dark");

    htmlElement.addEventListener("mousemove", (event) => {
      // create cursor spotlight
      if (htmlElement.classList.contains("dark")) {
        htmlElement.style.setProperty("--x", event.clientX + "px");
        htmlElement.style.setProperty("--y", event.clientY + "px");
      }
    });

    console.log("Doc ready...", localStorageAvailable, preference)
  }, []);

  // store object
  const store: IGlobalContext = {
    storageIsAvailable,
    prefersDarkMode,
    setPrefersDarkMode,
  };

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
}
