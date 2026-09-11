# 군위수서골프앤리조트 주중 이용권 결과물

GitHub: culeisure/gunwisuseogolfnresort (public, noindex). GitHub Pages는 `docs/` 폴더를 서비스합니다.

## 폴더

- `docs/` 웹사이트 (GitHub Pages 루트)
  - `ryu/`, `lee/` 주중 이용권 랜딩 (류성현 이사 / 이승재 팀장). 원본은 `_landing/template.html`, 생성은 `python docs/_landing/build.py`
  - `img/`, `landing.css`, `landing.js` 랜딩 공용 자산
  - `leaflet/` 리플렛 접지 시뮬레이터 (`fold/v7_ryu`, `fold/v7_lee`)
  - `index.html` 루트 진입 시 `leaflet/`로 이동
- `리플렛/` 3단접지 리플렛 (성원애드피아 규격 301x214, 도련 2mm)
  - `류성현_리플렛/`, `이승재_리플렛/` 인쇄소 입고용 최종 3파일 (글자 아웃라인 완료)
  - `군위수서_리플렛_아웃라인.zip` 위 두 세트 묶음
  - `작업버전/` v2~v7 작업 PDF, v7 4파일 세트, `폐기/`(v1 · v3 · v5 · v6 단일본, v8 세트)
- `배너/` X배너 600x1800
  - `군위수서CC_X배너_600x1800_시안.pdf`, `_시안.png` 확정 시안 (Codex 제작, 시안08)
  - `작업버전/claude_v1-v5/`, `작업버전/codex_시안02-07/`
- `_assets/` 로고 SVG · 지도 · 사진 원본, `leaflet_photos/` 리플렛·랜딩용 사진 원본
- `_build/` 제작 스크립트 (리플렛 `build_v2.py` → `outline_pack.py`, 시뮬레이터 `slice_fold.py`, X배너 `build_xbanner*.py`)

## 링크

- 랜딩 류성현 https://culeisure.github.io/gunwisuseogolfnresort/ryu/
- 랜딩 이승재 https://culeisure.github.io/gunwisuseogolfnresort/lee/
- 접지 시뮬레이터 https://culeisure.github.io/gunwisuseogolfnresort/leaflet/

## 규칙

- main에서 직접 작업하고 push한다 (2026-09-11 브랜치·워크트리 규칙 폐기).
- PDF, 이미지 결과물은 git에 넣지 않는다 (`.gitignore`).
