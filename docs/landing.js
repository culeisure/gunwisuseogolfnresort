/* =========================================================
   군위수서 주중 이용권 랜딩 - 동작 스크립트
   인트로 / 스크롤 리빌 / 진행바 / 헤더 / 트래킹
   ========================================================= */
(function () {
  "use strict";

  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("contextmenu", function (e) { e.preventDefault(); });

  /* 1) 인트로 (세션 첫 진입 1회) */
  (function () {
    var intro = document.getElementById("intro");
    if (!intro) return;
    var seen = false;
    try { seen = sessionStorage.getItem("gunwiIntro") === "1"; } catch (e) {}
    if (seen || reduce) {
      intro.classList.add("is-done");
      window.setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 100);
      return;
    }
    try { sessionStorage.setItem("gunwiIntro", "1"); } catch (e) {}
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(function () {
      intro.classList.add("is-done");
      document.documentElement.style.overflow = "";
      window.setTimeout(function () { if (intro.parentNode) intro.parentNode.removeChild(intro); }, 650);
    }, 1300);
  })();

  /* 2) 스크롤 리빌 */
  (function () {
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 0.07 + "s";
      io.observe(el);
    });
  })();

  /* 3) 진행바 + 헤더 */
  (function () {
    var bar = document.getElementById("progress");
    var head = document.getElementById("head");
    var lock = document.getElementById("lock");
    function onScroll() {
      var sc = window.scrollY || window.pageYOffset;
      if (bar) {
        var max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? (sc / max) * 100 : 0) + "%";
      }
      if (head) {
        var gate = lock ? lock.offsetHeight - 80 : 12;
        head.classList.toggle("is-stuck", sc > gate);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  })();

  /* 4) 전환 트래킹 (GA4 연결 시 gtag 사용) */
  (function () {
    function sendEvent(name, params) {
      try {
        if (typeof gtag === "function") gtag("event", name, params);
      } catch (e) {}
    }
    document.querySelectorAll("[data-track]").forEach(function (el) {
      el.addEventListener("click", function () {
        sendEvent(el.getAttribute("data-track"), {
          position: el.getAttribute("data-track-pos") || "unknown",
          href: el.getAttribute("href") || ""
        });
      });
    });
  })();

  /* 5) FAQ: 한 번에 하나만 열기 */
  (function () {
    document.querySelectorAll(".acc").forEach(function (acc) {
      acc.querySelectorAll("details").forEach(function (d) {
        d.addEventListener("toggle", function () {
          if (!d.open) return;
          acc.querySelectorAll("details[open]").forEach(function (o) { if (o !== d) o.open = false; });
        });
      });
    });
  })();

  /* 6) 사진 확대 모달: 갤러리 · 타일 · 풀폭 사진 */
  (function () {
    var imgs = Array.prototype.slice.call(document.querySelectorAll(".photo img, .gal img, .tile img, .full img"));
    if (!imgs.length) return;
    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-label", "사진 크게 보기");
    lb.innerHTML = '<span class="lightbox__cnt"></span><span class="lightbox__x" aria-label="닫기">&times;</span>' +
      '<span class="lightbox__nav lightbox__prev" aria-label="이전">&#8249;</span>' +
      '<img class="lightbox__img" alt="" />' +
      '<span class="lightbox__nav lightbox__next" aria-label="다음">&#8250;</span>' +
      '<div class="lightbox__cap"></div>';
    document.body.appendChild(lb);
    var big = lb.querySelector(".lightbox__img");
    var cap = lb.querySelector(".lightbox__cap");
    var cnt = lb.querySelector(".lightbox__cnt");
    var idx = 0;

    function caption(img) {
      var fc = img.parentNode && img.parentNode.querySelector("figcaption");
      if (fc) {
        var b = fc.querySelector("b");
        return b ? b.textContent.replace(/\s+/g, " ").trim() : fc.textContent.replace(/\s+/g, " ").trim();
      }
      return img.alt || "";
    }
    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      big.src = imgs[idx].currentSrc || imgs[idx].src;
      big.alt = imgs[idx].alt || "";
      cap.textContent = caption(imgs[idx]);
      cnt.textContent = (idx + 1) + " / " + imgs.length;
    }
    function open(i) {
      show(i);
      lb.classList.add("is-on");
      document.documentElement.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("is-on");
      document.documentElement.style.overflow = "";
    }
    imgs.forEach(function (img, i) {
      var target = img.closest("figure") || img;
      target.classList.add("zoomable");
      target.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lightbox__x").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target === big) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-on")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  })();
})();
