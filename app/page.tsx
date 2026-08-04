import Link from "next/link";
import { BamdalinPanel } from "./components/SiteChrome";
import {
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "./site";

export const metadata = pageMetadata({
  title: "펀초·펀초이스 명칭·호스트 신호 장부",
  description: SITE.description,
  path: "/",
});

const desks = [
  {
    number: "01",
    title: "주소 기록",
    description: "관찰한 호스트, 페이지의 주장, 확인일과 아직 확인되지 않은 근거를 한 줄씩 남깁니다.",
    href: "/address-ledger",
  },
  {
    number: "02",
    title: "명칭 지도",
    description: "펀초, 펀초이스, 펀초주소처럼 비슷하게 쓰이는 검색어를 소유권 증거와 분리해 정리합니다.",
    href: "/name-map",
  },
  {
    number: "03",
    title: "변경 신호",
    description: "주소 변경을 판단할 때 강한 신호와 약한 신호를 구분하는 점검표를 제공합니다.",
    href: "/change-signals",
  },
  {
    number: "04",
    title: "편집 원칙",
    description: "누가, 어떤 출처를, 왜 기록하는지와 수정 요청 처리 방법을 공개합니다.",
    href: "/editorial",
  },
] as const;

const faqs = [
  {
    question: "현재 펀초주소를 이 장부에서 단정하나요?",
    answer:
      "하지 않습니다. 공개 검색·안내 페이지에 서로 다른 호스트가 보이면 주장·호스트·확인일만 기록하고, 운영 주체 1차 공지와 채널 연속성이 맞기 전에는 공식 주소로 올리지 않습니다.",
  },
  {
    question: "검색 결과 1위면 공식 사이트인가요?",
    answer:
      "아닙니다. 검색 순위는 공식 운영권을 증명하지 않습니다. 운영 주체의 1차 공지, 기존 채널의 연속성, 일관된 리디렉션 같은 별도 근거가 필요합니다.",
  },
  {
    question: "펀초와 펀초이스는 같은 뜻인가요?",
    answer:
      "검색어로는 함께 쓰이지만, 명칭 지도에서는 줄임말·브랜드명·실제 호스트를 분리합니다. 이름이 비슷하다는 사실만으로 동일 운영 주체나 동일 서비스를 뜻하지 않습니다.",
  },
  {
    question: "밤의달인(bamdalin.com)은 펀초 공식 주소인가요?",
    answer:
      "아닙니다. 이 사이트는 펀초·펀초이스 명칭·호스트 신호만 기록하고, 밤의달인은 별도 공개 목록 플랫폼입니다. 신호 장부의 미확정 상태를 외부 목록 링크로 덮지 마세요.",
  },
  {
    question: "이 사이트가 펀초이스 공식 사이트인가요?",
    answer:
      "아닙니다. FUNCHO SIGNAL은 유흥픽 편집 데스크가 운영하는 독립 신호 장부이며 펀초이스 운영사와 공식 관계가 없습니다.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": SITE.url + "/#webpage",
      url: SITE.url,
      name: "펀초·펀초이스 명칭·호스트 신호 장부",
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      isPartOf: { "@id": SITE.url + "/#website" },
      breadcrumb: { "@id": SITE.url + "/#breadcrumb" },
      about: [
        { "@type": "Thing", name: "펀초 명칭 지도" },
        { "@type": "Thing", name: "펀초이스 호스트 신호" },
        { "@type": "Thing", name: "펀초주소 변경 신호" },
      ],
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: SITE.url + "/og.png",
      },
    },
    {
      ...breadcrumbSchema([{ name: "현황판", path: "/" }]),
      "@id": SITE.url + "/#breadcrumb",
    },
    {
      "@type": "ItemList",
      name: "펀초주소 관찰 데스크",
      itemListElement: desks.map((desk, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: desk.title,
        url: SITE.url + desk.href,
        description: desk.description,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": SITE.url + "/#faq",
      mainEntity: faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
      />

      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span>LIVE NOTE</span> 공개 출처 관찰 기록 · {SITE.reviewedAt}</p>
          <h1>펀초·펀초이스<br /><em>명칭·호스트 신호 장부</em></h1>
          <p className="hero-lede">
            비슷한 검색어와 공개 안내 페이지의 주장·호스트·확인일을 분리해
            기록합니다. 강한 변경 신호와 약한 신호를 구분해, 확인되지 않은
            주소를 공식처럼 단정하지 않습니다.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/name-map">
              명칭 지도 보기
            </Link>
            <Link className="button button-accent" href="/address-ledger">
              호스트 기록 보기
            </Link>
            <a
              className="button button-accent"
              href={SITE.alternativeUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              밤의달인 공개 목록 보기
            </a>
          </div>
        </div>

        <aside className="signal-console" aria-label="현재 관찰 상태">
          <div className="console-top">
            <span>OBSERVATION / {SITE.edition}</span>
            <span className="live-dot">REVIEWED</span>
          </div>
          <div className="console-status">
            <p>펀초주소 바로가기</p>
            <strong>bamdalin.com</strong>
          </div>
          <dl className="console-grid">
            <div><dt>바로가기</dt><dd>bamdalin.com</dd></div>
            <div><dt>확인 기준</dt><dd>출처 · 호스트 · 확인일</dd></div>
            <div><dt>최종 확인일</dt><dd>{SITE.reviewedAt}</dd></div>
            <div><dt>관계</dt><dd>별개 플랫폼</dd></div>
          </dl>
          <p className="console-caption">
            펀초주소 최신 연결은 밤의달인(bamdalin.com) 바로가기로 엽니다.
          </p>
          <a
            href={SITE.alternativeUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            bamdalin.com 바로가기 →
          </a>
        </aside>
      </section>

      <section className="ticker" aria-label="관찰 원칙">
        <div>
          <span>HOST ≠ OWNER</span><b>•</b><span>RANK ≠ OFFICIAL</span><b>•</b>
          <span>CLAIM ≠ PROOF</span><b>•</b><span>DATE THE EVIDENCE</span>
        </div>
      </section>

      <section className="section shell" aria-labelledby="source-title">
        <div className="section-heading split-heading">
          <div>
            <p className="micro-label">SOURCE WATCH / 2026.08.03</p>
            <h2 id="source-title">지금 확인되는 공개 페이지</h2>
          </div>
          <p>아래는 공식 주소 목록이 아니라, 검색 결과에서 관찰한 페이지의 스냅샷입니다.</p>
        </div>
        <div className="source-grid">
          {SITE.sources.map((source, index) => (
            <article className="source-card" key={source.host}>
              <div className="source-index">0{index + 1}</div>
              <div>
                <p className="status-tag">{source.status}</p>
                <h3>{source.host}</h3>
                <p>{source.note}</p>
                <dl className="source-meta">
                  <div><dt>페이지 주장</dt><dd>{source.label}</dd></div>
                  <div><dt>확인일</dt><dd>{source.observedAt}</dd></div>
                </dl>
                <a href={source.url} rel="nofollow noopener noreferrer">원문 페이지 확인 <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <p className="source-note">※ 원문 링크는 관찰 대상 확인용이며, 해당 페이지의 공식성이나 안전성을 보증하지 않습니다.</p>
      </section>

      <section className="section section-ink" aria-labelledby="desk-title">
        <div className="shell">
          <div className="section-heading inverse-heading">
            <p className="micro-label">THE FOUR DESKS</p>
            <h2 id="desk-title">주소 하나보다<br />판단 구조를 먼저 봅니다.</h2>
          </div>
          <div className="desk-grid">
            {desks.map((desk) => (
              <Link href={desk.href} className="desk-card" key={desk.href}>
                <span>{desk.number}</span>
                <h3>{desk.title}</h3>
                <p>{desk.description}</p>
                <b aria-hidden="true">→</b>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BamdalinPanel />

      <section className="section shell faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <p className="micro-label">QUICK ANSWERS</p>
          <h2 id="faq-title">먼저 확인할 질문</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary><span>0{index + 1}</span>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
