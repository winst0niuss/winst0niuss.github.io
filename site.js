// Меню Apps по шаблону disclosure: кнопка открывает список, Esc и клик мимо закрывают
const menuButton = document.querySelector(".menu > button");
const menuPanel = document.getElementById(menuButton?.getAttribute("aria-controls"));

if (menuButton && menuPanel) {
  const setOpen = (open) => {
    menuButton.setAttribute("aria-expanded", String(open));
    menuPanel.hidden = !open;
  };
  menuButton.addEventListener("click", () => setOpen(menuPanel.hidden));
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || menuPanel.hidden) return;
    setOpen(false);
    menuButton.focus();
  });
  // Клик или фокус вне меню закрывают его
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".menu")) setOpen(false);
  });
  menuButton.parentElement.addEventListener("focusout", (event) => {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  });
}
