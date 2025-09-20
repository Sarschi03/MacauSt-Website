"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl mt-20 px-4 sm:px-6">
      <div className="grid gap-6 sm:gap-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-10 items-start">
          <div>
            <h1
              data-split
              className="mt-8 sm:mt-10 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.75rem,5vw,4rem)]"
            >
              MACAU STATION
            </h1>
            <p data-split className="mt-3 text-xl sm:text-[28px] font-medium text-zinc-600">
              值得信赖的合作伙伴
            </p>
          </div>

          <div className="lg:justify-self-start">
            <p
              data-split
              className="relative mx-0 lg:mx-8 mt-2 sm:mt-4 max-w-[60ch] text-[15px] leading-7 sm:leading-8 text-zinc-600/90"
            >
              Macau Station is a trusted partner in the field of international trade, committed to delivering reliable,
              efficient, and high-quality trading solutions across global markets. With years of experience in cross-border
              commerce, we have built a strong reputation for professionalism, adaptability, and integrity.
            </p>

            <div className="mt-6 sm:mt-8 lg:mx-8">
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

        <div className="relative h-[56vw] max-h-[480px] sm:h-[70vw] sm:max-h-[600px] lg:h-120 rounded-3xl overflow-hidden">
          <Image
            src="/o.png"
            alt="Cargoship"
            fill
            className="object-cover"
            priority
            sizes="(min-width:1024px) 1152px, (min-width:640px) 90vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
