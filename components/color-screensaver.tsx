"use client";

import { useEffect, useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Pause, Play, Maximize, Minimize, Camera } from "lucide-react";

interface ColorResponse {
  name: {
    value: string;
  };
  hex: {
    value: string;
    clean: string;
  };
  rgb: {
    value: string;
    r: number;
    g: number;
    b: number;
  };
}

function isLightColor(color: ColorResponse): boolean {
  const { r, g, b } = color.rgb;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export default function ColorScreensaver() {
  const [color, setColor] = useState<ColorResponse | null>(null);
  const [nextColor, setNextColor] = useState<ColorResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentBgColor, setCurrentBgColor] = useState<string>("white");
  const [nextBgColor, setNextBgColor] = useState<string>("white");

  const fetchRandomColor = useCallback(async () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);

    const response = await fetch(
      `https://www.thecolorapi.com/id?rgb=${r},${g},${b}`
    );
    const data = await response.json();
    return data;
  }, []);

  const changeColor = useCallback(async () => {
    if (!nextColor || !isPlaying) return;

    // Set the next background color
    setCurrentBgColor(color?.hex.value || "white");
    setNextBgColor(nextColor.hex.value);

    // Wait for the transition
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Update the current color and fetch next
    setColor(nextColor);
    const newNextColor = await fetchRandomColor();
    setNextColor(newNextColor);
  }, [nextColor, fetchRandomColor, isPlaying, color?.hex.value]);

  useEffect(() => {
    const initializeColors = async () => {
      const initialColor = await fetchRandomColor();
      const initialNextColor = await fetchRandomColor();
      setColor(initialColor);
      setNextColor(initialNextColor);
      setCurrentBgColor(initialColor.hex.value);
      setNextBgColor(initialColor.hex.value);
      setLoading(false);
    };

    initializeColors();
  }, [fetchRandomColor]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying) {
      interval = setInterval(changeColor, 5000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [changeColor, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(console.error);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const takeScreenshot = () => {
    if (!color) return;

    const canvas = document.createElement("canvas");
    canvas.width = 1920; // You can adjust this for different resolutions
    canvas.height = 1080;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill the canvas with the current color
    ctx.fillStyle = color.hex.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add color information text
    ctx.fillStyle = isLightColor(color) ? "#000000" : "#FFFFFF";
    ctx.font = "48px Righteous";
    ctx.textAlign = "center";
    ctx.fillText(color.name.value, canvas.width / 2, canvas.height / 2 - 50);
    ctx.fillText(
      `HEX: ${color.hex.value}`,
      canvas.width / 2,
      canvas.height / 2 + 50
    );
    ctx.fillText(
      `RGB: ${color.rgb.value}`,
      canvas.width / 2,
      canvas.height / 2 + 150
    );

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.download = `color-${color.hex.clean}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  if (loading || !color) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const isLight = isLightColor(color);
  const textColorClass = isLight ? "text-gray-900" : "text-white";
  const cardBgClass = isLight ? "backdrop-blur-xl" : "backdrop-blur-xl";
  const buttonColorClass = isLight
    ? "bg-gray-900 text-white hover:bg-gray-700"
    : "bg-white text-gray-900 hover:bg-gray-200";

  return (
    <main
      className={`min-h-screen flex items-center justify-center p-4 relative`}
      style={{
        backgroundColor: nextBgColor,
        transition: "background-color 1s ease-in-out",
      }}
    >
      <Card
        className={`w-full max-w-md p-6 backdrop-blur-xl bg-opacity-20 border border-opacity-30 shadow-lg`}
        style={{
          backgroundColor: `${nextBgColor}33`,
          borderColor: nextBgColor,
          transition: "all 1s ease-in-out",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <div className="space-y-4 text-center">
          <h1 className={`text-4xl font-bold tracking-tight ${textColorClass}`}>
            {color.name.value}
          </h1>
          <div className={`grid grid-cols-2 gap-4 ${textColorClass}`}>
            <div>
              <p className="text-sm font-medium">HEX</p>
              <p className="font-mono">{color.hex.value}</p>
            </div>
            <div>
              <p className="text-sm font-medium">RGB</p>
              <p className="font-mono">{color.rgb.value}</p>
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <Button
              onClick={togglePlayPause}
              className={buttonColorClass}
              aria-label={isPlaying ? "Pause screensaver" : "Play screensaver"}
            >
              {isPlaying ? (
                <Pause className="mr-2 h-4 w-4" />
              ) : (
                <Play className="mr-2 h-4 w-4" />
              )}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button
              onClick={toggleFullscreen}
              className={buttonColorClass}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize className="mr-2 h-4 w-4" />
              ) : (
                <Maximize className="mr-2 h-4 w-4" />
              )}
              {isFullscreen ? "Exit" : "Fullscreen"}
            </Button>
            <Button
              onClick={takeScreenshot}
              className={buttonColorClass}
              aria-label="Take screenshot"
            >
              <Camera className="mr-2 h-4 w-4" />
              Screenshot
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
