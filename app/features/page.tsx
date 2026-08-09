import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Learning Features",
  description: "Explore Zemen Academy quizzes, instant explanations, exam mode, offline study, synchronized progress, timetables and Premium learning tools.",
  alternates: { canonical: "/features" },
  openGraph: { url: "/features", title: "Learning Features | Zemen Academy", description: "A connected learning system built for Ethiopian secondary students." },
};

const features = [
  { icon: "Q", title: "Curriculum-aligned quizzes", body: "Published units are organized by grade, stream, subject and topic so students can practice what they are actually learning." },
  { icon: "I", title: "Instant learning mode", body: "Answer one question and immediately see the correct choice and reasoning, without hiding the remaining options or interrupting the flow." },
  { icon: "E", title: "Focused exam mode", body: "Use one minute per question, clear attempt rules and a complete result review when you want a realistic assessment." },
  { icon: "O", title: "Offline study", body: "Download a quiz once and continue without mobile data. Pending progress and question reports synchronize when the device reconnects." },
  { icon: "P", title: "Progress across devices", body: "Keep quiz history, scores, completed work and study activity connected when moving between one phone and one tablet." },
  { icon: "T", title: "Goals and timetables", body: "Set a realistic daily target, build a weekly study rhythm and use reminders to return at the time you planned." },
  { icon: "R", title: "Question reporting", body: "Flag a wrong answer, unclear question or other issue directly from the quiz so the content team can review it." },
  { icon: "N", title: "Relevant announcements", body: "Receive welcome messages, important academy updates and new-content notices filtered for the right grade and stream." },
  { icon: "★", title: "Premium access", body: "Unlock the complete learning experience, including full subject access, Premium recovery support and future notes and past papers." },
];

const studyFlow = [
  { step: "01", title: "Choose precisely", body: "Your grade, stream, subject and unit keep the library relevant." },
  { step: "02", title: "Practice deliberately", body: "Learn with immediate reasoning or measure yourself under exam rules." },
  { step: "03", title: "Review completely", body: "See every question, your answer, the correct answer and the explanation together." },
  { step: "04", title: "Return stronger", body: "Progress and daily goals make the next useful session obvious." },
];

export default function FeaturesPage() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="page-hero shell feature-hero"><div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Features</span></div><p className="eyebrow"><span /> The complete platform</p><h1>Built around how students actually study.</h1><p>Zemen Academy connects practice, feedback, offline access and progress in one calm learning experience for Grades 9–12.</p></section>
      <section className="feature-intro shell" aria-label="Feature overview"><div><b>LEARN</b><span>Instant explanations</span></div><div><b>TEST</b><span>Structured exam mode</span></div><div><b>KEEP</b><span>Offline study access</span></div><div><b>GROW</b><span>Progress that follows you</span></div></section>
      <section className="shell product-grid">{features.map((feature, index) => <article key={feature.title}><div className="product-icon">{feature.icon}</div><span>{String(index + 1).padStart(2, "0")}</span><h2>{feature.title}</h2><p>{feature.body}</p></article>)}</section>
      <section className="mode-section shell">
        <div className="section-heading"><p className="eyebrow"><span /> Two ways to practice</p><h2>Learn first. Test when ready.</h2></div>
        <div className="mode-grid">
          <article><span className="mode-label">INSTANT MODE</span><h3>Feedback while the idea is still fresh.</h3><p>Choose an answer and immediately see what is correct, what needs attention and why—without losing the question or the other choices.</p><ul><li>Immediate correct-answer feedback</li><li>Explanation shown in the same flow</li><li>Ideal for first-time learning and revision</li></ul></article>
          <article><span className="mode-label">EXAM MODE</span><h3>A focused attempt with clear rules.</h3><p>Work through a timed attempt without interruptions, then review the complete paper when the assessment is finished.</p><ul><li>One minute planned for each question</li><li>Exit confirmation protects accidental taps</li><li>Full answer and explanation review afterward</li></ul></article>
        </div>
      </section>
      <section className="flow-section"><div className="shell"><div className="section-heading"><p className="eyebrow light"><span /> The Zemen loop</p><h2>Every feature points to the next useful action.</h2></div><div className="flow-grid">{studyFlow.map((item) => <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section className="feature-callout shell"><div><p className="eyebrow light"><span /> Designed for Ethiopia</p><h2>Serious learning should still work when data is limited.</h2></div><div><p>Fast screens, visible loading feedback, cached content and offline quizzes reduce interruption without reducing the quality of the learning experience.</p><Link className="button button-bright" href="/download">Download for Android ↗</Link></div></section>
      <SiteFooter />
    </main>
  );
}
