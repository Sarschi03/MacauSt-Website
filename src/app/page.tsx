

"use client";

import React, { useState, useEffect, useRef, useLayoutEffect, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Roboto } from "next/font/google";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Lenis from "@studio-freight/lenis";
import CustomCursor from "./Cursor";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

gsap.registerPlugin(ScrollTrigger);

function useSplitScrollReveal({
  selector = "[data-split]",
  stagger = 0.03,
  once = true,
  scrub = false,
  start = "top 85%",
  end = "bottom 60%",
}: {
  selector?: string;
  stagger?: number;
  once?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
} = {}) {
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
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
          once,
        },
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

function useCardSlideReveal({
  container = "[data-cards]",
  item = "[data-card]",
  yFrom = -120,
  duration = 1.2,
  stagger = 0.28,
  start = "top center+=10",
  once = true,
  ease = "power4.out",
  delay = 0.6,
}: 
{
  container?: string;
  item?: string;
  yFrom?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
  ease?: string;
  delay?: number;
} = {}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      const wraps = gsap.utils.toArray<HTMLElement>(container);
      wraps.forEach((wrap) => {
        const cards = Array.from(wrap.querySelectorAll<HTMLElement>(item));
        if (!cards.length) return;

        gsap.set(cards, { y: yFrom, opacity: 0, willChange: "transform,opacity" });

        const tl = gsap.timeline({ defaults: { ease, duration }, delay })
          .to(cards, {
            y: 0,
            opacity: 1,
            stagger: { each: stagger, from: "start" },
            clearProps: "transform,opacity,willChange",
          });

        ScrollTrigger.create({
          trigger: wrap,
          start,
          once,
          animation: tl,

        });
      });
    });

    return () => ctx.revert();
  }, [container, item, yFrom, duration, stagger, start, once, ease, delay]);
}


function IntroOverlay({ onFinish }: { onFinish: () => void }) {
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
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="inline-flex"
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, x: -28 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 520, damping: 32, mass: 0.9 },
                  },
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


