import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const features = [
  { number: "01", title: "Practice with purpose", body: "Curriculum-aligned quizzes for Grades 9–12, with instant feedback, exam mode, clear explanations, and progress that follows you." },
  { number: "02", title: "Built for limited data", body: "Download a unit once and continue studying offline. Your attempts and reports sync safely when your connection returns." },
  { number: "03", title: "Know what to study next", body: "Daily goals, a weekly timetable, progress insights, and the upcoming Zemen Mastery Map turn practice into a realistic plan." },
];
const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Economics"];

export default function Home() {
  return <main>
    <SiteHeader />
    <section className="hero shell">
      <div className="hero-copy">
        <p className="eyebrow"><span /> Ethiopian curriculum · Grades 9–12</p>
        <h1>Study with direction.<br /><em>Grow with confidence.</em></h1>
        <p className="hero-lede">Zemen Academy turns serious exam preparation into a clear daily rhythm—strong questions, useful explanations, offline access, and progress you can understand.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/download">Get the Android app <span aria-hidden="true">↗</span></Link><a className="button button-secondary" href="#inside">See what is inside</a></div>
        <div className="trust-row" aria-label="Product highlights"><span>Grades 9–12</span><i /><span>Natural & Social</span><i /><span>Offline study</span></div>
      </div>
      <div className="hero-visual" aria-label="Zemen Academy study dashboard preview">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="phone-card">
          <div className="phone-top"><span className="mini-mark">Z</span><span>Today’s plan</span><b>3/5</b></div>
          <div className="focus-card"><p>YOUR NEXT FOCUS</p><h2>Quadratic equations</h2><span>Mathematics · Grade 10</span><div className="progress-track"><div /></div><small>68% mastery</small></div>
          <div className="mini-grid"><div><b>12</b><span>Questions today</span></div><div><b>4</b><span>Day streak</span></div></div>
          <div className="next-session"><span className="pulse" /><p><b>Physics at 6:30 PM</b><small>Timetable reminder</small></p></div>
        </div>
        <div className="floating-note note-a">Offline ready ✓</div><div className="floating-note note-b">+8% this week</div>
      </div>
    </section>
    <section className="subject-strip" aria-label="Subjects"><div className="subject-track">{subjects.concat(subjects).map((subject, index) => <span key={`${subject}-${index}`}>{subject}<i>✦</i></span>)}</div></section>
    <section id="inside" className="section shell">
      <div className="section-heading"><p className="eyebrow"><span /> A smarter study loop</p><h2>More than a question bank.</h2><p>Every part of Zemen Academy is designed to move a student from “I tried” to “I understand.”</p></div>
      <div className="feature-grid">{features.map((feature) => <article className="feature-card" key={feature.number}><span className="feature-number">{feature.number}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>)}</div>
    </section>
    <section className="manifesto"><div className="shell manifesto-inner"><p className="eyebrow light"><span /> What makes Zemen different</p><h2>Not just whether you were wrong.<br /><em>Why you were wrong.</em></h2><p>Zemen’s learning system is being built to identify weak concepts and common misconceptions, then connect each student to the exact prerequisite and practice they need next.</p><div className="manifesto-pills"><span>Verified questions</span><span>Mistake notebook</span><span>Mastery by topic</span><span>Personal study path</span></div></div></section>
    <section className="section shell final-cta"><div><p className="eyebrow"><span /> Start where you are</p><h2>Your next result begins with today’s session.</h2></div><Link className="button button-primary" href="/download">Download Zemen Academy <span aria-hidden="true">→</span></Link></section>
    <SiteFooter />
  </main>;
}
