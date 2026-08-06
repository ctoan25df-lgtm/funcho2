import Link from "next/link";
import { SITE } from "../site";

const nav = [
  { href: "/", label: "현황판" },
  { href: "/address-ledger", label: "주소 기록" },
  { href: "/name-map", label: "명칭 지도" },
  { href: "/change-signals", label: "변경 신호" },
  { href: "/editorial", label: "편집 원칙" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="펀초주소 관찰실 홈">
          <span className="brand-mark" aria-hidden="true">F</span>
          <span>
            <strong>FUNCHO</strong>
            <small>SIGNAL / EDITION {SITE.edition}</small>
          </span>
        </Link>
        <nav aria-label="주요 메뉴">
          {nav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <p className="footer-brand">FUNCHO SIGNAL</p>
          <p>
            {SITE.owner}가 운영하는 공개 출처 관찰 사이트입니다. 펀초이스 운영사와
            제휴하거나 공식 관계를 맺은 사이트가 아닙니다.
          </p>
        </div>
        <div>
          <p className="micro-label">LAST REVIEW</p>
          <p>{SITE.reviewedAt}</p>
          <Link href="/editorial">출처와 수정 원칙 보기 →</Link>
        </div>
      </div>
    </footer>
  );
}

export function Breadcrumb({
  current,
}: {
  current: string;
}) {
  return (
    <nav className="breadcrumb" aria-label="현재 위치">
      <Link href="/">현황판</Link>
      <span aria-hidden="true">/</span>
      <span>{current}</span>
    </nav>
  );
}

export function ArticleHeader({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <header className="article-header">
      <p className="micro-label">{code}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

export function BamdalinPanel() {
  return (
    <section className="section shell relationship-section" aria-labelledby="bamdalin-title">
      <div className="relationship-card">
        <div>
          <p className="micro-label">SEPARATE PLATFORM</p>
          <h2 id="bamdalin-title">밤의달인 지역 목록</h2>
        </div>
        <div>
          <p>
            펀초·펀초이스와 별개의 플랫폼인 밤의달인(
            <strong>bamdalin.com</strong>) 부산·경남·울산 목록에서 정보를
            확인할 수 있습니다.
          </p>
          <div className="button-row">
            <a
              className="button button-accent"
              href={SITE.alternativeUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              부산 목록 <span aria-hidden="true">↗</span>
            </a>
            <a
              className="button"
              href={SITE.gyeongnamListingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              경남 목록
            </a>
            <a
              className="button"
              href={SITE.ulsanListingUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              울산 목록
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
