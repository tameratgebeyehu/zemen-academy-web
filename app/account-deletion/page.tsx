import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = { title: "Account Deletion", description: "How to request deletion of a Zemen Academy account and associated data." };

export default function AccountDeletionPage() {
  return <InfoPage eyebrow="Account control" title="Request account deletion." intro="Students can request deletion without sending a password, payment credential, or identity document.">
    <InfoSection title="How to submit the request"><ol><li>Email <a href="mailto:zemenacademy@gmail.com?subject=Delete%20my%20Zemen%20Academy%20account">zemenacademy@gmail.com</a> from the email address registered in the app.</li><li>Use the subject “Delete my Zemen Academy account.”</li><li>Include the account name and registered email. Do not include a password.</li><li>Zemen Academy will verify account ownership and confirm the request by email.</li></ol></InfoSection>
    <InfoSection title="What is deleted"><p>The active account, profile preferences, saved server-side progress, notification tokens, and active device associations will be removed or anonymized as appropriate.</p></InfoSection>
    <InfoSection title="What may be retained"><p>Limited payment-audit, security, fraud-prevention, or content-report records may be retained where reasonably necessary. These records are not used to reactivate the deleted account.</p></InfoSection>
    <InfoSection title="Data stored on the phone"><p>After confirmation, uninstalling Zemen Academy removes its remaining local downloads and preferences from that device.</p></InfoSection>
  </InfoPage>;
}
