// sections/About.tsx
"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function About() {
  // === “We are …” sticky label measurements (same behavior as original) ===
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
      // Wait for fonts to be ready so measurements are accurate
      // @ts-ignore
      if (document?.fonts?.ready) {
        // @ts-ignore
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
    <section id="about" className="mx-auto max-w-5xl px-8 py-14 mt-12">
      {/* Top split: image left, copy right (unchanged desktop look) */}
      <div className="grid md:grid-cols-[500px_1fr] gap-15 items-start mt-15">
        <div className="relative h-96 overflow-hidden bg-zinc-200 rounded-3xl">
          <div
            className="absolute inset-0 bg-[url('/slika2.jpg')] bg-center bg-cover bg-no-repeat bg-fixed"
            aria-hidden
          >
            <Image
              src="/slika2.jpg"
              alt="O podjetju"
              fill
              className="object-cover"
              sizes="(min-width:1024px) 1152px, (min-width:640px) 640px, 100vw"
              priority={false}
            />
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
            <span data-split className="tracking-wide text-zinc-500/90">
              Delivering Quality
            </span>
          </div>

          <h2
            data-split
            className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
          >
            From Origin to <br className="hidden md:block" /> Every Destination
          </h2>

          <p
            data-split
            className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90"
          >
            We are your gateway to global trade success. With a deep understanding of international markets and a passion for
            precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
          </p>

          <p
            data-split
            className="mt-4 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1rem,1vw,1rem)]"
          >
            Driven by experience. <br className="hidden md:block" />
            Guided by integrity.
          </p>
        </div>
      </div>

      {/* “We are …” scrolly label section (unchanged) */}
      <section
        ref={weSectionRef}
        className="mx-auto w-full max-w-2xl px-20 py-20 mt-25"
      >
        <div className="grid md:grid-cols-[max-content_1fr] gap-6 items-center">
          <div
            className="relative grid md:grid-cols-[auto_1fr] gap-50 items-start"
            style={{ height: groupH || undefined }}
          >
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
            <p className="font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)] whitespace-nowrap">
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

      {/* Lead-in title/paragraph above the cards (same spacing as original) */}
      <div className="mt-6 mb-25">
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
          <span data-split className="tracking-wide text-zinc-500/90">
            Delivering Quality
          </span>
        </div>

        <h2
          data-split
          className="mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
        >
          What We <br className="hidden md:block" /> Deliver
        </h2>

        <p
          data-split
          className="mt-8 max-w-3xl text-[15px] leading-8 text-zinc-600/90"
        >
          We envision a connected world where businesses thrive through long-term relationships,
          seamless supply chains, and unwavering commitment to mutual success.
        </p>
      </div>

      {/* === CARDS (exact original look + hooks) === */}
      <div
        data-cards
        data-nosplit
        className="
          mt-6
          grid gap-10 sm:grid-cols-2 lg:grid-cols-3
          font-normal leading-[0.98] tracking-[-0.01em] text-zinc-700/90
          text-[clamp(1rem,2vw,2rem)]
        "
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
  );
}
