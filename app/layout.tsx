import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import { AnimationProvider } from "@/lib/animation/AnimationProvider";
import Cursor from "@/components/cursor/Cursor";
import LenisProvider from "@/components/providers/LenisProvider";



const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "House Eleven",
  description: "Second To None.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${ibmMono.variable}`} >
        <CursorProvider>
          <AnimationProvider>
            <Cursor />

            <LenisProvider>
              {children}
            </LenisProvider>
          </AnimationProvider>
        </CursorProvider>
      </body>
    </html>
  );
}