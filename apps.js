// Страницы платформ: фильтр по цене (если он есть) и подсветка карточки вслед за курсором
const cards = [...document.querySelectorAll(".app")];

// Цена — по метке Free, остальные приложения платные
const isFree = (card) => card.querySelector(".tag.free") !== null;
const priceTests = { all: () => true, paid: (card) => !isFree(card), free: isFree };
const priceChips = [...document.querySelectorAll(".chip[data-filter]")];
priceChips.forEach((chip) => {
  const test = priceTests[chip.dataset.filter];
  chip.querySelector("b").textContent = cards.filter(test).length;
  chip.addEventListener("click", () => {
    priceChips.forEach((other) => other.setAttribute("aria-pressed", String(other === chip)));
    cards.forEach((card) => { card.hidden = !test(card); });
    document.getElementById("empty").hidden = cards.some((card) => !card.hidden);
  });
});

cards.forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty("--x", `${e.clientX - box.left}px`);
    card.style.setProperty("--y", `${e.clientY - box.top}px`);
  });
});
