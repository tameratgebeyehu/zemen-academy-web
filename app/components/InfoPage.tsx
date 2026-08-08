import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main><SiteHeader /><section className="page-hero shell"><p className="eyebrow"><span /> {eyebrow}</p><h1>{title}</h1><p>{intro}</p></section><article className="prose shell">{children}</article><SiteFooter /></main>;
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return <section><h2>{title}</h2>{children}</section>;
}
