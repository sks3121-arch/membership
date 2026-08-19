const memberships = [
  {
    title: "우지 리조트",
    date: "2026-08-19",
    category: "TEST MEMBERSHIP · SAMPLE",
    image: "assets/ob-course.jpg",
    alt: "우지 리조트 테스트 이미지",
    description: "새 회원권을 등록할 때의 화면과 카카오톡 공유 흐름을 확인하기 위한 테스트 상세 페이지입니다.",
    benefits: ["테스트용 상품 안내", "모바일 상세 페이지 확인", "전화·문자 상담 링크 연결"],
    href: "wooji/",
    linkText: "테스트 페이지 보기"
  },
  {
    title: "오션비치 골프앤리조트",
    date: "2026-08-01",
    category: "GOLF & RESORT MEMBERSHIP",
    image: "assets/ob-aerial.jpg",
    alt: "오션비치 골프앤리조트 전경",
    description: "동해 씨사이드 27홀과 전 객실 오션뷰 콘도미니엄을 하나의 회원권으로 누리세요.",
    benefits: ["씨사이드 27홀 · Par 108", "전 객실 오션뷰 콘도미니엄 58실", "밸리 · 골드 · 시그니처 · 프리미엄 라인"],
    href: "oceanbeach/",
    linkText: "상세 혜택 확인하기"
  }
];

const sortedMemberships = [...memberships].sort((a, b) => b.date.localeCompare(a.date));

function membershipCard(item, latest = false) {
  const latestClass = latest ? " is-latest" : "";
  const benefits = item.benefits.map((benefit) => `<li>${benefit}</li>`).join("");
  return `<article class="membership-item${latestClass}">
    <img src="${item.image}" alt="${item.alt}" />
    <div class="membership-item-copy">
      <p class="item-category">${item.category}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <ul>${benefits}</ul>
      <a class="item-link" href="${item.href}">${item.linkText} <span>→</span></a>
    </div>
  </article>`;
}

const latestContainer = document.querySelector("[data-membership-latest]");
if (latestContainer && sortedMemberships[0]) {
  latestContainer.innerHTML = membershipCard(sortedMemberships[0], true);
}

const listContainer = document.querySelector("[data-membership-list]");
if (listContainer) {
  listContainer.innerHTML = sortedMemberships.map((item, index) => membershipCard(item, index === 0)).join("");
}
