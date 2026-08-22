import type { ReactNode } from "react";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./SiteChrome";

type Tone = "violet" | "teal" | "orange" | "blue";

export function InfoPage({
  eyebrow,
  title,
  intro,
  path,
  tone = "violet",
  highlights = [],
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  path: string;
  tone?: Tone;
  highlights?: string[];
  children: ReactNode;
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://zemenacademy.com" },
      { "@type": "ListItem", position: 2, name: eyebrow, item: `https://zemenacademy.com${path}` },
    ],
  };

  return (
    <main id="main-content">
      <SiteHeader />
      <section className={`page-hero-wrap page-tone-${tone}`}>
        <div className="page-hero shell">
          <div className="page-hero-copy">
            <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div>
            <p className="eyebrow"><span /> {eyebrow}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <aside className="page-hero-card" aria-label={`${eyebrow} overview`}>
            <span className="page-orbit" aria-hidden="true" />
            <small>ZEMEN ACADEMY</small>
            <strong>{eyebrow}</strong>
            <div className="page-hero-lines" aria-hidden="true"><i /><i /><i /></div>
            {highlights.length > 0 && <ul>{highlights.map((item) => <li key={item}>{item}</li>)}</ul>}
          </aside>
        </div>
      </section>
      <article className={`prose shell prose-${tone}`}>{children}</article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SiteFooter />
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2><div>{children}</div></section>;
}
