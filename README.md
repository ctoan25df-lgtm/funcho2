# FUNCHO SIGNAL

`https://funcho.yuheungpick.com`에 배포하는 펀초주소 공개 출처 관찰 사이트입니다.

이 프로젝트는 펀초이스 공식 사이트를 사칭하거나 확인되지 않은 주소를 공식 주소로
단정하지 않습니다. 검색 결과에 나타나는 페이지의 주장, 호스트, 관찰일과 공식성
근거를 분리해 기록합니다.

## 기술 구성

- Next.js 16 App Router
- React 19
- OpenNext for Cloudflare Workers
- OpenAI Sites 배포 패키징

## 로컬 실행

```bash
npm install
npm run dev -- -p 3004
```

## 검증

개발 서버가 3004 포트에서 실행 중인 상태에서:

```bash
npm run lint
npm test
npm run build
npm run sites:package
```

다른 포트를 사용할 경우 `TEST_BASE_URL` 환경 변수를 지정합니다.

## 문서 경로

- `/` — 현재 관찰 현황
- `/address-ledger` — 공개 주소 출처 원장
- `/name-map` — 관련 명칭 구분
- `/change-signals` — 주소 변경 판단 신호
- `/editorial` — 운영자, 출처 및 정정 원칙
