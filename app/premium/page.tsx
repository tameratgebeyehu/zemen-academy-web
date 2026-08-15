import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { PremiumPortal } from "./PremiumPortal";

export const metadata: Metadata = {
  title: "Premium Account Activation",
  description: "Activate or check Zemen Academy Premium through a simple, secure account flow for Ethiopian secondary students.",
  alternates: { canonical: "/premium" },
  openGraph: {
    url: "/premium",
    title: "Zemen Academy Premium Account Activation",
    description: "Choose an access period, complete a local transfer and track verification from one secure page.",
  },
};

const videoId = process.env.NEXT_PUBLIC_PREMIUM_GUIDE_VIDEO_ID?.trim();

export default function PremiumPage() {
  return (
    <main id="main-content" className="premium-page">
      <SiteHeader />
      <section className="premium-hero">
        <div className="shell premium-hero-inner">
          <div><p className="eyebrow light"><span /> Zemen Premium</p><h1>Complete access.<br /><em>One clear path.</em></h1><p>Choose your access period, complete one local transfer and track verification without sending private bank credentials.</p><div className="premium-trust"><span>✓ Same app account</span><span>✓ Local bank transfer</span><span>✓ Manual verification</span></div></div>
          <aside><span>EVERY PLAN INCLUDES</span><strong>Questions, explanations, notes, offline study, progress and entrance-exam preparation.</strong><small>No automatic renewal. Access dates appear after approval.</small></aside>
        </div>
      </section>

      <section className="shell premium-portal-section" id="activation">
        <PremiumPortal />
      </section>

      <section className="premium-guide-section" id="video-guide">
        <div className="shell premium-guide-grid">
          <div><p className="eyebrow light"><span /> Video walkthrough</p><h2>See the complete activation flow.</h2><p>The guide follows the same three steps shown above. It never asks for a password, bank PIN or full banking credentials.</p><ol><li><span>01</span>Choose a plan</li><li><span>02</span>Copy the verified bank account and transfer</li><li><span>03</span>Submit the sender name and track approval</li></ol></div>
          {videoId ? <div className="premium-video"><iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`} title="How to activate Zemen Academy Premium" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div> : <div className="premium-video-placeholder"><span>VIDEO GUIDE</span><strong>Your tutorial will appear here after it is published.</strong><p>Add the YouTube video ID to the website setting without changing this page.</p></div>}
        </div>
      </section>

      <section className="shell premium-safety"><div><span>KEEP YOUR ACCOUNT SAFE</span><h2>Zemen Academy will never ask for your bank PIN.</h2></div><p>Only transfer to an account displayed on this official domain. Your app password is used only to sign in, and payment approval is linked to the same student account.</p></section>
      <SiteFooter />
    </main>
  );
}
