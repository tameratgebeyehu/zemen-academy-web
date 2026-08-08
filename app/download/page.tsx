import type { Metadata } from "next";
import { InfoPage, InfoSection } from "../components/InfoPage";

export const metadata: Metadata = { title: "Download", description: "Get the official Zemen Academy Android application." };

export default function DownloadPage() {
  return <InfoPage eyebrow="Android app" title="Take your study plan with you." intro="Get official Zemen Academy release announcements and APK instructions from the verified Telegram channel.">
    <div className="download-panel"><img src="/zemen-academy-logo.png" alt="Zemen Academy logo" /><h2>Zemen Academy for Android</h2><p>Grades 9–12 curriculum practice, offline quizzes, explanations, progress, study timetables, notifications, and Premium access in one focused application.</p><a className="button button-primary" href="https://t.me/zemen_academy">Open official Telegram channel ↗</a></div>
    <InfoSection title="Install safely"><ul><li>Download only from the official Zemen Academy Telegram channel or, when available, Google Play.</li><li>Do not install files reposted by unknown accounts.</li><li>Android may ask permission to install an APK from Telegram or your browser. Remove that permission again after installation.</li></ul></InfoSection>
    <InfoSection title="Version information"><p>The website will publish a direct verified APK link after the final release file and checksum are approved. Until then, Telegram remains the official distribution channel.</p></InfoSection>
  </InfoPage>;
}
