"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Opts = {
  container?: string;
  item?: string;
  yFrom?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  ease?: string;
  delay?: number;
};

export function useCardSlideReveal({
  container = "[data-cards]",
  item = "[data-card]",
  yFrom = -120,
  duration = 1.2,
  stagger = 0.28,
  start = "top center+=10",
  once = true,
  ease = "power4.out",
  delay = 0.6,
}: Opts = {}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray<HTMLElement>(container);
      wraps.forEach((wrap) => {
        const cards = Array.from(wrap.querySelectorAll<HTMLElement>(item));
        if (!cards.length) return;

        gsap.set(cards, { y: yFrom, opacity: 0, willChange: "transform,opacity" });

        const tl = gsap
          .timeline({ defaults: { ease, duration }, delay })
          .to(cards, {
            y: 0,
            opacity: 1,
            stagger: { each: stagger, from: "start" },
            clearProps: "transform,opacity,willChange",
          });

        ScrollTrigger.create({ trigger: wrap, start, once, animation: tl });
      });
    });

    return () => ctx.revert();
  }, [container, item, yFrom, duration, stagger, start, once, ease, delay]);
}
