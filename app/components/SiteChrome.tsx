import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { SiInstagram, SiTelegram, SiTiktok, SiYoutube } from "react-icons/si";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/premium", label: "Premium" },
  { href: "/help", label: "Help Center" },
  { href: "/about", label: "About" },
];

export function Brand() {
  return (
    <a className="brand" href="/" aria-label="Zemen Academy home">
      <Image src="/zemen-academy-logo.png" alt="" width={44} height={44} priority />
      <span>ZEMEN<small>ACADEMY</small></span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="nav-download" href="/download#official-download">Get the app</a>
          <details className="mobile-menu">
            <summary className="menu-toggle" aria-label="Open navigation menu"><span /><span /></summary>
            <div className="mobile-nav">
              <nav className="shell" aria-label="Mobile navigation">
                {navigation.map((item, index) => <a key={item.href} href={item.href}><span>0{index + 1}</span>{item.label}</a>)}
                <a className="mobile-download" href="/download#official-download">Download Android app</a>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <a className="footer-logo" href="/" aria-label="Zemen Academy home">
            <Image src="/zemen-academy-logo.png" alt="" width={48} height={48} />
          </a>
          <p>Focused, curriculum-aligned learning for Ethiopian secondary students.</p>
        </div>
        <div className="footer-links"><b>Explore</b><a href="/features">Features</a><a href="/premium">Premium</a><a href="/download#official-download">Download</a><a href="/about">About Zemen</a><a href="/help">Help Center</a></div>
        <div className="footer-links"><b>Legal & account</b><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a><a href="/account-deletion">Account deletion</a></div>
        <div className="footer-connect" aria-label="Connect with Zemen Academy">
          <b>Connect</b>
          <div className="footer-socials">
            <a href="https://t.me/zemen_academy" rel="me" aria-label="Zemen Academy on Telegram" title="Telegram"><SiTelegram aria-hidden="true" /></a>
            <a href="https://www.youtube.com/@ZemenAcademy" rel="me" aria-label="Zemen Academy on YouTube" title="YouTube"><SiYoutube aria-hidden="true" /></a>
            <a href="https://www.tiktok.com/@zemen_academy" rel="me" aria-label="Zemen Academy on TikTok" title="TikTok"><SiTiktok aria-hidden="true" /></a>
            <a href="https://www.instagram.com/zemen_academy" rel="me" aria-label="Zemen Academy on Instagram" title="Instagram"><SiInstagram aria-hidden="true" /></a>
            <a href="mailto:zemenacademy@gmail.com" aria-label="Email Zemen Academy" title="Email"><MdEmail aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Zemen Academy. Built for Ethiopian students.</span></div>
    </footer>
  );
}
