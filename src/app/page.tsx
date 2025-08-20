"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/** Intro overlay: letters slide in from the left, then the white panel
 *  smoothly slides DOWN (like a curtain) to reveal the page. */
function IntroOverlay({ onFinish }: { onFinish: () => void }) {
  const text = "MacauStation";
  const letters = [...text];

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Sliding white panel that carries the text and then drops down */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "100%" }}
        transition={{ delay: 1.8, duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={onFinish}
        className="absolute inset-0 bg-white flex items-center justify-center"
      >
        <motion.h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-zinc-900">
          <motion.span
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.06, delayChildren: 0.15 },
              },
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
                    transition: {
                      type: "spring",
                      stiffness: 520,
                      damping: 32,
                      mass: 0.9,
                    },
                  },
                }}
                className="[transform-origin:0_50%] will-change-transform"
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroOverlay onFinish={() => setShowIntro(false)} />}
      </AnimatePresence>

      <main className="min-h-screen bg-zinc-50 text-zinc-900">
        {/* Header */}
        <header className="sticky top-4 z-50 mx-4 rounded-[40px] backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg">
          <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
              <Image
                src="/ms.logo3.png"
                alt="Macau Station Logo"
                width={33}
                height={33}
                className="shrink-0"
              />
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <a href="#page" className="hover:text-zinc-700">Home</a>
              <a href="#aboutus" className="hover:text-zinc-700">About Us</a>
            </nav>

            <a href="#contact" className="inline-flex items-center rounded-2xl border border-white/40 bg-white/30 px-4 py-2 text-sm font-medium shadow-sm hover:shadow transition-shadow">
              Contact us
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 pt-10 pb-8">
          <div className="grid gap-10">
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="
                        text-7xl sm:text-6xl font-extrabold tracking-tight mt-20
                        text-black
                        hover:bg-clip-text hover:text-transparent
                        hover:bg-[linear-gradient(90deg,#1a1a1a,#a0a0a0,#e5e5e5,#a0a0a0,#1a1a1a)]
                        hover:[background-size:200%_100%] hover:[background-position:0%_0%]
                        hover:transition-[background-position] hover:duration-700 hover:ease-out
                        hover:[background-position:100%_0%]"
                >
                  MACAU STATION
                </motion.h1>
                <p className="text-3xl text-zinc-600 font-bold mt-5">澳門某某有限公司</p>
              </div>

              <div className="lg:justify-self-start">
                <p className="max-w-xl leading-relaxed text-zinc-600 mt-12 mx-8">
                  Macau Station is a trusted partner in the field of international trade,
                  committed to delivering reliable, efficient, and high-quality trading
                  solutions across global markets. With years of experience in cross-border
                  commerce, we have built a strong reputation for professionalism, adaptability,
                  and integrity.
                </p>
                <div className="mt-12 mx-8" >
                  <a
                    href="#contact"
                    className="rounded-2xl bg-zinc-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-800"
                  >
                    Let’s work together
                  </a>
                </div>
              </div>
            </div>

            {/* spodaj: slika čez celotno širino (namesto ob strani) */}
            <div>
              <div className="h-64 sm:h-80 lg:h-96 rounded-3xl bg-zinc-200" />
              {/*
        <Image
          src="/hero.jpg"
          alt="Our operations"
          width={1400}
          height={800}
          className="w-full h-64 sm:h-80 lg:h-96 rounded-3xl object-cover"
          priority
        />
        */}
            </div>
          </div>
        </section>
        {/* About + Image */}
        <section id="about" className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid md:grid-cols-[320px_1fr] gap-10 items-start">
            <div className="h-64 rounded-2xl bg-zinc-200" />
            <div>
              <h2 className="text-xl font-bold tracking-tight">ABOUT US</h2>
              <p className="mt-3 max-w-2xl text-zinc-600 leading-relaxed">
                WE ARE
              </p>
              <p className="mt-3 max-w-2xl text-zinc-600 leading-relaxed">
                Traders. Connectors. Global Thinkers.
              </p>
              <p className="mt-3 max-w-2xl text-zinc-600 leading-relaxed">
                We are your gateway to global trade success.
                With a deep understanding of international markets and a passion for precision,
                we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
                Driven by experience.
                Guided by integrity.

              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="mx-auto max-w-7xl px-4 py-10">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold tracking-tight">WHAT DO WE DO</h2>
            <p className="mt-2 text-zinc-600">
              We envision a connected world where businesses thrive through long-term relationships,
              seamless supply chains, and unwavering commitment to mutual success</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Global Trade & Distribution", body: "We specialize in international trade and distribution, connecting global markets through efficient, compliant, and reliable logistics. Our expertise spans multiple industries, enabling us to move goods quickly and strategically across borders." },
              { title: "Client-Centered Solutions", body: "With a focus on client needs and trust, we tailor every trading solution to ensure transparency, adaptability, and long-term value." },
              { title: "Support for Global Growth", body: "Whether you're expanding to new markets or optimizing your supply chain, we provide the knowledge, network, and support to help you trade with confidence — anywhere in the world." }
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dark CTA / Feature Banner */}
        <section className="relative bg-zinc-900 text-zinc-50 rounded-t-[60px] rounded-b-[60px] overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16">
            {/* Text content */}
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold">MACAU STATION</h2>
              <p className="mt-3 text-zinc-300">
                Brief pitch of a flagship service or customer success. Add one
                strong value point and call-to-action.
              </p>
            </div>

            {/* Placeholder za sliko */}
            <div className="mt-10">
              <div className="h-64 sm:h-80 lg:h-96 rounded-3xl bg-zinc-200" />
            </div>

            {/* Gumb spodaj desno */}
            <div className="flex justify-end mt-6">
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-white text-zinc-900 px-6 py-2 text-sm font-medium shadow hover:bg-zinc-200"
              >
                CONTACT US
              </a>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section id="why" className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-xl font-bold tracking-tight">WHY CHOSE US</h2>

          <motion.div
            className="mt-8 grid gap-10 md:grid-cols-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 1 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
          >
            <Feature title="Years of experience" desc="Seasoned team with regional expertise and vetted partner network." />
            <Feature title="Fast, efficient, compliant" desc="Reliable SLAs, transparent pricing, and on-time performance." />
            <Feature title="Proven track record" desc="Documented KPIs and references from global brands." />
            <Feature title="Proactive support" desc="Single point of contact and 24/7 communication." />
          </motion.div>
        </section>

        {/* Contact + Secondary blurb */}
        <section id="contact" className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold tracking-tight">WHAT DO WE DO</h2>
              <p className="mt-2 text-zinc-600">Reiterate value and invite visitors to reach out for quotes or consultations.</p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Let’s get in touch</h3>
              <div className="mt-5 grid gap-4">
                <Input label="Full name" name="name" />
                <Input label="Email" name="email" type="email" />
                <Input label="Message" name="message" asTextArea />
                <button className="mt-2 inline-flex justify-center rounded-2xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800" type="submit">Contact us</button>
              </div>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 text-zinc-300">
          <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="flex items-center gap-2 font-semibold text-zinc-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0"><path d="M12 22s8-4.5 8-11a8 8 0 10-16 0c0 6.5 8 11 8 11z" stroke="currentColor" strokeWidth="1.5" /></svg>
                Macau Station
              </div>
              <div className="text-sm">
                <p>Office: 123 Business Avenue</p>
                <p>+853 0000 0000</p>
                <p>info@macau-station.com</p>
              </div>
              <div className="text-sm md:text-right">© {new Date().getFullYear()} Macau Station. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </main>
    </>
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
          transition: { type: "spring", stiffness: 420, damping: 22 }
        }
      }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="flex items-start gap-4"
    >
      <span className="mt-1 inline-flex h-8 w-8 rounded-full bg-zinc-900" />
      <div>
        <div className="font-medium">{title}</div>
        <p className="text-sm text-zinc-600 mt-1">{desc}</p>
      </div>
    </motion.div>
  );
}

function Input({ label, name, type = "text", asTextArea }: { label: string; name: string; type?: string; asTextArea?: boolean }) {
  return (
    <label className="text-sm">
      <div className="text-zinc-700">{label}</div>
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
