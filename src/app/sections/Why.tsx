"use client";

import FloatingBadge from "../components/FloatingBadge";
import { motion } from "framer-motion";

export default function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl mt-20 -mb-25 px-4 sm:px-6 sm:py-14">
      <div className="pt-2">
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
          <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
        </div>

        <h2
          data-split
          className="mt-4 sm:mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
        >
          Why Leading Teams <br className="hidden md:block" /> Choose Us
        </h2>

        <p
          data-split
          className="mt-4 sm:mt-6 max-w-3xl text-[15px] leading-7 sm:leading-8 text-zinc-600/90"
        >
          At Macau Station, we understand that global business requires more than just transactions — it
          requires trust, expertise, and consistency. That’s why our clients rely on us to navigate the
          complexities of international markets and deliver results.
        </p>
      </div>

    
      <div className="mt-6 sm:mt-8 lg:mt-10 grid gap-8">
       
        <motion.div
          className="order-2 lg:order-1 relative mt-2 lg:mt-0 h-[340px] sm:h-[420px] lg:h-[520px] w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 1 },
            show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
          }}
        >
          <FloatingBadge
            title="Years of experience"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l2.9 5.89L21 9.17l-4.5 4.38L17.8 21 12 17.77 6.2 21l1.3-7.45L3 9.17l6.1-1.28L12 2z" fill="currentColor" />
              </svg>
            }
            style={{ left: "4%", top: "6%" }}
            floatDelay={0.2}
            floatDuration={5.2}
          />

          <FloatingBadge
            title="Fast, efficient, and compliant operations"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" fill="currentColor" />
              </svg>
            }
            textSide="left"
            style={{ right: "8%", top: "6%" }}
            floatDelay={0.6}
            floatDuration={4.6}
          />

          <FloatingBadge
            title="Proven Track Record"
            icon={
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4M12 22a10 10 0 110-20 10 10 0 010 20z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
            style={{ left: "50%", top: "50%", transform: "translate(-50%, 0)" }}
            floatDelay={1.0}
            floatDuration={5.6}
          />
        </motion.div>
      </div>
    </section>
  );
}
