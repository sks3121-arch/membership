const memberships = [
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

if (typeof document !== "undefined") {
  const latestContainer = document.querySelector("[data-membership-latest]");
  if (latestContainer && sortedMemberships[0]) {
    latestContainer.innerHTML = membershipCard(sortedMemberships[0], true);
  }

  if (document.body.dataset.latestSharingPage === "true" && sortedMemberships[0]) {
    const latest = sortedMemberships[0];
    const title = `${latest.title} | 신규 회원권 안내`;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", `${latest.title} 신규 회원권 안내｜모집 조건과 상담 방법을 확인하세요.`);
  }

  const listContainer = document.querySelector("[data-membership-list]");
  if (listContainer) {
    listContainer.innerHTML = sortedMemberships.map((item, index) => membershipCard(item, index === 0)).join("");
  }
}

if (typeof module !== "undefined") {
  module.exports = { memberships };
}
