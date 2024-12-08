import { useEffect, useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

interface SlidingCounterProps {
  value: string;
  className?: string;
}

export default function SlidingCounter({
  value,
  className = "",
}: SlidingCounterProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const motionProps: HTMLMotionProps<"span"> = {
    initial: { y: 20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="flex">
        {displayValue.split("").map((char, index) => (
          <div
            key={index}
            className="relative overflow-hidden"
            style={{ minWidth: char === " " ? "0.25em" : "auto" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={char + index}
                {...motionProps}
                animate={{
                  ...motionProps.animate,
                  transition: {
                    ...motionProps.animate?.transition,
                    delay: index * 0.05,
                  },
                }}
                exit={{
                  ...motionProps.exit,
                  transition: {
                    ...motionProps.exit?.transition,
                    delay: index * 0.03,
                  },
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
