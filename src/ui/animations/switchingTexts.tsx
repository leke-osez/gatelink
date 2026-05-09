import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SwitchingTextProps = {
  texts: string[];
  interval?: number;
  className?: string;
  textClassName?: string;
};

const SwitchingText: React.FC<SwitchingTextProps> = ({
  texts,
  interval = 2000,
  className = "",
  textClassName = "",
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <div className={`relative flex p-4 overflow-hidden ${className}`}>

      <AnimatePresence mode="wait">
         <motion.span
          key={texts[index]}
          initial={{
            opacity: 0,
             
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
             
          }}
          exit={{
            opacity: 0,
             
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="h-fit w-full whitespace-nowrap"
        >
          <p className={`${textClassName}`}>
            {texts[index]}
          </p>
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default SwitchingText;

