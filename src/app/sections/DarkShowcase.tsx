"use client";

import Image from "next/image";

export default function DarkShowcase() {
  return (
    <section className="relative bg-zinc-900 text-zinc-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-300/90" />
          <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
        </div>

        <div className="max-w-xl">
          <h2 data-split className="mt-4 sm:mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-100/95 text-[clamp(1.5rem,4vw,4rem)]">
            From Origin to <br className="hidden md:block" /> Every Destination
          </h2>

          <p data-split className="mt-4 sm:mt-8 max-w-3xl text-[15px] leading-7 sm:leading-8 text-zinc-200/90">
            We are your gateway to global trade success. With a deep understanding of international markets and a passion for
            precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
          </p>
        </div>

        <div className="mt-8 sm:mt-10">
          <div className="relative">
            {/* Image Card */}
            <div className="relative overflow-hidden rounded-3xl h-[58vw] max-h-[24rem] sm:h-80 lg:h-96">
              <Image
                src="/cargo2.jpg"
                alt="Cargoship"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 896px, (min-width:640px) 90vw, 100vw"
              />
              {/* Square-ish notch to match desktop look */}
              <span
                aria-hidden
                className="pointer-events-none absolute bottom-[-24px] right-[-24px]
                           w-[160px] h-[116px] rounded-[28px]
                           sm:w-[220px] sm:h-[140px] sm:rounded-[32px]
                           lg:w-[320px] lg:h-[180px] lg:rounded-[40px]
                           lg:bottom-[-48px] lg:right-[-48px] bg-zinc-900"
              />
            </div>

            <a
              href="#contact"
              className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 lg:bottom-6 lg:right-6 z-10 inline-flex items-center justify-center overflow-hidden rounded-full  bg-white text-black font-bold px-4 py-2 cursor-pointer group transition-colors duration-300"
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
      </div>
    </section>
  );
}
