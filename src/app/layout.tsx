import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import  "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Macau Station",
  description: "Global Trade Solution Provider",
  icons: {
    icon: [
      { url: "/ms.logo1.png", type: "image/png", sizes: "32x32" },
      { url: "/ms.logo1.png", type: "image/png", sizes: "192x192" }, // optional larger
      { url: "/favicon.ico", sizes: "any" }, // optional ICO fallback
    ],
    apple: "/ms.logo2.png",
    shortcut: "/ms.logo2.png",
  },
  openGraph: {
    title: "Macau Station",
    description: "Global Trade Solution Provider",
    url: "https://www.macaustation.com",
    siteName: "Macau Station",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }], // optional
  },
  twitter: {
    card: "summary_large_image",
    title: "Macau Station",
    description: "Global Trade Solution Provider",
    images: ["/og-image.png"], // optional
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
