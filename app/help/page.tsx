import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "Help Center",
  description: "Get help with Zemen Academy accounts, passwords, device access, downloads, quizzes, notifications and Premium verification.",
  alternates: { canonical: "/help" },
  openGraph: { url: "/help", title: "Zemen Academy Help Center", description: "Quick answers for accounts, devices, quizzes, offline study and Premium access." },
};

const faqs = [
  { q: "Why is my new quiz not visible?", a: "Pull down on the Quizzes screen to synchronize content. The app also checks for newly published content automatically when it becomes active and when an announcement indicates that new content is available." },
  { q: "Can I study without internet?", a: "Yes. Open a published unit while online and download it once. The saved quiz can then be opened from Downloads without mobile data, subject to the account's access status." },
  { q: "How many devices can use one account?", a: "One student account can be linked to one phone and one tablet. If an old device is released by an administrator, retry sign-in from the replacement device." },
  { q: "How is Premium activated?", a: "Choose a plan in the app, transfer the exact amount to the selected bank, and submit the sender name. Zemen Academy manually verifies the transfer and notifies the student after approval." },
];

const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

export default function HelpPage() {
  return <><InfoPage eyebrow="Help Center" title="Answers without the runaround." intro="Find clear steps for the most common Zemen Academy account, device, study and Premium questions.">
    <div className="help-topics"><a href="#account"><b>Account</b><span>Sign-in and recovery</span></a><a href="#devices"><b>Devices</b><span>Phone and tablet access</span></a><a href="#study"><b>Study</b><span>Quizzes and downloads</span></a><a href="#premium"><b>Premium</b><span>Plans and verification</span></a></div>
    <InfoSection title="Account and password"><div id="account"><p>Use the exact email registered with the account. Android may offer to save and fill the password through Google Password Manager. If sign-in fails, check spelling and connectivity before requesting recovery. Never send your password to support.</p><p>Eligible students can request password recovery from the sign-in screen. Recovery messages are sent only to the registered email address.</p></div></InfoSection>
    <InfoSection title="Phone and tablet access"><div id="devices"><p>One student account may use one phone and one tablet. If an administrator releases an old device, retry sign-in on the replacement device. A released slot should become available without creating a new account.</p></div></InfoSection>
    <InfoSection title="Quizzes, downloads and syncing"><div id="study"><p>Published quizzes can be taken online without downloading. For offline study, download a unit once while connected. Pull down on the Quizzes screen to request an immediate content refresh.</p><p>Use <strong>Report issue</strong> inside a quiz when an answer, question or explanation appears incorrect. Offline reports wait safely and synchronize later.</p></div></InfoSection>
    <InfoSection title="Premium plans and verification"><div id="premium"><p>Premium requests are verified manually. Transfer the exact plan amount to the bank selected inside the app, submit the sender name and wait for an approval notification. Zemen Academy never asks for a bank password or PIN.</p></div></InfoSection>
    <InfoSection title="Frequently asked questions"><div className="faq-list">{faqs.map((faq) => <details key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>)}</div></InfoSection>
    <InfoSection title="Still need help?"><div className="contact-grid"><a className="contact-card" href="https://t.me/zemen_academy"><b>Telegram support</b><span>@zemen_academy</span></a><a className="contact-card" href="mailto:zemenacademy@gmail.com?subject=Zemen%20Academy%20Support"><b>Email support</b><span>zemenacademy@gmail.com</span></a></div></InfoSection>
  </InfoPage><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /></>;
}
