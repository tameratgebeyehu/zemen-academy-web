import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Zemen Academy collects, uses, and protects student information." };

export default function PrivacyPage() {
  return <InfoPage eyebrow="Legal · Effective 8 August 2026" title="Privacy, explained clearly." intro="This policy describes the information Zemen Academy uses to operate the Android application and how students can control it.">
    <InfoSection title="Information we use"><p>We may process an account name and email, an optional Ethiopian mobile number, grade, stream, selected language, learning activity, quiz attempts, content downloads, device-installation identifiers, notification tokens, question reports, and Premium payment-verification details submitted by the student.</p></InfoSection>
    <InfoSection title="Why we use it"><p>We use this information to provide account access, synchronize progress, deliver the correct curriculum, support offline study, enforce the one-phone and one-tablet policy, verify Premium requests, deliver requested notifications, and investigate reported content.</p></InfoSection>
    <InfoSection title="Password and account security"><p>Passwords are stored as salted cryptographic hashes. Zemen Academy does not store readable passwords or bank login credentials. Session credentials are stored in protected device storage. Students should never send a password through Telegram, email, or a question report.</p></InfoSection>
    <InfoSection title="Sharing and advertising"><p>Zemen Academy does not sell student information and does not use personal information for third-party behavioral advertising. Technical providers may process limited information only where necessary to operate hosting, email, notifications, or the application.</p></InfoSection>
    <InfoSection title="Your choices"><p>Phone number and notifications are optional. Students can sign out, remove offline downloads, disable notifications, request correction of account information, or ask for account deletion. Some security and transaction records may be retained where reasonably necessary to prevent fraud or resolve disputes.</p></InfoSection>
    <InfoSection title="Contact"><p>For a privacy request, email <a href="mailto:zemenacademy@gmail.com?subject=Zemen%20Academy%20Privacy%20Request">zemenacademy@gmail.com</a> from the address connected to the account.</p></InfoSection>
  </InfoPage>;
}
