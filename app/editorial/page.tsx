import { ArticleHeader, Breadcrumb } from "../components/SiteChrome";
import { breadcrumbSchema, jsonLd, pageMetadata, SITE } from "../site";

export const metadata = pageMetadata({
  title: "운영자·출처·수정 원칙",
  description:
    "FUNCHO SIGNAL의 운영 주체, 공개 출처 확인 방식, 공식성 판정 기준, 업데이트와 정정 원칙을 안내합니다.",
  path: "/editorial",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      name: "FUNCHO SIGNAL 편집 원칙",
      url: SITE.url + "/editorial",
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      isPartOf: { "@id": SITE.url + "/#website" },
      publisher: { "@id": SITE.url + "/#organization" },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: SITE.url + "/og.png",
      },
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "편집 원칙", path: "/editorial" },
    ]),
  ],
};

export default function EditorialPage() {
  return (
    <main id="main" className="article-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <div className="shell">
        <Breadcrumb current="편집 원칙" />
        <ArticleHeader
          code="DESK 04 / EDITORIAL"
          title="누가 기록했고, 어떻게 판단했는지 공개합니다."
          description="주소 안내 페이지는 결론만큼 판단 과정이 중요합니다. 이 페이지는 운영 관계, 출처 선택, 수정 절차를 숨기지 않습니다."
        />

        <section className="principle-grid" aria-label="핵심 편집 원칙">
          <article><span>WHO</span><h2>유흥픽 편집 데스크</h2><p>FUNCHO SIGNAL은 {SITE.owner}가 운영합니다. 펀초이스의 공식 운영사나 제휴 사이트가 아닙니다.</p></article>
          <article><span>HOW</span><h2>주장과 근거 분리</h2><p>공개 검색에서 발견한 페이지의 문구를 기록하되, 운영권을 증명하는 1차 자료와 구분합니다.</p></article>
          <article><span>WHY</span><h2>오인 가능성 축소</h2><p>주소를 성급하게 확정하기보다 사용자가 확인된 사실과 남은 불확실성을 함께 볼 수 있게 합니다.</p></article>
        </section>

        <section className="article-section editorial-list" aria-labelledby="source-policy-title">
          <div>
            <p className="section-kicker">SOURCE POLICY</p>
            <h2 id="source-policy-title">출처 사용 순서</h2>
          </div>
          <ol>
            <li><span>1</span><p><strong>운영 주체의 1차 공지</strong>기존에 확인된 홈페이지나 공지 채널의 원문을 가장 먼저 봅니다.</p></li>
            <li><span>2</span><p><strong>기술적 연속성</strong>기존 주소의 리디렉션과 일관된 호스트 이동을 확인합니다.</p></li>
            <li><span>3</span><p><strong>복수 공개 출처</strong>서로 독립적인 자료가 같은 날짜와 목적지를 가리키는지 대조합니다.</p></li>
            <li><span>4</span><p><strong>제3자 주장</strong>‘공식’ 또는 ‘최신’이라는 자기소개는 참고하되 단독 증거로 쓰지 않습니다.</p></li>
          </ol>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="update-title">
          <div>
            <p className="section-kicker">UPDATE & CORRECTION</p>
            <h2 id="update-title">갱신과 정정</h2>
          </div>
          <div className="prose">
            <p>
              주소 관련 공개 자료가 달라지면 재확인 후 관찰일과 결론을 함께 수정합니다. 새 페이지가
              발견됐다는 이유만으로 기존 판정을 자동으로 바꾸지는 않습니다.
            </p>
            <p>
              사실 오류 정정 요청에는 확인 가능한 원문 주소, 게시 주체, 게시 날짜가 포함되어야 합니다.
              근거를 확인하면 무엇을 언제 변경했는지 아래 기록에 남깁니다.
            </p>
          </div>
        </section>

        <section className="change-log" aria-labelledby="log-title">
          <div><p className="micro-label">CHANGE LOG</p><h2 id="log-title">편집 기록</h2></div>
          <article><time dateTime="2026-08-03">2026.08.03</time><p><strong>Edition 001 공개</strong>두 개의 공개 호스트를 관찰하고 단일 공식 주소 확정을 보류했습니다.</p></article>
        </section>

        <aside className="relationship-disclosure">
          <p className="micro-label">CORRECTION POLICY</p>
          <h2>외부 목적지 판매 없이 기록합니다.</h2>
          <p>
            관찰 대상 원문은 판정 근거를 재현할 때만 표시합니다. 특정 플랫폼으로 보내기 위한
            유료·제휴 바로가기를 두지 않으며, 출처 상태가 바뀌면 확인일과 변경 이유를 함께 남깁니다.
          </p>
        </aside>
      </div>
    </main>
  );
}
