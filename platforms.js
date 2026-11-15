// Карточки приложений берутся со страниц платформ: новое приложение попадает в плитки и карусель само
const PLATFORM_PAGES = ["wix", "shopify", "monday"];
const STACK_SIZE = 5;

const loadPlatforms = () => Promise.all(PLATFORM_PAGES.map(async (slug) => {
  const response = await fetch(`${slug}.html`);
  if (!response.ok) throw new Error(`${slug}.html: ${response.status}`);
  const page = new DOMParser().parseFromString(await response.text(), "text/html");
  return { slug, name: page.querySelector("main").dataset.platform, cards: [...page.querySelectorAll(".app")] };
}));

// Плитки платформ: число приложений и стопка их иконок
const fillPlatformCards = (platforms) => {
  platforms.forEach(({ slug, cards }) => {
    const count = document.querySelector(`[data-count="${slug}"]`);
    if (count) count.textContent = `${cards.length} ${cards.length === 1 ? "app" : "apps"}`;

    const stack = document.querySelector(`[data-icons="${slug}"]`);
    if (!stack) return;
    const icons = cards.map((card) => card.querySelector(".app-top img")?.getAttribute("src")).filter(Boolean);
    icons.slice(0, STACK_SIZE).forEach((src) => {
      const icon = document.createElement("img");
      icon.src = src;
      icon.alt = "";
      icon.width = 34;
      icon.height = 34;
      icon.loading = "lazy";
      stack.append(icon);
    });
    if (icons.length > STACK_SIZE) {
      const more = document.createElement("span");
      more.textContent = `+${icons.length - STACK_SIZE}`;
      stack.append(more);
    }
  });
};
