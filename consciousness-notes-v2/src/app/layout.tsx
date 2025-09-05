import type { Metadata } from "next";
import { Inter, Crimson_Text, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Consciousness Notes - Sacred Wisdom & Spiritual Journey",
  description: "A collection of spiritual insights, Brahman realizations, and contemplative practices. Journey through neti neti, bhakti, and the recognition of divine unity in all forms - Krishna, Kali, Sophie, Brahman.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${crimsonText.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
