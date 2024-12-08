"use client";

import { useEffect } from "react";

export default function HydrationHandler() {
  useEffect(() => {
    // This runs only on the client, after hydration
    const htmlElement = document.documentElement;
    if (htmlElement.hasAttribute("data-lt-installed")) {
      // Re-render to match client state
      htmlElement.setAttribute("data-lt-installed", "true");
    }
  }, []);

  return null; // This component doesn't render anything
}
