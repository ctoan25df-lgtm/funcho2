import type { Metadata } from "next";

export const SITE = {
  name: "FUNCHO SIGNAL",
  koreanName: "펀초주소 관찰실",
  url: "https://funcho.yuheungpick.com",
  owner: "유흥픽 편집 데스크",
  reviewedAt: "2026-08-03",
  edition: "001",
  locale: "ko_KR",
  language: "ko-KR",
  description:
    "펀초주소와 펀초이스 관련 공개 페이지의 주장, 호스트, 확인일을 기록하고 공식성 여부를 분리해 보여주는 유흥픽 편집 데스크의 독립 관찰 사이트입니다.",
  alternativeUrl:
    "https://bamdalin.com/?utm_source=funcho.yuheungpick.com&utm_medium=referral&utm_campaign=funcho_signal",
  sources: [
    {
      label: "최신주소 바로가기 페이지",
      host: "funcholink.com",
      url: "https://www.funcholink.com/",
      observedAt: "2026-08-03",
      status: "공식성 미확인",
      note: "검색 결과에서 펀초이스 최신주소를 표방하는 제3자 페이지로 관찰했습니다.",
    },
    {
      label: "최신주소 안내 페이지",
      host: "funchodal.com",
      url: "https://www.funchodal.com/",
      observedAt: "2026-08-03",
      status: "공식성 미확인",
      note: "검색 결과에서 주소 안내를 표방하지만 운영 주체의 1차 공지 연결은 확인하지 못했습니다.",
    },
  ],
} as const;

export const ROUTES = [
  "/",
  "/address-ledger",
  "/name-map",
  "/change-signals",
  "/editorial",
] as const;

/** Canonical-safe absolute URL (no trailing slash; matches Next trailingSlash:false). */
export function absoluteUrl(path = "/"): string {
  if (!path || path === "/") return SITE.url;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const socialImage = absoluteUrl("/og.png");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: SITE.locale,
      siteName: SITE.name,
      url,
      title,
      description,
      images: [{ url: socialImage, width: 1200, height: 630, alt: SITE.koreanName }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export function breadcrumbSchema(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
