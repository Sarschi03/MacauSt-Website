"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

export default function FloatingBadge({
  title,
  subtitle,
  icon,
  textSide = "right",
  style,
  floatDelay = 0,
  floatDuration = 5,
}: {
  title: string;
  subtitle?: string;
  icon: ReactNode;
  textSide?: "left" | "right";
  style?: CSSProperties;
  floatDelay?: number;
  floatDuration?: number;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 320, damping: 24 } },
      }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="absolute flex items-center gap-6 max-w-[420px]"
      style={style}
    >
      {textSide === "left" && (
        <div className="select-none">
          <div data-split className="font-semibold text-[18px] sm:text-[20px] leading-tight text-zinc-900">
            {title}
          </div>
          {subtitle && <div className="text-sm text-zinc-400 mt-1">{subtitle}</div>}
        </div>
      )}

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay }}
        className="grid place-items-center rounded-full bg-zinc-900 text-white w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
      >
        {icon}
      </motion.div>

      {textSide === "right" && (
        <div className="select-none">
          <div data-split className="font-semibold text-[18px] sm:text-[20px] leading-tight text-zinc-900">
            {title}
          </div>
          {subtitle && <div className="text-sm text-zinc-400 mt-1">{subtitle}</div>}
        </div>
      )}
    </motion.div>
  );
}
