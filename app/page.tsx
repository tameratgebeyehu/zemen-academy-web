import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const featureHighlights = [
  { tag: "Practice", title: "Questions that teach", body: "Work through curriculum-aligned questions in Instant Mode for immediate reasoning or Exam Mode for focused assessment.", accent: "violet", href: "/features#practice-modes" },
  { tag: "Offline", title: "Keep learning without data", body: "Download a published unit once, study anywhere, and synchronize progress when your connection returns.", accent: "teal", href: "/features#offline-study" },
  { tag: "Progress", title: "See what is improving", body: "Track completed quizzes, study time and scores with one learning account across Android and the web.", accent: "orange", href: "/features#progress-tracking" },
];

const studySpaces = [
  { number: "01", name: "Android phone", title: "One linked smartphone", body: "Practise, download quizzes and receive learning reminders from the phone you use every day.", status: "Available" },
  { number: "02", name: "Android tablet", title: "One linked tablet", body: "Use the same account on a larger study screen without consuming the linked-phone slot.", status: "Available" },
  { number: "03", name: "Web app", title: "Learn in any modern browser", body: "Open your subjects, notes, quizzes and synchronized progress at app.zemenacademy.com.", status: "Available" },
  { number: "04", name: "Windows app", title: "A focused desktop experience", body: "The Microsoft Store application will use the same Zemen account and learning progress after release.", status: "Coming next" },
];

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Economics"];

export default function Home() {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Built for Ethiopian students</p>
          <h1>Learn deeper.<br /><em>Move forward.</em></h1>
          <p className="hero-lede">Zemen Academy gives Grades 9–12 students a focused path through strong questions, understandable explanations, offline study and progress that feels real.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://app.zemenacademy.com">Start learning on the web <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="/download#official-download">Get Android app</a>
            <a className="button button-secondary" href="/features">Explore the platform</a>
          </div>
          <div className="trust-row" aria-label="Product highlights"><span>Grades 9–12</span><i /><span>Natural & Social</span><i /><span>Built for low data</span></div>
        </div>
        <div className="hero-stage" aria-label="Zemen Academy learning experience preview">
          <div className="aurora aurora-a" /><div className="aurora aurora-b" />
          <div className="dashboard-card">
            <div className="dashboard-head"><span className="mini-logo">Z</span><div><small>WELCOME BACK</small><b>Today&apos;s study path</b></div><span className="status-dot">LIVE</span></div>
            <div className="mastery-card"><small>NEXT MASTERY TARGET</small><h2>Linear equations</h2><p>Mathematics · Grade 9</p><div className="meter"><span /></div><div className="meter-label"><b>68% ready</b><span>12 questions left</span></div></div>
            <div className="metric-row"><div><span>7</span><small>day rhythm</small></div><div><span>84%</span><small>best score</small></div><div><span>3</span><small>units offline</small></div></div>
            <div className="schedule-card"><span className="schedule-icon">⌁</span><div><b>Physics practice</b><small>Starts at 6:30 PM</small></div><span>Today</span></div>
            <div className="dashboard-notice"><span aria-hidden="true" /><div><b>Progress saved</b><small>Continue on Android or the web with the same account</small></div></div>
          </div>
        </div>
      </section>

      <section className="proof-bar" aria-label="What Zemen Academy supports"><div className="shell proof-grid"><div><b>Grades 9–12</b><strong>Secondary curriculum</strong><span>Content is organized for the grade and stream you select.</span></div><div><b>Instant + Exam</b><strong>Two practice experiences</strong><span>Learn with explanations or test yourself under exam rules.</span></div><div><b>One account</b><strong>Connected learning</strong><span>Your account carries your curriculum and progress between supported study spaces.</span></div><div><b>Offline study</b><strong>Learn with limited data</strong><span>Download a quiz once and open it later without internet.</span></div></div></section>

      <section className="section shell platform-section" aria-labelledby="platform-title">
        <div className="section-heading split-heading"><div><p className="eyebrow"><span /> One account, four study spaces</p><h2 id="platform-title">Move screens.<br />Keep your direction.</h2></div><p>One Zemen account brings together your curriculum, Premium access and learning progress. Android device limits protect the account: one linked phone and one linked tablet.</p></div>
        <div className="platform-grid">{studySpaces.map((space) => <article key={space.name}><div><span>{space.number}</span><b>{space.status}</b></div><small>{space.name}</small><h3>{space.title}</h3><p>{space.body}</p>{space.name === "Web app" && <a href="https://app.zemenacademy.com">Open the web app →</a>}</article>)}</div>
        <p className="platform-clarity"><strong>Clear device policy:</strong> one Android phone and one Android tablet may be linked at a time. The secure web app uses the same account and synchronized progress; the Windows app joins this connected system after its Microsoft Store release.</p>
      </section>

      <section className="section shell">
        <div className="section-heading split-heading"><div><p className="eyebrow"><span /> One connected study system</p><h2>Every session should lead somewhere.</h2></div><p>Zemen turns scattered practice into a simple loop: choose a goal, study with feedback, understand mistakes and return stronger.</p></div>
        <div className="feature-grid">{featureHighlights.map((feature, index) => <article className={`feature-card ${feature.accent}`} key={feature.title}><span className="feature-index">0{index + 1}</span><p className="feature-tag">{feature.tag}</p><h3>{feature.title}</h3><p>{feature.body}</p><a href={feature.href} aria-label={`Learn more about ${feature.title}`}>See how it works <span>→</span></a></article>)}</div>
      </section>

      <section className="subjects-section">
        <div className="shell subjects-layout"><div><p className="eyebrow light"><span /> Curriculum coverage</p><h2>Your subjects.<br />One focused place.</h2><p>Study unit by unit across the Ethiopian secondary curriculum, with more subjects and past papers added as they are verified.</p><a className="text-link" href="/features#curriculum-coverage">See how grades and subjects are organized →</a></div><div className="subject-cloud">{subjects.map((subject, index) => <span key={subject} style={{ "--delay": `${index * 0.06}s` } as React.CSSProperties}>{subject}<i>{String(index + 1).padStart(2, "0")}</i></span>)}</div></div>
      </section>

      <section className="section shell">
        <div className="section-heading"><p className="eyebrow"><span /> A clear learning rhythm</p><h2>Open. Practice. Understand. Repeat.</h2></div>
        <div className="steps-grid"><article><span>01</span><div><h3>Choose your next unit</h3><p>Find published content for your grade, stream and subject without searching through irrelevant material.</p></div></article><article><span>02</span><div><h3>Practice your way</h3><p>Use instant explanations while learning, or enter a timed exam environment when you are ready to test yourself.</p></div></article><article><span>03</span><div><h3>Turn mistakes into direction</h3><p>Review every answer, report unclear questions and use your progress to decide what deserves your attention next.</p></div></article></div>
      </section>

      <section className="closing shell">
        <div className="closing-copy">
          <p className="eyebrow light"><span /> Start where you are</p>
          <h2>One focused session can change your next result.</h2>
          <p>Choose a subject, understand one difficult idea, and build from there. Zemen Academy keeps the next step clear.</p>
        </div>
        <div className="closing-action">
          <span className="closing-badge">ANDROID · GRADES 9–12</span>
          <a className="button button-bright" href="/download#official-download">Get Zemen Academy <span aria-hidden="true">↗</span></a>
          <small>Download from the official Zemen Academy channel.</small>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
