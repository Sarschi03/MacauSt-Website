"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Run only on devices that actually have hover
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    document.documentElement.classList.add("custom-cursor-enabled");

    // place at center to avoid flicker on first move
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    gsap.set([dot, ring], { x: cx, y: cy });

    // smooth follower for the ring
    const xTo = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3.out" });

    // snappy dot
    const xDot = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power2.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power2.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDot(e.clientX);
      yDot(e.clientY);
    };

    const press = () => {
      gsap.to(dot, { scale: 0.8, duration: 0.15, ease: "power3.out" });
      gsap.to(ring, { scale: 1.3, duration: 0.15, ease: "power3.out" });
    };
    const release = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: "power3.out" });
      gsap.to(ring, { scale: 1, duration: 0.2, ease: "power3.out" });
    };

    // enlarge on interactive targets
    const isInteractive = (el: Element | null) =>
      !!el?.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="magnet"], .cursor-hover'
      );

    const onPointerOver = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 1.8, duration: 0.18, ease: "power3.out" });
        ring.classList.add("is-active");
      }
    };
    const onPointerOut = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) {
        gsap.to(ring, { scale: 1, duration: 0.2, ease: "power3.out" });
        ring.classList.remove("is-active");
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="custom-cursor custom-cursor__ring" />
      <div ref={dotRef} className="custom-cursor custom-cursor__dot" />
    </>
  );
}
