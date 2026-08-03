import Link from "next/link";
import {
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "./site";

export const metadata = pageMetadata({
  title: "펀초주소 관찰 기록 | 펀초·펀초이스 공개 출처 점검",
  description:
    "펀초주소 검색 결과에 나타나는 호스트와 주장을 기록하고, 공식성 근거와 단순 안내 문구를 구분해 보여주는 공개 출처 관찰 기록입니다.",
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
    question: "현재 펀초주소는 어디인가요?",
    answer:
      "2026년 8월 3일 기준 공개 검색 결과에서는 서로 다른 두 호스트가 최신주소를 주장하고 있어 단일 공식 주소를 확정하지 않았습니다. 이 사이트는 확인되지 않은 주소를 공식 주소처럼 단정하지 않습니다.",
  },
  {
    question: "검색 결과 1위면 공식 사이트인가요?",
    answer:
      "아닙니다. 검색 순위는 공식 운영권을 증명하지 않습니다. 운영 주체의 1차 공지, 기존 채널의 연속성, 일관된 리디렉션 같은 별도 근거가 필요합니다.",
  },
  {
    question: "펀초와 펀초이스는 같은 뜻인가요?",
    answer:
      "검색 과정에서는 줄임말이나 연관어로 함께 쓰일 수 있지만, 이름이 비슷하다는 사실만으로 동일 운영 주체나 동일 서비스를 뜻하지는 않습니다.",
  },
  {
    question: "이 사이트가 펀초이스 공식 사이트인가요?",
    answer:
      "아닙니다. FUNCHO SIGNAL은 유흥픽 편집 데스크가 운영하는 독립적인 공개 출처 관찰 사이트이며 펀초이스 운영사와 공식 관계가 없습니다.",
  },
  {
    question: "밤의달인은 펀초이스의 새 주소인가요?",
    answer:
      "아닙니다. 밤의달인은 별개의 대안 플랫폼입니다. 이 사이트에서 제공하는 연결도 공식 주소가 아닌 별도 선택지로 표시합니다.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": SITE.url + "/#webpage",
      url: SITE.url,
      name: "펀초주소 관찰 기록",
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      isPartOf: { "@id": SITE.url + "/#website" },
      breadcrumb: { "@id": SITE.url + "/#breadcrumb" },
    },
    {
      ...breadcrumbSchema([{ name: "현황판", path: "/" }]),
      "@id": SITE.url + "/#breadcrumb",
    },
    {
      "@type": "FAQPage",
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
          <p className="eyebrow"><span>LIVE NOTE</span> 공개 출처 관찰 기록</p>
          <h1>펀초주소,<br /><em>확정 대신 근거를</em><br />남깁니다.</h1>
          <p className="hero-lede">
            검색 결과에 보이는 주소가 곧 공식 주소라는 뜻은 아닙니다. 호스트,
            페이지의 주장, 확인일, 1차 공지 여부를 분리해 기록합니다.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/address-ledger">주소 기록 열기</Link>
            <Link className="text-link" href="/editorial">판단 기준 먼저 보기 <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <aside className="signal-console" aria-label="현재 관찰 상태">
          <div className="console-top">
            <span>OBSERVATION / {SITE.edition}</span>
            <span className="live-dot">REVIEWED</span>
          </div>
          <div className="console-status">
            <p>현재 결론</p>
            <strong>단일 공식 주소<br />확정 보류</strong>
          </div>
          <dl className="console-grid">
            <div><dt>관찰 호스트</dt><dd>2</dd></div>
            <div><dt>1차 공식 공지</dt><dd>미확인</dd></div>
            <div><dt>최종 확인일</dt><dd>{SITE.reviewedAt}</dd></div>
            <div><dt>판정 방식</dt><dd>근거 분리</dd></div>
          </dl>
          <p className="console-caption">순위가 아니라 출처의 연속성을 봅니다.</p>
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

      <section className="section shell relationship-section" aria-labelledby="alternative-title">
        <div className="relationship-card">
          <div>
            <p className="micro-label">SEPARATE ALTERNATIVE</p>
            <h2 id="alternative-title">주소가 아니라<br />별도의 선택지입니다.</h2>
          </div>
          <div>
            <p>
              밤의달인은 펀초 또는 펀초이스의 새 주소가 아닙니다. 서로 다른 서비스라는
              점을 전제로, 다른 지역 정보를 찾는 이용자에게만 별도 대안으로 안내합니다.
            </p>
            <a className="button button-accent" href={SITE.alternativeUrl} rel="sponsored nofollow noopener noreferrer">
              밤의달인 별도 플랫폼 보기 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

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
