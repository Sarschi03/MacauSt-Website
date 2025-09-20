"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Roboto } from "next/font/google";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import CustomCursor from "./components/Cursor";
import IntroOverlay from "./components/IntroOverlay";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Hero from "./sections/Hero";
import About from "./sections/About";
import DarkShowcase from "./sections/DarkShowcase";
import Why from "./sections/Why";
import Contact from "./sections/Contact";

import { useSplitScrollReveal } from "./hooks/useSplitScrollReveal";
import { useCardSlideReveal } from "./hooks/useCardSlideReveal";

gsap.registerPlugin(ScrollTrigger);

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function Page() {
  // show custom cursor only on precise pointers
  const [showCursor, setShowCursor] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowCursor(window.matchMedia("(pointer: fine)").matches);
    }
  }, []);

  // Intro overlay state
  const [showIntro, setShowIntro] = useState(true);

  // Smooth scroll + ScrollTrigger sync
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.off("scroll", onLenisScroll);
      lenis.destroy();
    };
  }, []);

  // Reveal footer when near bottom
  const FOOTER_VH = 38;
  const [revealFooter, setRevealFooter] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      setRevealFooter(p > 0.88);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP reveal hooks
  useSplitScrollReveal({
    selector: "[data-split]",
    stagger: 0.04,
    once: true,
    scrub: false,
    start: "top 88%",
    end: "bottom 60%",
  });

  useCardSlideReveal({
    yFrom: -200,
    duration: 2,
    stagger: 0.25,
    start: "top 55%+=120",
    delay: 0.5,
    once: true,
    ease: "power4.out",
  });

  return (
    <>
      {showCursor && <CustomCursor />}

      <AnimatePresence>
        {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.main
        className={`${roboto.className} relative z-10 min-h-screen bg-zinc-50 text-zinc-900`}
        animate={{ y: revealFooter ? `-${FOOTER_VH}vh` : "0vh" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        <Header />

        <Hero />
        <About />
        <DarkShowcase />
        <Why />
        <Contact />
      </motion.main>

      <Footer footerVh={FOOTER_VH} />

      <style jsx global>{`
        [data-split] { will-change: transform; }
        [data-split] .line { display: block; overflow: hidden; }
        [data-split] .word { display: inline-block; will-change: transform, opacity; }
      `}</style>
    </>
  );
}
