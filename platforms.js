// Карточки приложений берутся со страниц платформ: новое приложение попадает в счётчики и карусель само
const PLATFORM_PAGES = ["wix", "shopify", "monday"];

const loadPlatforms = () => Promise.all(PLATFORM_PAGES.map(async (slug) => {
  const response = await fetch(`${slug}.html`);
  if (!response.ok) throw new Error(`${slug}.html: ${response.status}`);
  const page = new DOMParser().parseFromString(await response.text(), "text/html");
  return { slug, name: page.querySelector("main").dataset.platform, cards: [...page.querySelectorAll(".app")] };
}));

// Число приложений на плитках платформ
const showCounts = (platforms) => {
  platforms.forEach(({ slug, cards }) => {
    const count = document.querySelector(`[data-count="${slug}"]`);
    if (count) count.textContent = `${cards.length} ${cards.length === 1 ? "app" : "apps"}`;
  });
};
