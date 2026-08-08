import Link from "next/link";

export function Brand() {
  return <Link className="brand" href="/"><img src="/zemen-academy-logo.png" alt="" /><span>ZEMEN<small>ACADEMY</small></span></Link>;
}

export function SiteHeader() {
  return <header className="site-header"><div className="shell header-inner"><Brand /><nav aria-label="Main navigation"><a href="/#inside">Features</a><Link href="/help">Help</Link><Link href="/privacy">Privacy</Link></nav><Link className="nav-download" href="/download">Get the app</Link></div></header>;
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-grid"><div><Brand /><p>Focused learning for Ethiopian students.</p></div><div><b>Product</b><Link href="/download">Download</Link><Link href="/help">Help Center</Link><a href="https://t.me/zemen_academy">Telegram</a></div><div><b>Legal</b><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms of Use</Link><Link href="/account-deletion">Account deletion</Link></div></div><div className="shell footer-bottom"><span>© 2026 Zemen Academy</span><a href="mailto:zemenacademy@gmail.com">zemenacademy@gmail.com</a></div></footer>;
}
