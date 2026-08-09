import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "About",
  description: "Learn why Zemen Academy is building a focused, accessible learning platform for Ethiopian secondary students.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About Zemen Academy", description: "Focused learning built for Ethiopian students." },
};

export default function AboutPage() {
  return <InfoPage eyebrow="About Zemen" title="A clearer path for every serious student." intro="Zemen Academy is an Ethiopian learning platform built to make strong practice, clear feedback and consistent study more accessible to secondary students." path="/about" tone="orange" highlights={["Built in Ethiopia", "Designed for Grades 9–12", "Created around real study conditions"]}>
    <InfoSection title="Why we are building Zemen"><p>Students should not need an expensive international payment method, unlimited mobile data or a complicated system to practice well. Zemen Academy brings curriculum-aligned questions, explanations, downloads, progress and study planning into one focused Android experience.</p></InfoSection>
    <InfoSection title="Who it is for"><p>Zemen Academy is being built for Ethiopian secondary students in Grades 9–12, including Natural and Social streams. Content is organized by the grade, subject and unit a student is actually studying, instead of presenting one large, confusing library.</p></InfoSection>
    <InfoSection title="What we believe"><div className="belief-grid"><div><b>Clarity over noise</b><p>Every screen and feature should help a student decide what to do next.</p></div><div><b>Understanding over guessing</b><p>A useful answer explains the reasoning, not only the correct letter.</p></div><div><b>Access over assumptions</b><p>Offline learning and low-data performance are core requirements, not extras.</p></div><div><b>Improvement over perfection</b><p>Students can report issues, and content can become stronger with every review.</p></div></div></InfoSection>
    <InfoSection title="Connect with us"><div className="contact-grid"><a className="contact-card" href="https://t.me/zemen_academy"><b>Telegram</b><span>t.me/zemen_academy</span></a><a className="contact-card" href="https://www.tiktok.com/@zemen_academy"><b>TikTok</b><span>@zemen_academy</span></a><a className="contact-card" href="https://www.instagram.com/zemen_academy"><b>Instagram</b><span>@zemen_academy</span></a><a className="contact-card" href="https://www.youtube.com/@ZemenAcademy"><b>YouTube</b><span>@ZemenAcademy</span></a><a className="contact-card" href="mailto:zemenacademy@gmail.com"><b>Email</b><span>zemenacademy@gmail.com</span></a></div></InfoSection>
    <div className="page-next"><div><span>OUR DIRECTION</span><h2>Build the learning tool we wished students already had.</h2><p>Reliable questions, readable mathematics, useful feedback, low-data access and a study experience that respects a student’s time.</p></div><a className="button button-primary" href="/features">Explore the platform</a></div>
  </InfoPage>;
}
