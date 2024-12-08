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
    let startTime: number;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min((progress / duration) * 100, 100);

      controls.set({
        width: `${percentage}%`,
      });

      if (percentage < 100 && isPlaying) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const startAnimation = () => {
      controls.set({ width: "0%" });
      rafId = requestAnimationFrame(animate);
    };

    if (isPlaying) {
      startAnimation();
    } else {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isPlaying, duration, controls]);

  return (
    <>
      {/* Left border */}
      <motion.div
        className={`absolute bottom-0 left-0 h-[2px] rounded-bl-xl bg-current ${textColorClass}`}
        style={{ width: "8px" }}
      />
      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={controls}
          className={`h-full bg-current ${textColorClass}`}
          style={{ originX: 0 }}
        />
      </div>
      {/* Right border */}
      <motion.div
        className={`absolute bottom-0 right-0 h-[2px] rounded-br-xl bg-current ${textColorClass}`}
        style={{ width: "8px" }}
      />
    </>
  );
}
