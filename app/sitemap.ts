import type { MetadataRoute } from "next";

const baseUrl = "https://zemenacademy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/features", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/download", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/help", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/account-deletion", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date("2026-08-08"),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