function FloatingBadge({
  title,
  subtitle,
  icon,
  textSide = "right",
  style,
  floatDelay = 0,
  floatDuration = 5,
}: 
{
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
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 320, damping: 24 },
        },
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
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
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

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, rotate: -2, scale: 0.98 },
        show: {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          transition: { type: "spring", stiffness: 420, damping: 22 },
        },
      }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="flex items-start gap-4"
    >
      <span className="mt-1 inline-flex h-8 w-8 rounded-full bg-zinc-900" />
      <div>
        <div data-split className="font-medium">
          {title}
        </div>
        <p data-split className="text-sm text-zinc-600 mt-1">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function Home() {

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);


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



  const [showIntro, setShowIntro] = useState(true);


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

  const weSectionRef = useRef<HTMLDivElement | null>(null);
  const linesGroupRef = useRef<HTMLDivElement | null>(null);
  const line0Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: weSectionRef,
    offset: ["start center", "end center"],
  });

  const [weStart, setWeStart] = useState(0);
  const [weDelta, setWeDelta] = useState(0);
  const [groupH, setGroupH] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const group = linesGroupRef.current;
      const l0 = line0Ref.current;
      const l2 = line2Ref.current;
      if (!group || !l0 || !l2) return;

      const groupRect = group.getBoundingClientRect();
      const r0 = l0.getBoundingClientRect();
      const r2 = l2.getBoundingClientRect();

      const c0 = r0.top + r0.height / 2 - groupRect.top;
      const c2 = r2.top + r2.height / 2 - groupRect.top;

      setWeStart(c0);
      setWeDelta(c2 - c0);
      setGroupH(groupRect.height);
    };

    const readyAndMeasure = async () => {

      if (document?.fonts?.ready) {

        await document.fonts.ready;
      }
      requestAnimationFrame(measure);
    };

    readyAndMeasure();
    window.addEventListener("resize", readyAndMeasure);
    return () => window.removeEventListener("resize", readyAndMeasure);
  }, []);

  const weY = useTransform(scrollYProgress, [0, 1], [weStart, weStart + weDelta]);

  return (
    <> <CustomCursor />
      <AnimatePresence>
        {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      <motion.main
        className={`${roboto.className} relative z-10 min-h-screen bg-zinc-50 text-zinc-900`}
        animate={{ y: revealFooter ? `-${FOOTER_VH}vh` : "0vh" }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <header className="sticky top-4 z-50 mx-auto w-[92%] sm:w-11/12 md:w-5/6 lg:w-3/4 rounded-[40px] backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <Image src="/ms.logo3.png" alt="Macau Station Logo" width={30} height={30} className="shrink-0" priority />
            </a>

            <nav className="hidden md:flex items-center gap-12 text-[15px]">
              <a href="#page" className="hover:text-zinc-700 transition-colors" data-split>Home</a>
              <a href="./aboutus.tsx" className="hover:text-zinc-700 transition-colors" data-split>About Us</a>
            </nav>

            <a
              href="#contact"
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full  bg-black text-white font-bold px-4 py-2 cursor-pointer group transition-colors duration-300"
            >
              <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
              <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
              <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
              <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
              <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
              <span className="relative z-8">Contact us</span>
            </a>
          </div>
        </header>


        <section className="mx-auto max-w-7xl -mt-8">
          <div className="grid gap-4">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h1
                  data-split
                  className="mt-35 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
                >
                  MACAU STATION
                </h1>

                <p data-split className="mt-3 text-2xl sm:text-[28px] font-medium text-zinc-600">
                  值得信赖的合作伙伴
                </p>
              </div>

              <div className="lg:justify-self-start">
                <p data-split className="relative mx-0 lg:mx-8 mt-25 max-w-[60ch] text-[15px] leading-8 text-zinc-600/90">
                  Macau Station is a trusted partner in the field of international trade, committed to delivering reliable,
                  efficient, and high-quality trading solutions across global markets. With years of experience in cross-border
                  commerce, we have built a strong reputation for professionalism, adaptability, and integrity.
                </p>

                <div className="mt-8 lg:mx-8">
                  <a
                    href="#contact"
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-black bg-white text-black font-bold px-6 py-3 cursor-pointer group transition-colors duration-300"
                  >
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="relative z-10">Let’s work together</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative h-120 rounded-3xl overflow-hidden">
              <Image src="/o.png" alt="Cargoship" fill className="object-cover" />
            </div>
          </div>
        </section>


        <section id="about" className="mx-auto max-w-5xl px-8 py-14 mt-12 ">
          <div className="grid md:grid-cols-[500px_1fr] gap-15 items-start mt-15">
            <div className="relative h-96 overflow-hidden bg-zinc-200 rounded-3xl">
              <div
                className="absolute inset-0 bg-[url('/slika2.jpg')] bg-center bg-cover bg-no-repeat bg-fixed"
                aria-hidden
              >
                <Image src="/slika2.jpg" alt="O podjetju" fill className="object-cover" />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
                <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
              </div>

              <h2
                data-split
                className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
              >
                From Origin to <br className="hidden md:block" /> Every Destination
              </h2>

              <p data-split className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90">
                We are your gateway to global trade success. With a deep understanding of international markets and a passion for
                precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
              </p>
              <p data-split className="mt-4 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1rem,1vw,1rem)]">
                Driven by experience. <br className="hidden md:block" />
                Guided by integrity.
              </p>
            </div>
          </div>

          <section ref={weSectionRef} className="mx-auto w-full max-w-2xl px-20 py-20 mt-25">
            <div className="grid md:grid-cols-[max-content_1fr] gap-6 items-center">
              <div className="relative grid md:grid-cols-[auto_1fr] gap-50 items-start" style={{ height: groupH || undefined }}>
                <motion.h4
                  style={{ top: weY }}
                  className="
                    absolute left-0 -translate-y-1/2
                    font-medium leading-[0.98] tracking-[-0.01em]
                    text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]
                    whitespace-nowrap will-change-transform w-full
                  "
                >
                  We are
                </motion.h4>
              </div>

              <div ref={linesGroupRef} className="flex flex-col gap-3 mt-0">
                <p
                  ref={line0Ref}

                  className="font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)] whitespace-nowrap"
                >
                  Traders.
                </p>
                <p

                  className="font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)] whitespace-nowrap"
                >
                  Connectors.
                </p>
                <p
                  ref={line2Ref}

                  className="font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)] whitespace-nowrap"
                >
                  Global&nbsp;Thinkers.
                </p>
              </div>
            </div>
          </section>


          <div className="mt-6 mb-25">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
              <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
            </div>

            <h2
              data-split
              className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
            >
              From Origin to <br className="hidden md:block" /> Every Destination
            </h2>

            <p data-split className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90">
              We are your gateway to global trade success. With a deep understanding of international markets and a passion for
              precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
            </p>
          </div>

          <div
            data-cards
            data-nosplit
            className="mt-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 font-normal leading-[0.98] tracking-[-0.01em] text-zinc-700/90 text-[clamp(1rem,2vw,2rem)]"
          >
            {[
              {
                title: "Global Trade & Distribution",
                body:
                  "We specialize in international trade and distribution, connecting global markets through efficient, compliant, and reliable logistics. Our expertise spans multiple industries, enabling us to move goods quickly and strategically across borders.",
                glyph: "贸 易",
              },
              {
                title: "Client-Centered Solutions",
                body:
                  "With a focus on client needs and trust, we tailor every trading solution to ensure transparency, adaptability, and long-term value.",
                glyph: "客 户",
              },
              {
                title: "Support for Global Growth",
                body:
                  "Whether you're expanding to new markets or optimizing your supply chain, we provide the knowledge, network, and support to help you trade with confidence — anywhere in the world.",
                glyph: "生 长",
              },
            ].map((card) => (
              <div
                data-card
                key={card.title}
                className="relative overflow-hidden rounded-[28px] bg-white border border-zinc-100 shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="pointer-events-none absolute inset-y-0 right-[-6%] bottom-[-20%] flex items-center">
                  <span className="select-none leading-none font-black text-zinc-900/5 text-[60px] md:text-[60px] lg:text-[150px]">
                    {card.glyph}
                  </span>
                </div>

                <div className="px-12 py-14 text-center">
                  <h3 className="text-2xl font-extrabold leading-tight">{card.title}</h3>
                  <div className="mx-auto mt-6 mb-2 h-4 w-4 rounded-full bg-zinc-300/80" />
                  <p className="mt-2 text-lg text-zinc-700 leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </div>

        </section>


        <section className="relative bg-zinc-900 text-zinc-50 overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-300/90" />
              <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
            </div>

            <div className="max-w-xl">
              <h2
                data-split
                className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-100/95 text-[clamp(1.5rem,4vw,4rem)]"
              >
                From Origin to <br className="hidden md:block" /> Every Destination
              </h2>

              <p data-split className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-200/90">
                We are your gateway to global trade success. With a deep understanding of international markets and a passion for
                precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
              </p>
            </div>

            <div className="mt-10">
              <div className="h-64 sm:h-80 lg:h-96 rounded-3xl bg-zinc-200" />
            </div>

            <div className="flex justify-end mt-6">
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center overflow-hidden rounded-full  bg-white text-black font-bold px-4 py-2 cursor-pointer group transition-colors duration-300"
              >
                <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                <span className="relative z-8">Contact us</span>
              </a>
            </div>
          </div>
        </section>

        {/* ===== Why choose us ===== */}
        <section id="why" className="mx-auto max-w-7xl px-4 py-14">
          <div className="pt-2">
            <div className="flex items-center gap-3 text-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
              <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
            </div>
            <h2
              data-split
              className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
            >
              From Origin to <br className="hidden md:block" /> Every Destination
            </h2>
            <p data-split className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90">
              We are your gateway to global trade success. With a deep understanding of international markets and a passion for
              precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
            </p>
          </div>


          <motion.div
            className="relative mt-8 h-[420px] sm:h-[460px] lg:h-[520px] w-full"
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
              style={{ left: "50%", top: "44%", transform: "translate(-50%, 0)" }}
              floatDelay={1.0}
              floatDuration={5.6}
            />
          </motion.div>
        </section>

        {/*Contact*/}
        <section id="contact" className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="pt-2">
              <div className="flex items-center gap-3 text-sm">
                <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
                <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
              </div>

              <h2
                data-split
                className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
              >
                From Origin to <br className="hidden md:block" /> Every Destination
              </h2>

              <p data-split className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90">
                We are your gateway to global trade success. With a deep understanding of international markets and a passion for
                precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 data-split className="font-semibold">Let’s get in touch</h3>
              <div className="mt-5 grid gap-4">
                <Input label="Full name" name="name" />
                <Input label="Email" name="email" type="email" />
                <Input label="Message" name="message" asTextArea />
                <a
                  href="#contact"
                  className="relative inline-flex items-center justify-center overflow-hidden rounded-full  bg-black text-white font-bold px-4 py-2 cursor-pointer group transition-colors duration-300"
                >
                  <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                  <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                  <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                  <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                  <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                  <span className="relative z-8">Contact us</span>
                </a>
              </div>
            </form>
          </div>
        </section>
      </motion.main>

      {/*Footer*/}
      <footer className="fixed bottom-0 left-0 right-0 z-0 bg-black text-zinc-300" style={{ height: `${FOOTER_VH}vh` }}>
        <div className="mx-auto max-w-7xl px-4 h-full flex items-center">
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <div className="flex items-center gap-2 font-semibold text-zinc-50">
              <Image src="/logo_beli.png" alt="Macau Station Logo" width={200} height={200} className="shrink-0" priority />
            </div>
            <div className="text-sm">
              <p data-split>Office: 123 Business Avenue</p>
              <p data-split>+853 0000 0000</p>
              <p data-split>info@macau-station.com</p>
            </div>
            <div className="text-sm md:text-right" data-split>
              © {new Date().getFullYear()} Macau Station. All rights reserved.
            </div>
          </div>
        </div>
      </footer>


      <style jsx global>{`
        [data-split] { will-change: transform; }
        [data-split] .line { display: block; overflow: hidden; }
        [data-split] .word { display: inline-block; will-change: transform, opacity; }
      `}</style>
    </>
  );
}

function Input({ label, name, type = "text", asTextArea }: { label: string; name: string; type?: string; asTextArea?: boolean }) {
  return (
    <label className="text-sm">
      <div className="text-zinc-700" data-split>{label}</div>
      {asTextArea ? (
        <textarea
          name={name}
          className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-400"
          rows={5}
        />
      ) : (
        <input
          name={name}
          type={type}
          className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 outline-none ring-0 focus:border-zinc-400"
        />
      )}
    </label>
  );
}
