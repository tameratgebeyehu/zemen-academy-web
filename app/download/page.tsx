import type { Metadata } from "next";
import Image from "next/image";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "Download Android App",
  description: "Download the official Zemen Academy Android app for curriculum-aligned Ethiopian Grades 9–12 quizzes, offline learning and progress tracking.",
  alternates: { canonical: "/download" },
  openGraph: { url: "/download", title: "Download Zemen Academy for Android", description: "Take curriculum-aligned practice, offline quizzes and progress tools wherever you go." },
};

const appSchema = { "@context": "https://schema.org", "@type": "MobileApplication", name: "Zemen Academy", operatingSystem: "Android", applicationCategory: "EducationalApplication", description: "Curriculum-aligned quizzes, explanations, offline study and progress tools for Ethiopian students in Grades 9–12.", offers: { "@type": "Offer", price: "0", priceCurrency: "ETB" }, downloadUrl: "https://zemenacademy.com/download" };

export default function DownloadPage() {
  return <><InfoPage eyebrow="Android app" title="Your study plan, wherever you go." intro="Install Zemen Academy from an official source and continue learning online or offline.">
    <div className="download-panel"><div className="download-logo"><Image src="/zemen-academy-logo.png" alt="Zemen Academy logo" width={100} height={100} /></div><p className="download-label">ZEMEN ACADEMY FOR ANDROID</p><h2>Focused learning in your pocket.</h2><p>Grades 9–12 quizzes, clear explanations, exam mode, offline downloads, synchronized progress, study timetables and relevant announcements.</p><a className="button button-bright" href="https://t.me/zemen_academy">Open official Telegram channel ↗</a><small>Google Play distribution is planned for a future release.</small></div>
    <InfoSection title="Install safely"><ul className="check-list"><li>Download only from the official Zemen Academy Telegram channel or this website.</li><li>Never install a file reposted by an unknown account.</li><li>Android may ask permission to install an APK from Telegram or your browser. Remove that permission after installation.</li><li>Keep the app updated to receive security fixes and newly supported learning features.</li></ul></InfoSection>
    <InfoSection title="Before you install"><p>Zemen Academy requires Android and uses internet access for sign-in, content synchronization, notifications and Premium verification. Downloaded quizzes remain available offline.</p></InfoSection>
  </InfoPage><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} /></>;
}
