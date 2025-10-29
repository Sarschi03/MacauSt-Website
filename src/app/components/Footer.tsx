"use client";

function ArrowIcon({ className = "w-3 h-3" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function Footer({ footerVh }: { footerVh: number }) {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 z-0 bg-black text-zinc-300 text-sm"
      style={{ height: `${footerVh}vh` }} 
    >
      
      <div className="relative h-full flex flex-col justify-end">
        <div className="mx-auto max-w-7xl sm:px-10 w-full pb-1 ">
          <div className="grid md:grid-cols-3 gap-12 w-full items-start mb-6">
         
            <div className="flex flex-col items-start justify-center">
              <img
                src="/logo_beli.png"
                alt="Macau Station Logo"
                className="w-[150px] h-auto mb-2"
              />
            </div>

          
            <div className="flex flex-col">
              <h3 className="uppercase tracking-wide text-zinc-400 mb-8">
                Contact
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-12">
                  <span className="text-white min-w-[70px]">Phone</span>
                  <a
                    href="tel:+38640511765"
                    className="text-zinc-400 flex items-center gap-2 hover:text-white transition"
                  >
                    +386 40 511 765
                    <ArrowIcon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </a>
                </div>

                <div className="flex items-center gap-12">
                  <span className="text-white min-w-[70px]" />
                  <a
                    href="tel:+8568816601"
                    className="text-zinc-400 flex items-center gap-2 hover:text-white transition"
                  >
                    +85 6881 6601
                    <ArrowIcon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </a>
                </div>

                <div className="flex items-center gap-12">
                  <span className="text-white min-w-[70px]">Mail</span>
                  <a
                    href="mailto:simon.k@macaustation.com"
                    className="text-zinc-400 flex items-center gap-2 hover:text-white transition"
                  >
                    simon.k@macaustation.com
                    <ArrowIcon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </a>
                </div>
              </div>
            </div>

            
            <div className="flex flex-col">
              <h3 className="uppercase tracking-wide text-zinc-400 mb-8">
                Socials
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-12">
                  <span className="text-white min-w-[70px]">Instagram</span>
                  <a
                    href="https://instagram.com/macau_station"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 flex items-center gap-2 hover:text-white transition"
                  >
                    @macau_station
                    <ArrowIcon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </a>
                </div>

                <div className="flex items-center gap-12">
                  <span className="text-white min-w-[70px]">WeChat</span>
                  <a
                    href="#"
                    className="text-zinc-400 flex items-center gap-2 hover:text-white transition"
                  >
                    @macau_station
                    <ArrowIcon className="w-3.5 h-3.5 text-zinc-400 hover:text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

         
          <div className="text-xs text-zinc-500 border-t border-zinc-800 pt-5 text-center md:text-right">
            © {new Date().getFullYear()} Macau Station. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
