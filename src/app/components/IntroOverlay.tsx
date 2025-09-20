"use client";

import { motion } from "framer-motion";

export default function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  const text = "MacauStation";
  const letters = [...text];

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.8, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onFinish}
        className="absolute inset-0 bg-white flex items-center justify-center"
      >
        <motion.p className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
          <motion.span
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
            className="inline-flex"
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -28 },
                  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 520, damping: 32, mass: 0.9 } },
                }}
                className="[transform-origin:0_50%] will-change-transform"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
}
