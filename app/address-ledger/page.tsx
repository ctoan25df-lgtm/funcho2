import { ArticleHeader, BamdalinPanel, Breadcrumb } from "../components/SiteChrome";
import {
  breadcrumbSchema,
  jsonLd,
  pageMetadata,
  SITE,
} from "../site";

export const metadata = pageMetadata({
  title: "펀초주소 기록 원장",
  description:
    "펀초주소를 표방하는 공개 페이지의 호스트, 주장, 관찰일과 공식성 근거의 확인 여부를 기록한 출처 원장입니다.",
  path: "/address-ledger",
});

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      name: "펀초주소 기록 원장",
      url: SITE.url + "/address-ledger",
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "주소 기록", path: "/address-ledger" },
    ]),
  ],
};

export default function AddressLedgerPage() {
  return (
    <main id="main" className="article-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <div className="shell">
        <Breadcrumb current="주소 기록" />
        <ArticleHeader
          code="DESK 01 / ADDRESS LEDGER"
          title="펀초주소 기록 원장"
          description="검색 결과에서 발견한 페이지를 공식 주소로 단정하지 않고, 그 페이지가 무엇을 주장하는지와 무엇이 아직 증명되지 않았는지를 함께 적습니다."
        />

        <section className="verdict-banner" aria-label="현재 판정">
          <p>현재 판정</p>
          <strong>단일 공식 주소 확정 보류</strong>
          <span>기준일 {SITE.reviewedAt}</span>
        </section>

        <section className="article-section" aria-labelledby="ledger-title">
          <div className="section-kicker">OBSERVED SOURCES</div>
          <h2 id="ledger-title">공개 페이지 관찰표</h2>
          <div className="table-wrap">
            <table>
              <caption className="sr-only">펀초주소 관련 공개 페이지 출처 기록</caption>
              <thead>
                <tr>
                  <th scope="col">호스트</th>
                  <th scope="col">페이지가 내세우는 주장</th>
                  <th scope="col">관찰일</th>
                  <th scope="col">공식성 근거</th>
                </tr>
              </thead>
              <tbody>
                {SITE.sources.map((source) => (
                  <tr key={source.host}>
                    <td><a href={source.url} rel="nofollow noopener noreferrer">{source.host} ↗</a></td>
                    <td>{source.label}</td>
                    <td>{source.observedAt}</td>
                    <td><span className="status-tag">{source.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-footnote">
            이 표의 링크는 조사 재현을 위한 출처 표시입니다. 링크가 존재한다는 사실은 운영 주체,
            안전성, 최신성 또는 공식성을 보증하지 않습니다.
          </p>
        </section>

        <section className="article-section two-column-copy" aria-labelledby="snapshot-title">
          <div>
            <p className="section-kicker">SNAPSHOT</p>
            <h2 id="snapshot-title">관찰 기록과 공식 판정은 다릅니다.</h2>
          </div>
          <div className="prose">
            <p>
              검색 결과는 시점과 사용자 환경에 따라 달라집니다. 그래서 이 원장은 특정 날짜에
              보인 페이지와 그 문구를 기록하는 스냅샷으로 취급합니다. 검색 노출 자체는 운영권의
              증거가 아닙니다.
            </p>
            <p>
              공식 주소로 판단하려면 기존 운영 채널의 1차 공지, 이전 주소에서의 일관된 이동,
              장기간 이어진 브랜드·연락처 정보처럼 서로 교차 확인할 수 있는 근거가 필요합니다.
              현재 관찰한 두 페이지에서는 그 연속성을 확정하지 못했습니다.
            </p>
          </div>
        </section>

        <section className="article-section" aria-labelledby="evidence-title">
          <p className="section-kicker">EVIDENCE GAP</p>
          <h2 id="evidence-title">아직 확인이 필요한 것</h2>
          <div className="check-grid">
            <article><span>01</span><h3>운영 주체</h3><p>페이지 소유자와 기존 서비스 운영 주체가 동일하다는 검증 가능한 정보</p></article>
            <article><span>02</span><h3>1차 공지</h3><p>기존 공식 채널에서 새 주소를 직접 발표한 원문과 게시 시점</p></article>
            <article><span>03</span><h3>주소 연속성</h3><p>이전 주소, 공지 채널, 새 호스트 사이에 일관되게 이어지는 이동 경로</p></article>
            <article><span>04</span><h3>시간 검증</h3><p>짧은 기간의 검색 노출이 아니라 반복 관찰에서도 유지되는 정보</p></article>
          </div>
        </section>

        <aside className="update-note">
          <p className="micro-label">CORRECTION</p>
          <h2>근거가 바뀌면 판정도 바뀝니다.</h2>
          <p>확인 가능한 1차 공지나 정정 자료가 발견되면 출처와 변경일을 남긴 뒤 이 원장을 갱신합니다.</p>
        </aside>
      </div>
      <BamdalinPanel />
    </main>
  );
}
