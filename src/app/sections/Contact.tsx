"use client";

import Input from "../components/Input";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
        <div className="pt-2">
          <div className="flex items-center gap-3 text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-zinc-400/90" />
            <span data-split className="tracking-wide text-zinc-500/90">Delivering Quality</span>
          </div>

          <h2
            data-split
            className="mt-4 sm:mt-6 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-800/95 text-[clamp(1.5rem,4vw,4rem)]"
          >
            From Origin to <br className="hidden md:block" /> Every Destination
          </h2>

          <p data-split className="mt-4 sm:mt-8 max-w-3xl text-[15px] leading-7 sm:leading-8 text-zinc-600/90">
            We are your gateway to global trade success. With a deep understanding of international markets and a passion for
            precision, we act as trusted partners for companies seeking smart, reliable, and scalable trade solutions.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 shadow-sm">
          <h3 data-split className="font-semibold">Let’s get in touch</h3>
          <div className="mt-4 sm:mt-5 grid gap-4">
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
  );
}
