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
  { id: "curriculum-quizzes", icon: "Q", title: "Curriculum-aligned quizzes", body: "Published units are organized by grade, stream, subject and topic so students can practice what they are actually learning." },
  { id: "instant-mode", icon: "I", title: "Instant learning mode", body: "Answer one question and immediately see the correct choice and reasoning, without hiding the remaining options or interrupting the flow." },
  { id: "exam-mode", icon: "E", title: "Focused exam mode", body: "Use one minute per question, clear attempt rules and a complete result review when you want a realistic assessment." },
  { id: "offline-study", icon: "O", title: "Offline study", body: "Download a quiz once and continue without mobile data. Pending progress and question reports synchronize when the device reconnects." },
  { id: "progress-tracking", icon: "P", title: "Progress across study spaces", body: "Keep quiz history, scores and completed work connected when moving between your Android devices and the secure student web app." },
  { id: "goals-timetables", icon: "T", title: "Goals and timetables", body: "Set a realistic daily target, build a weekly study rhythm and use reminders to return at the time you planned." },
  { id: "question-reporting", icon: "R", title: "Question reporting", body: "Flag a wrong answer, unclear question or other issue directly from the quiz so the content team can review it." },
  { id: "announcements", icon: "N", title: "Relevant announcements", body: "Receive welcome messages, important academy updates and new-content notices filtered for the right grade and stream." },
  { id: "premium-access", icon: "PRO", title: "Premium access", body: "Unlock all published Premium quiz units and complete study notes while your subscription is active on the account." },
  { id: "platform-access", icon: "4", title: "One connected account", body: "Study on one linked Android phone, one linked Android tablet and the web today. A focused Windows application is the next supported space." },
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
      <section id="curriculum-coverage" className="feature-intro shell" aria-label="How learning content is organized"><div><b>GRADES 9-12</b><span>Content follows the secondary grade selected by the student.</span></div><div><b>SUBJECTS</b><span>Mathematics, Physics, Chemistry, Biology and more.</span></div><div><b>UNIT BY UNIT</b><span>Open the exact unit you are studying instead of searching one large library.</span></div><div><b>NATURAL + SOCIAL</b><span>Relevant stream choices appear where the curriculum requires them.</span></div></section>
      <section className="shell product-grid">{features.map((feature, index) => <article id={feature.id} key={feature.title}><div className="product-icon">{feature.icon}</div><span>{String(index + 1).padStart(2, "0")}</span><h2>{feature.title}</h2><p>{feature.body}</p></article>)}</section>
      <section id="practice-modes" className="mode-section shell">
        <div className="section-heading"><p className="eyebrow"><span /> Two ways to practice</p><h2>Learn first. Test when ready.</h2></div>
        <div className="mode-grid">
          <article><span className="mode-label">INSTANT MODE</span><h3>Feedback while the idea is still fresh.</h3><p>Choose an answer and immediately see what is correct, what needs attention and why—without losing the question or the other choices.</p><ul><li>Immediate correct-answer feedback</li><li>Explanation shown in the same flow</li><li>Ideal for first-time learning and revision</li></ul></article>
          <article><span className="mode-label">EXAM MODE</span><h3>A focused attempt with clear rules.</h3><p>Work through a timed attempt without interruptions, then review the complete paper when the assessment is finished.</p><ul><li>One minute planned for each question</li><li>Exit confirmation protects accidental taps</li><li>Full answer and explanation review afterward</li></ul></article>
        </div>
      </section>
      <section className="flow-section"><div className="shell"><div className="section-heading"><p className="eyebrow light"><span /> The Zemen loop</p><h2>Every feature points to the next useful action.</h2></div><div className="flow-grid">{studyFlow.map((item) => <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div></div></section>
      <section className="feature-callout shell"><div><p className="eyebrow light"><span /> Designed for Ethiopia</p><h2>Serious learning should still work when data is limited.</h2></div><div><p>Fast screens, visible loading feedback, cached content and offline quizzes reduce interruption without reducing the quality of the learning experience.</p><a className="button button-bright" href="/download#official-download">Download for Android ↗</a></div></section>
      <SiteFooter />
    </main>
  );
}
