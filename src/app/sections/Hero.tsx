"use client";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen isolate overflow-hidden"
            aria-label="Hero"
        >
            {/* Background video */}
            <video
                className="absolute inset-0 h-full w-full object-cover"
                src="/video2.mp4"
                autoPlay
                muted
                loop
                playsInline
                poster="/cargo.png"
            >


            </video>


            {/* Content on top of video */}
            <div className="relative z-10 -mt-20 mx-auto max-w-7xl px-4 sm:px-12 min-h-screen flex items-center">
                <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 items-start pt-28 sm:pt-24">
                    <div>
                        <h1 data-split className="mt-8 sm:mt-10 font-medium leading-[0.98] tracking-[-0.01em] text-zinc-200 text-[clamp(1.75rem,5vw,4rem)]" >
                            MACAU STATION
                        </h1>
                        <p data-split className="mt-3 text-xl sm:text-[28px] font-medium text-zinc-200">
                            值得信赖的合作伙伴
                        </p>
                    </div>

                    <div className="lg:justify-self-start">
                        <p data-split className="relative mx-0 lg:mx-8 mt-2 sm:mt-4 max-w-[60ch] text-[15px] leading-7 sm:leading-8 text-zinc-200" >
                            Macau Station is a trusted partner in the field of international
                            trade, committed to delivering reliable, efficient, and
                            high-quality trading solutions across global markets. With years of
                            experience in cross-border commerce, we have built a strong
                            reputation for professionalism, adaptability, and integrity.
                        </p>

                        <div className="mt-6 sm:mt-8 lg:mx-8">
                            <a
                                href="#contact"
                                className="relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/80 bg-white text-black font-bold px-6 py-3 cursor-pointer group transition-colors duration-300"
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
            </div>

            {/* Soft fade into next section (match your main bg, e.g., bg-zinc-50) */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent" />
        </section>
    );
}
