import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = { title: "Help Center", description: "Help with Zemen Academy accounts, devices, downloads, quizzes, and Premium access." };

export default function HelpPage() {
  return <InfoPage eyebrow="Support" title="How can we help?" intro="Quick answers for accounts, devices, offline study, Premium verification, and quiz content.">
    <InfoSection title="Account and password"><p>Use the exact email registered with the account. Android may offer to save the password through the phone’s password manager. If sign-in fails, verify spelling and connectivity before requesting recovery. Never send your password to support.</p></InfoSection>
    <InfoSection title="Phone and tablet access"><p>One student account may use one phone and one tablet. If an administrator releases an old device, leave the device-access screen open—the app checks again automatically.</p></InfoSection>
    <InfoSection title="Downloads and offline study"><p>Open a published unit while online and download it once. Saved quizzes remain available without mobile data, subject to the account’s access status.</p></InfoSection>
    <InfoSection title="Premium verification"><p>Transfer the exact amount to the bank selected in the app, then submit the account-holder name. Zemen Academy manually matches the request and notifies the student after approval.</p></InfoSection>
    <InfoSection title="Incorrect or unclear questions"><p>Use <strong>Report issue</strong> inside a quiz. Reports can be saved while offline and sent when connectivity returns.</p></InfoSection>
    <InfoSection title="Contact support"><div className="contact-grid"><a className="contact-card" href="https://t.me/zemen_academy"><b>Telegram</b><span>@zemen_academy</span></a><a className="contact-card" href="mailto:zemenacademy@gmail.com"><b>Email</b><span>zemenacademy@gmail.com</span></a></div></InfoSection>
  </InfoPage>;
}
