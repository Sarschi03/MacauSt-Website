"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

type Opts = {
  selector?: string;
  stagger?: number;
  once?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
};

export function useSplitScrollReveal({
  selector = "[data-split]",
  stagger = 0.03,
  once = true,
  scrub = false,
  start = "top 85%",
  end = "bottom 60%",
}: Opts = {}) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
    if (!els.length) return;

    const splits: SplitType[] = [];
    const tls: gsap.core.Timeline[] = [];

    els.forEach((el) => {
      if ((el as any).__splitDone) return;
      (el as any).__splitDone = true;

      const split = new SplitType(el, { types: "lines,words", tagName: "span" });
      splits.push(split);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, end, scrub, once },
      });

      tl.from(split.words, {
        yPercent: 120,
        opacity: 0,
        duration: 0.75,
        ease: "expo.out",
        stagger,
        rotate: 0.0001,
      });

      tls.push(tl);
    });

    return () => {
      tls.forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
      ScrollTrigger.refresh();
    };
  }, [selector, stagger, once, scrub, start, end]);
}
