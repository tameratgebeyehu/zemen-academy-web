import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main id="main-content">
      <SiteHeader />
      <section className="page-hero shell">
        <div className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{eyebrow}</span></div>
        <p className="eyebrow"><span /> {eyebrow}</p>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <article className="prose shell">{children}</article>
      <SiteFooter />
    </main>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2><div>{children}</div></section>;
}
