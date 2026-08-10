import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read the fair-use, account, Premium and educational content terms for Zemen Academy.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Terms of Use | Zemen Academy", description: "Fair rules that protect students, educational content and service reliability." },
};

export default function TermsPage() {
  return <InfoPage eyebrow="Terms of Use · Effective 8 August 2026" title="Fair rules for focused learning." intro="These terms protect students, educational content, and the reliability of Zemen Academy." path="/terms" tone="violet" highlights={["One account per student", "Personal educational use", "Clear Premium access periods"]}>
    <InfoSection title="Educational purpose"><p>Zemen Academy supports study and examination preparation. Questions and explanations may contain mistakes. Students should report questionable material and consult an official textbook or teacher when appropriate.</p></InfoSection>
    <InfoSection title="Account responsibility"><p>Keep account credentials private. One account is intended for one student and may be linked to one phone and one tablet. Sharing, reselling, scraping, copying, or bypassing access controls is not permitted.</p></InfoSection>
    <InfoSection title="Premium service"><p>Premium enrollment options vary by app version, distribution channel, and region. The Google Play version does not offer enrollment or direct students to a payment method; it only recognizes an entitlement already linked to the signed-in account. Active access begins and ends on the dates shown for that account and never renews automatically unless a future enrollment flow explicitly states otherwise.</p></InfoSection>
    <InfoSection title="Offline and educational content"><p>Downloaded questions, notes, explanations, and past papers are for the student&apos;s personal educational use. Republishing, selling, extracting, automating access to, or distributing Zemen Academy question banks is prohibited.</p></InfoSection>
    <InfoSection title="Fair exam behavior"><p>Exam Mode may use timing, attempt-exit and screen-protection rules to preserve a focused assessment experience. Students should review and accept the displayed rules before starting an attempt.</p></InfoSection>
    <InfoSection title="Availability and changes"><p>Internet access, Google services, Apps Script, hosting providers, and device conditions can temporarily affect online features. Zemen Academy may update features, content, pricing, and these terms while protecting already approved access periods.</p></InfoSection>
    <InfoSection title="Contact"><p>Questions about these terms can be sent to <a href="mailto:zemenacademy@gmail.com?subject=Zemen%20Academy%20Terms">zemenacademy@gmail.com</a>.</p></InfoSection>
    <div className="page-next"><div><span>RELATED POLICY</span><h2>Understand how your information is handled.</h2><p>The Privacy Policy explains the account, learning, device and Premium information used to operate Zemen Academy.</p></div><a className="button button-primary" href="/privacy">Read Privacy Policy</a></div>
  </InfoPage>;
}
