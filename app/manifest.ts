import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zemen Academy",
    short_name: "Zemen",
    description: "Focused learning for Ethiopian students in Grades 9–12.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#11172a",
    icons: [{ src: "/zemen-academy-logo.png", sizes: "1024x1024", type: "image/png" }],
  };
}
