"use client"
import { useEffect, useState } from "react";

/**
 * Detects the device type based on window width
 * @date 1/8/2024 - 1:09:57 PM
 *
 * @export
 * @returns {boolean}
 */
export default function useDetectDeviceType(): boolean {
  const [windowWidth, detectWidth] = useState(window.innerWidth);
  const detectSize = () => {
    detectWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };
  }, [windowWidth]);

  return windowWidth < 768 // mobile
}
