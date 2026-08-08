"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/help", label: "Help Center" },
  { href: "/about", label: "About" },
];

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Zemen Academy home">
      <Image src="/zemen-academy-logo.png" alt="" width={44} height={44} priority />
      <span>ZEMEN<small>ACADEMY</small></span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <div className="header-actions">
          <Link className="nav-download" href="/download">Get the app</Link>
          <button className="menu-toggle" type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((current) => !current)}>
            <span /><span />
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`}>
        <nav className="shell" aria-label="Mobile navigation">
          {navigation.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}><span>0{index + 1}</span>{item.label}</Link>)}
          <Link className="mobile-download" href="/download" onClick={() => setOpen(false)}>Download Android app</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand"><Brand /><p>Focused, curriculum-aligned learning for Ethiopian secondary students.</p></div>
        <div><b>Explore</b><Link href="/features">Features</Link><Link href="/download">Download</Link><Link href="/about">About Zemen</Link><Link href="/help">Help Center</Link></div>
        <div><b>Legal & account</b><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/account-deletion">Account deletion</Link></div>
        <div><b>Connect</b><a href="https://t.me/zemen_academy" rel="me">Telegram</a><a href="https://www.youtube.com/@ZemenAcademy" rel="me">YouTube</a><a href="https://www.tiktok.com/@zemen_academy" rel="me">TikTok</a><a href="https://www.instagram.com/zemen_academy" rel="me">Instagram</a></div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Zemen Academy. Built for Ethiopian students.</span><a href="mailto:zemenacademy@gmail.com">zemenacademy@gmail.com</a></div>
    </footer>
  );
}
