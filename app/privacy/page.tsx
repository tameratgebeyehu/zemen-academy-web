import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn what information Zemen Academy uses, why it is needed and how Ethiopian students can control their account data.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy Policy | Zemen Academy", description: "A clear explanation of how Zemen Academy handles student information." },
};

export default function PrivacyPage() {
  return <InfoPage eyebrow="Privacy Policy · Effective 8 August 2026" title="Privacy, explained clearly." intro="This policy describes the information Zemen Academy uses to operate the Android application and how students can control it." path="/privacy" tone="blue" highlights={["No sale of student data", "Passwords are never readable", "Deletion requests are supported"]}>
    <div className="legal-summary"><b>The short version</b><p>We use only the information needed to run accounts, learning, security, notifications and Premium verification. We do not sell student information or store readable passwords.</p></div>
    <nav className="policy-nav" aria-label="Privacy policy sections"><a href="#information">Information</a><a href="#security">Security</a><a href="#choices">Your choices</a><a href="#contact">Contact</a></nav>
    <InfoSection title="Information we use"><div id="information"><p>We may process an account name and email, an optional Ethiopian mobile number, grade, stream, selected language, learning activity, quiz attempts, content downloads, device-installation identifiers, notification tokens, question reports, and Premium payment-verification details submitted by the student.</p><div className="data-grid"><div><b>Account</b><span>Name, email, optional phone, grade and stream</span></div><div><b>Learning</b><span>Attempts, scores, progress, goals and downloads</span></div><div><b>Device</b><span>Installation identifier, device class and notification token</span></div><div><b>Premium</b><span>Selected plan, sender name and verification status</span></div></div></div></InfoSection>
    <InfoSection title="Why we use it"><p>We use this information to provide account access, synchronize progress, deliver the correct curriculum, support offline study, enforce the one-phone and one-tablet policy, verify Premium requests, deliver requested notifications, and investigate reported content.</p></InfoSection>
    <InfoSection title="Password and account security"><div id="security"><p>Passwords are stored as salted cryptographic hashes. Zemen Academy does not store readable passwords or bank login credentials. Session credentials are stored in protected device storage. Students should never send a password through Telegram, email, or a question report.</p></div></InfoSection>
    <InfoSection title="Sharing and advertising"><p>Zemen Academy does not sell student information and does not use personal information for third-party behavioral advertising. Technical providers may process limited information only where necessary to operate hosting, email, notifications, or the application.</p></InfoSection>
    <InfoSection title="Notifications and device permissions"><p>Notification permission is optional and can be changed in Android settings. The app may use local storage to keep downloaded quizzes and preferences. Zemen Academy does not request access to unrelated personal photos, contacts or files.</p></InfoSection>
    <InfoSection title="Retention and deletion"><p>Account and learning data is kept while the account is active or as reasonably necessary to provide the service. Students may request deletion. Limited payment-audit, security, fraud-prevention or dispute records may be retained where necessary.</p></InfoSection>
    <InfoSection title="Your choices"><div id="choices"><p>Phone number and notifications are optional. Students can sign out, remove offline downloads, disable notifications, request correction of account information, or ask for account deletion through the <a href="/account-deletion">account deletion page</a>.</p></div></InfoSection>
    <InfoSection title="Contact"><div id="contact"><p>For a privacy request, email <a href="mailto:zemenacademy@gmail.com?subject=Zemen%20Academy%20Privacy%20Request">zemenacademy@gmail.com</a> from the address connected to the account.</p></div></InfoSection>
    <div className="page-next"><div><span>ACCOUNT CONTROL</span><h2>Want your Zemen Academy account removed?</h2><p>Read the deletion process, what is removed and what limited records may need to remain.</p></div><a className="button button-primary" href="/account-deletion">Deletion instructions</a></div>
  </InfoPage>;
}
