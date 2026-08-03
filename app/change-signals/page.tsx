import { ArticleHeader, BamdalinPanel, Breadcrumb } from "../components/SiteChrome";
import { breadcrumbSchema, jsonLd, pageMetadata, SITE } from "../site";

export const metadata = pageMetadata({
  title: "펀초주소 변경 신호 점검법",
  description:
    "펀초주소 변경 여부를 확인할 때 참고할 강한 신호와 오인하기 쉬운 약한 신호를 구분한 실용 점검표입니다.",
  path: "/change-signals",
});

const strong = [
  ["1차 공지", "기존에 확인된 운영 채널이 새 주소를 직접 발표합니다."],
  ["채널 교차 확인", "둘 이상의 기존 채널에서 동일한 새 주소와 시점을 안내합니다."],
  ["이동의 일관성", "이전 호스트가 일정 기간 같은 목적지로 안정적으로 연결됩니다."],
  ["역사적 연속성", "운영자 정보, 서비스 기록, 공지 방식이 시간상 자연스럽게 이어집니다."],
] as const;

const weak = [
  ["‘공식·최신’ 제목", "페이지 작성자가 넣을 수 있는 자기 주장입니다."],
  ["검색어 포함 도메인", "이름이 비슷해도 소유권과 운영권을 증명하지 않습니다."],
  ["검색 상위 노출", "관련성이나 노출 순위는 공식 관계의 증명서가 아닙니다."],
  ["복제된 안내 문구", "여러 페이지의 같은 문장이 하나의 원문을 반복한 것일 수 있습니다."],
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "펀초주소 변경 신호 점검법",
      description: metadata.description,
      dateModified: SITE.reviewedAt,
      inLanguage: SITE.language,
      step: [
        { "@type": "HowToStep", name: "주장 분리", text: "페이지가 말하는 주소와 실제 운영 근거를 분리합니다." },
        { "@type": "HowToStep", name: "1차 출처 확인", text: "기존 운영 채널이 직접 남긴 공지가 있는지 확인합니다." },
        { "@type": "HowToStep", name: "교차 검증", text: "다른 기존 채널과 주소 이동 기록이 같은 결론을 지지하는지 확인합니다." },
        { "@type": "HowToStep", name: "날짜 기록", text: "확인한 날짜와 아직 모르는 부분을 함께 기록합니다." },
      ],
    },
    breadcrumbSchema([
      { name: "현황판", path: "/" },
      { name: "변경 신호", path: "/change-signals" },
    ]),
  ],
};

export default function ChangeSignalsPage() {
  return (
    <main id="main" className="article-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <div className="shell">
        <Breadcrumb current="변경 신호" />
        <ArticleHeader
          code="DESK 03 / CHANGE SIGNALS"
          title="주소 변경은 하나의 문구보다 여러 신호로 확인합니다."
          description="‘최신주소’라는 문장 하나에 기대지 않고, 누가 말했는지와 시간상 연결이 자연스러운지를 함께 봅니다."
        />

        <section className="signal-columns" aria-label="강한 신호와 약한 신호 비교">
          <div className="signal-panel strong-panel">
            <div className="panel-heading"><span>＋</span><div><p>STRONG SIGNALS</p><h2>신뢰도를 높이는 근거</h2></div></div>
            <ol>
              {strong.map(([title, note], index) => (
                <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{note}</p></div></li>
              ))}
            </ol>
          </div>
          <div className="signal-panel weak-panel">
            <div className="panel-heading"><span>−</span><div><p>WEAK SIGNALS</p><h2>단독으로 부족한 근거</h2></div></div>
            <ol>
              {weak.map(([title, note], index) => (
                <li key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{note}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="article-section" aria-labelledby="flow-title">
          <p className="section-kicker">CHECK FLOW</p>
          <h2 id="flow-title">4단계 확인 순서</h2>
          <ol className="flow-list">
            <li><span>01</span><h3>주장을 분리합니다.</h3><p>페이지가 스스로 말하는 내용과 외부에서 검증된 사실을 나눕니다.</p></li>
            <li><span>02</span><h3>원문을 찾습니다.</h3><p>재인용 페이지보다 기존 운영 채널이 직접 남긴 공지를 우선합니다.</p></li>
            <li><span>03</span><h3>서로 맞춰봅니다.</h3><p>다른 기존 채널과 주소 이동 기록도 같은 결론을 지지하는지 봅니다.</p></li>
            <li><span>04</span><h3>날짜와 공백을 남깁니다.</h3><p>확인한 시점과 아직 모르는 정보를 함께 적어 과도한 확정을 피합니다.</p></li>
          </ol>
        </section>

        <aside className="warning-note">
          <strong>주의</strong>
          <p>주소를 확인하더라도 로그인 정보, 결제 정보, 개인식별정보를 입력하기 전에는 브라우저 보안 경고와 사이트 운영 정보를 별도로 확인하세요.</p>
        </aside>
      </div>
      <BamdalinPanel />
    </main>
  );
}
