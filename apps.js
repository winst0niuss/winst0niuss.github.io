// Страницы платформ: поиск и фильтр цены (если есть панель), подсветка карточки вслед за курсором
const cards = [...document.querySelectorAll(".app")];
const search = document.getElementById("search");

if (search) {
  // Цена — по метке Free, остальные приложения платные
  const isFree = (card) => card.querySelector(".tag.free") !== null;
  const priceTests = { all: () => true, paid: (card) => !isFree(card), free: isFree };
  const chips = [...document.querySelectorAll(".chip[data-filter]")];
  // Ищем по названию, главной фразе и пунктам карточки
  const texts = new Map(cards.map((card) => [card, card.querySelector(".app-copy").textContent.toLowerCase()]));
  let price = "all";

  const apply = () => {
    const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    cards.forEach((card) => {
      const visible = priceTests[price](card) && words.every((word) => texts.get(card).includes(word));
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    document.getElementById("result-count").textContent = `${shown} ${shown === 1 ? "app" : "apps"}`;
    document.getElementById("empty").hidden = shown > 0;
  };

  chips.forEach((chip) => {
    chip.querySelector("b").textContent = cards.filter(priceTests[chip.dataset.filter]).length;
    chip.addEventListener("click", () => {
      chips.forEach((other) => other.setAttribute("aria-pressed", String(other === chip)));
      price = chip.dataset.filter;
      apply();
    });
  });
  search.addEventListener("input", apply);
  document.getElementById("reset").addEventListener("click", () => {
    search.value = "";
    chips[0].click();
    search.focus();
  });
  apply();
}

cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty("--x", `${event.clientX - box.left}px`);
    card.style.setProperty("--y", `${event.clientY - box.top}px`);
  });
});
