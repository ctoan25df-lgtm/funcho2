import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { SITE, absoluteUrl, jsonLd } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: "펀초주소 관찰 기록 | 펀초·펀초이스 공개 출처 점검",
    template: "%s | " + SITE.name,
  },
  description: SITE.description,
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: "펀초주소 관찰 기록 | 펀초·펀초이스 공개 출처 점검",
    description: SITE.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.koreanName }],
  },
  twitter: {
    card: "summary_large_image",
    title: "펀초주소 관찰 기록 | 펀초·펀초이스 공개 출처 점검",
    description: SITE.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": SITE.url + "/#website",
      url: SITE.url,
      name: SITE.name,
      alternateName: ["펀초주소 관찰실", "펀초 시그널"],
      description: SITE.description,
      inLanguage: SITE.language,
      dateModified: SITE.reviewedAt,
    },
    {
      "@type": "Organization",
      "@id": SITE.url + "/#publisher",
      name: SITE.owner,
      url: absoluteUrl("/editorial"),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(websiteSchema) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">본문으로 건너뛰기</a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
