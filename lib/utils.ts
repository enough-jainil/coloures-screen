import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColorResponse } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertColorHistoryToCSV(colorHistory: ColorResponse[]) {
  const headers = ["Name", "HEX", "RGB", "R", "G", "B"].join(",");

  const rows = colorHistory.map((color) => {
    return [
      color.name.value,
      color.hex.value,
      `"${color.rgb.value}"`, // Use the RGB value directly
      color.rgb.r,
      color.rgb.g,
      color.rgb.b,
    ].join(",");
  });

  return [headers, ...rows].join("\n");
}
