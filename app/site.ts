import type { Metadata } from "next";

export const SITE = {
  name: "FUNCHO SIGNAL",
  koreanName: "펀초주소 관찰실",
  url: "https://funcho.yuheungpick.com",
  owner: "유흥픽 편집 데스크",
  reviewedAt: "2026-08-12",
  edition: "001",
  locale: "ko_KR",
  language: "ko-KR",
  description:
    "펀초·펀초이스 명칭·호스트 신호 장부. 비슷한 검색어와 공개 페이지의 주장·호스트·확인일을 분리해 기록하고, 강한 변경 신호와 약한 신호를 구분해 공식성 단정을 피합니다.",
  sources: [
    {
      label: "최신주소 바로가기 페이지",
      host: "funcholink.com",
      url: "https://www.funcholink.com/",
      observedAt: "2026-08-12",
      status: "공식성 미확인",
      note: "정상 응답하며 스스로 펀초이스 최신주소 페이지라고 주장하지만, 운영 주체를 확인할 독립적인 1차 공지는 찾지 못했습니다.",
    },
    {
      label: "최신주소 안내 페이지",
      host: "funchodal.com",
      url: "https://www.funchodal.com/",
      observedAt: "2026-08-12",
      status: "후보 제외",
      note: "현재 만료 도메인 판매 페이지로 이동합니다. 펀초이스 주소 후보나 운영 연속성의 근거로 사용하지 않습니다.",
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
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "펀초주소 관찰실 · 펀초이스 공개 호스트 확인 기록",
        },
      ],
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
