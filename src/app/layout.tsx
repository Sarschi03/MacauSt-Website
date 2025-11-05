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

export const metadata = {
  title: "Macau Station",
  description: "Global Trade Solution Provider",
  icons: {
    icon: [
      { url: "/ms.logo1.png", type: "image/png", sizes: "16x16" },
      { url: "/ms.logo1.png", type: "image/png", sizes: "32x32" },
      { url: "/ms.logo1.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/ms.logo1.png",
    shortcut: "/ms.logo1.png",
  },
  openGraph: {
    title: "Macau Station",
    description: "Global Trade Solution Provider",
    url: "https://www.macaustation.com",
    siteName: "Macau Station",
    
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
