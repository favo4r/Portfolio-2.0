/* Project filter buttons (projects.html)
   Each button has data-filter="all" | "creative-design" | "web-dev" | ...
   Each card has data-category="..." – matching cards show, the rest get .is-hidden */
(function () {
  var filterBar = document.querySelector(".project-filter");
  var cards = document.querySelectorAll(".project-card");
  if (!filterBar || !cards.length) return;

  var buttons = filterBar.querySelectorAll("button[data-filter]");

  function applyFilter(category) {
    cards.forEach(function (card) {
      var show = category === "all" || card.dataset.category === category;
      card.classList.toggle("is-hidden", !show);
    });

    buttons.forEach(function (btn) {
      var isActive = btn.dataset.filter === category;
      btn.setAttribute("aria-pressed", String(isActive));
      btn.parentElement.classList.toggle("active", isActive); // CSS styles div.active button
    });
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.dataset.filter);
    });
  });
})();
