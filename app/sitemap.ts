import type { MetadataRoute } from "next";
import { ROUTES, SITE, absoluteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE.reviewedAt}T00:00:00+09:00`);

  return ROUTES.map((path, index) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
