import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: "Request deletion of a Zemen Academy account and associated learning data without sending a password or identity document.",
  alternates: { canonical: "/account-deletion" },
  openGraph: { url: "/account-deletion", title: "Account Deletion | Zemen Academy", description: "Simple steps for requesting account and data deletion." },
};

export default function AccountDeletionPage() {
  return <InfoPage eyebrow="Account control" title="Request account deletion." intro="Students can request deletion without sending a password, payment credential, bank information or identity document." path="/account-deletion" tone="orange" highlights={["Request by registered email", "No password or bank data needed", "Confirmation is sent by email"]}>
    <div className="legal-summary"><b>Never include your password</b><p>Zemen Academy will verify ownership through the registered email address. Support will never ask you to send a password.</p></div>
    <InfoSection title="How to submit the request"><ol className="numbered-list"><li><span>1</span><div>Email <a href="mailto:zemenacademy@gmail.com?subject=Delete%20my%20Zemen%20Academy%20account">zemenacademy@gmail.com</a> from the email address registered in the app.</div></li><li><span>2</span><div>Use the subject <strong>Delete my Zemen Academy account</strong>.</div></li><li><span>3</span><div>Include the account name and registered email. Do not include a password.</div></li><li><span>4</span><div>Zemen Academy will verify account ownership and confirm the request by email.</div></li></ol></InfoSection>
    <InfoSection title="What is deleted"><p>The active account, profile preferences, saved server-side progress, notification tokens, and active device associations will be removed or anonymized as appropriate.</p></InfoSection>
    <InfoSection title="What may be retained"><p>Limited payment-audit, security, fraud-prevention, or content-report records may be retained where reasonably necessary. These records are not used to reactivate the deleted account.</p></InfoSection>
    <InfoSection title="Data stored on the phone"><p>After confirmation, uninstalling Zemen Academy removes its remaining local downloads and preferences from that device.</p></InfoSection>
    <div className="deletion-action"><div><span>READY TO SEND THE REQUEST?</span><h2>Use your registered email address.</h2><p>The email subject is prepared for you. Add your account name and registered email, then send it—without a password.</p></div><a className="button button-primary" href="mailto:zemenacademy@gmail.com?subject=Delete%20my%20Zemen%20Academy%20account">Prepare deletion email</a></div>
  </InfoPage>;
}
