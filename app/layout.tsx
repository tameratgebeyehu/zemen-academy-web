import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zemenacademy.com"),
  title: { default: "Zemen Academy — Study with direction", template: "%s · Zemen Academy" },
  description: "Curriculum-aligned quizzes, explanations, offline study, timetables, and progress tools for Ethiopian students in Grades 9–12.",
  icons: {
    icon: "/zemen-academy-logo.png",
    shortcut: "/zemen-academy-logo.png",
  },
  openGraph: { title: "Zemen Academy — Study with direction", description: "Focused exam preparation for Ethiopian students in Grades 9–12.", type: "website", locale: "en_ET", siteName: "Zemen Academy" },
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
