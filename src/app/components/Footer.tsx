"use client";

export default function Footer({ footerVh }: { footerVh: number }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-black text-zinc-300" style={{ height: `${footerVh}vh` }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-full flex items-center">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 w-full">
          <div className="flex items-center gap-2 font-semibold text-zinc-50">
            <img src="/logo_beli.png" alt="Macau Station Logo" className="w-[200px] h-auto shrink-0" />
          </div>
          <div className="text-sm space-y-1 mt-10">
            <p data-split>+386 40 511 765</p>
            <p data-split>+853 6881 6601</p>
            <p data-split>simon.k@macaustation.com</p>
          </div>
          <div className="text-sm md:text-right" data-split>
            © {new Date().getFullYear()} Macau Station. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
