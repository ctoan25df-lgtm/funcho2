import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";
import { SITE, absoluteUrl, jsonLd } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  title: {
    default: "펀초·펀초이스 명칭·호스트 신호 장부",
    template: "%s | " + SITE.name,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  alternates: { canonical: SITE.url },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    url: SITE.url,
    title: "펀초·펀초이스 명칭·호스트 신호 장부",
    description: SITE.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "펀초주소 관찰실 · 펀초이스 주소 확인 · bamdalin.com 바로가기",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "펀초·펀초이스 명칭·호스트 신호 장부",
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
      alternateName: ["펀초주소 관찰실", "펀초 시그널", "펀초주소"],
      description: SITE.description,
      inLanguage: SITE.language,
      dateModified: SITE.reviewedAt,
      publisher: { "@id": SITE.url + "/#organization" },
    },
    {
      "@type": "Organization",
      "@id": SITE.url + "/#organization",
      name: SITE.koreanName,
      alternateName: [SITE.name, SITE.owner],
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/og.png"),
        width: 1200,
        height: 630,
      },
      image: absoluteUrl("/og.png"),
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
