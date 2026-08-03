import type { MetadataRoute } from "next";
import { ROUTES, SITE, absoluteUrl } from "./site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path, index) => ({
    url: absoluteUrl(path),
    lastModified: new Date(SITE.reviewedAt + "T00:00:00+09:00"),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.75,
  }));
}
