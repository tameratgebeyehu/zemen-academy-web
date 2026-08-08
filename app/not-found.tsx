import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export default function NotFound() {
  return <main id="main-content"><SiteHeader /><section className="not-found shell"><p className="eyebrow"><span /> 404</p><h1>This page is not in the study plan.</h1><p>The link may be outdated, or the page may have moved.</p><div><Link className="button button-primary" href="/">Return home</Link><Link className="button button-secondary" href="/help">Visit Help Center</Link></div></section><SiteFooter /></main>;
}
