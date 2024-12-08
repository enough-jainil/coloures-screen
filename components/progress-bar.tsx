import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

interface ProgressBarProps {
  duration: number;
  isPlaying: boolean;
  textColorClass: string;
}

export default function ProgressBar({
  duration,
  isPlaying,
  textColorClass,
}: ProgressBarProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (isPlaying) {
      controls.set({ width: "0%" });
      controls.start({
        width: "100%",
        transition: {
          duration: duration / 1000,
          ease: "linear",
        },
      });
    } else {
      controls.stop();
    }
  }, [isPlaying, duration, controls]);

  return (
    <>
      {/* Left border */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] rounded-bl-xl ${textColorClass}`}
        style={{ width: "8px" }}
      />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
        <motion.div
          animate={controls}
          className={`h-full ${textColorClass}`}
          style={{ originX: 0 }}
        />
      </div>
      {/* Right border */}
      <motion.div
        className={`absolute bottom-0 right-0 h-[2px] rounded-br-xl ${textColorClass}`}
        style={{ width: "8px" }}
      />
    </>
  );
}
