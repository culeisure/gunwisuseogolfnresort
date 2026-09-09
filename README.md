# GUNWI SUSEO GOLF & RESORT

군위수서 골프앤리조트 주중이용권 안내 자료.

- 리플렛 접지 미리보기: `/leaflet/`

전 페이지 noindex 적용. 인쇄용 PDF와 빌드 소스는 저장소에 포함하지 않는다.

## 주중 이용권 랜딩 (SMS 발송용, 2026-09-09)

- 류성현 이사: https://culeisure.github.io/gunwisuseogolfnresort/ryu/
- 이승재 팀장: https://culeisure.github.io/gunwisuseogolfnresort/lee/
- 템플릿 `_landing/template.html`, 빌드 `python _landing/build.py` (루트에서) -> `ryu/`, `lee/` 생성
- 공용 `landing.css`, `landing.js`, 사진 `img/` (leaflet asset 원본을 webp로 최적화)
- 상품 내용은 `260827_주중이용권` C덱 안내문 기준 (주중 개인 2,150 / 가족 3,300 / 무기명 8,800)
- 검색엔진 차단(noindex + robots.txt). 접지 시뮬레이터 `/leaflet/`는 그대로 유지
