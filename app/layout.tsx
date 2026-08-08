import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://zemenacademy.com";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Zemen Academy",
  title: {
    default: "Zemen Academy | Ethiopian Learning App for Grades 9–12",
    template: "%s | Zemen Academy",
  },
  description: "Study Mathematics, Physics, Chemistry, Biology and more with curriculum-aligned quizzes, explanations, offline access and progress tools for Ethiopian students in Grades 9–12.",
  keywords: [
    "Zemen Academy",
    "Ethiopian education app",
    "Grade 9 questions Ethiopia",
    "Grade 10 questions Ethiopia",
    "Grade 11 exam preparation",
    "Grade 12 exam preparation Ethiopia",
    "Ethiopian secondary school quizzes",
    "offline learning app Ethiopia",
  ],
  authors: [{ name: "Zemen Academy", url: siteUrl }],
  creator: "Zemen Academy",
  publisher: "Zemen Academy",
  category: "education",
  alternates: { canonical: "/" },
  icons: {
    icon: "/zemen-academy-logo.png",
    shortcut: "/zemen-academy-logo.png",
    apple: "/zemen-academy-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Zemen Academy | Study with direction",
    description: "Curriculum-aligned quizzes, offline study and clear progress for Ethiopian students in Grades 9–12.",
    siteName: "Zemen Academy",
    locale: "en_ET",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Zemen Academy — Study with direction" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zemen Academy | Study with direction",
    description: "A focused learning app for Ethiopian students in Grades 9–12.",
    images: ["/og.png"],
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${siteUrl}/#organization`,
  name: "Zemen Academy",
  url: siteUrl,
  logo: `${siteUrl}/zemen-academy-logo.png`,
  description: "A curriculum-aligned learning platform for Ethiopian secondary students in Grades 9–12.",
  email: "zemenacademy@gmail.com",
  areaServed: { "@type": "Country", name: "Ethiopia" },
  sameAs: [
    "https://t.me/zemen_academy",
    "https://www.tiktok.com/@zemen_academy",
    "https://www.instagram.com/zemen_academy",
    "https://www.youtube.com/@ZemenAcademy",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Zemen Academy",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </body>
    </html>
  );
}
