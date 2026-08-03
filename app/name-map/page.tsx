import { ArticleHeader, BamdalinPanel, Breadcrumb } from "../components/SiteChrome";
import { breadcrumbSchema, jsonLd, pageMetadata, SITE } from "../site";

export const metadata = pageMetadata({
  title: "펀초·펀초이스 명칭 지도",
  description:
    "펀초, 펀초이스, 펀초주소 등 비슷하게 쓰이는 검색 명칭을 구분하고 이름과 공식성 증거의 차이를 설명합니다.",
  path: "/name-map",
});

const names = [
  {
    term: "펀초이스",
    kind: "브랜드형 명칭",
    note: "서비스 이름을 지칭하려는 검색에서 쓰입니다. 같은 이름을 쓴 페이지가 모두 같은 운영 주체라는 뜻은 아닙니다.",
  },
  {
    term: "펀초",
    kind: "줄임말형 명칭",
    note: "펀초이스를 줄여 찾거나 비슷한 이름의 페이지를 탐색할 때 쓰이는 표현입니다.",
  },
  {
    term: "펀초주소",
    kind: "탐색 의도형 검색어",
    note: "현재 접속 가능한 위치를 찾으려는 의도가 강합니다. 검색 결과의 순위는 공식성을 판정하지 않습니다.",
  },
  {
    term: "뉴펀초이스",
    kind: "변경 암시형 명칭",
    note: "새 주소나 새 운영을 암시할 수 있지만, 이름에 ‘뉴’가 포함된 것만으로 이전 서비스와의 연속성이 생기지는 않습니다.",
  },
  {
    term: "기타스토리·우회",
    kind: "주변 문맥형 표현",
    note: "안내 페이지나 재전송 페이지가 사용하는 표현입니다. 최종 목적지와 운영 관계를 따로 확인해야 합니다.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTermSet",
      name: "펀초·펀초이스 명칭 지도",
      url: SITE.url + "/name-map",
      dateModified: SITE.reviewedAt,
      hasDefinedTerm: names.map((item) => ({
        "@type": "DefinedTerm",
        name: item.term,
        description: item.note,
      })),
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "명칭 지도", path: "/name-map" },
    ]),
  ],
};

export default function NameMapPage() {
  return (
    <main id="main" className="article-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <div className="shell">
        <Breadcrumb current="명칭 지도" />
        <ArticleHeader
          code="DESK 02 / NAME MAP"
          title="비슷한 이름을 같은 운영자로 보지 않습니다."
          description="검색어는 이용자의 의도를 보여주는 단서입니다. 하지만 브랜드 소유권이나 사이트 간 공식 관계를 증명하는 자료는 아닙니다."
        />

        <section className="name-map" aria-label="관련 명칭 분류">
          {names.map((item, index) => (
            <article key={item.term}>
              <span className="map-index">0{index + 1}</span>
              <div>
                <p>{item.kind}</p>
                <h2>{item.term}</h2>
              </div>
              <p>{item.note}</p>
            </article>
          ))}
        </section>

        <section className="article-section two-column-copy" aria-labelledby="reading-title">
          <div>
            <p className="section-kicker">HOW TO READ</p>
            <h2 id="reading-title">명칭은 단서,<br />관계는 검증 대상</h2>
          </div>
          <div className="prose">
            <p>
              도메인이나 페이지 제목에 ‘펀초’, ‘공식’, ‘최신’이 포함돼도 그 문구는 해당 페이지가
              스스로 내세우는 주장일 뿐입니다. 운영 주체가 다른 페이지도 같은 검색어를 사용할 수 있습니다.
            </p>
            <p>
              따라서 이 사이트는 이름을 발견 단계에만 사용하고, 기존 채널의 공지·주소 이동의
              연속성·운영자 정보처럼 독립적으로 확인 가능한 근거를 판정 단계에 사용합니다.
            </p>
          </div>
        </section>

        <section className="comparison-strip" aria-labelledby="compare-title">
          <p className="micro-label">DO NOT MERGE</p>
          <h2 id="compare-title">함께 검색된다는 것과 같은 서비스라는 것은 다릅니다.</h2>
          <div>
            <p><span>검색어</span>사용자가 입력한 표현</p>
            <b aria-hidden="true">≠</b>
            <p><span>공식 관계</span>검증 가능한 운영 연속성</p>
          </div>
        </section>
      </div>
      <BamdalinPanel />
    </main>
  );
}
