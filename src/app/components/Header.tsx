"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-[92%] sm:w-11/12 md:w-5/6 lg:w-3/4 rounded-[40px] backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <Image src="/ms.logo3.png" alt="Macau Station Logo" width={30} height={30} className="shrink-0" priority />
        </a>

        {/* Desktop nav (unchanged) */}
        <nav className="hidden md:flex items-center gap-12 text-[15px]">
          <a href="#page" className="hover:text-zinc-700 transition-colors" data-split>Home</a>
          <a href="./aboutus.tsx" className="hover:text-zinc-700 transition-colors" data-split>About Us</a>
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="relative hidden sm:inline-flex items-center justify-center overflow-hidden rounded-full  bg-black text-white font-bold px-4 py-2 cursor-pointer group transition-colors duration-300"
        >
          <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
          <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
          <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
          <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
          <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
          <span className="relative z-8">Contact us</span>
        </a>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/80 text-white"
          onClick={() => setMobileOpen(true)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.nav
              onClick={(e) => e.stopPropagation()}
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              className="absolute left-1/2 top-4 w-[92%] -translate-x-1/2 rounded-2xl bg-white text-zinc-900 shadow-xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">Menu</span>
                <button
                  aria-label="Close menu"
                  className="h-9 w-9 grid place-items-center rounded-full bg-zinc-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <ul className="mt-4 space-y-3 text-base font-medium">
                <li><a href="#page" onClick={() => setMobileOpen(false)} className="block py-2">Home</a></li>
                <li><a href="./aboutus.tsx" onClick={() => setMobileOpen(false)} className="block py-2">About Us</a></li>
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setMobileOpen(false)}
                    className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-black text-white font-bold px-4 py-2 group"
                  >
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-4em] translate-y-[-5em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-7em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[-0.3em] translate-y-[2.2em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[1.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="absolute left-1/2 top-1/2 h-[40px] w-[40px] rounded-full bg-[#0c66ed] translate-x-[4em] translate-y-[-4.8em] transition-all duration-700 ease-out group-hover:scale-[5]" />
                    <span className="relative z-8">Contact us</span>
                  </a>
                </li>
              </ul>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
