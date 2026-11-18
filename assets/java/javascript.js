/* Hero image crossfade.
   Two stacked layers: .dark (shown first) and .bright (fades in on top).
   Before you scroll, only the dark image shows. As you scroll, the bright image fades in
   and is at 100% once the whole hero is on screen; it stays that way after you scroll past.
   The swap only happens if assets/images/hero-image.png actually loads,
   so a missing or misnamed file can never leave the hero blank.
   Set HERO_FADE to false to turn the effect off and keep only the dark image. */
const HERO_FADE = true;

const imageSection = document.querySelector(".hero-imgs");
const brightImage = document.querySelector(".bright");
let brightReady = false;

function updateHeroFade() {
    if (!HERO_FADE || !brightReady || !imageSection || !brightImage) return;

    const rect = imageSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Where the hero sits on the page, and the scroll position at which the whole
    // hero is on screen (or fills the screen, if it is taller than the screen).
    const heroTop = rect.top + window.scrollY;
    const visibleHeight = Math.min(rect.height, windowHeight);
    const fullyVisibleAt = heroTop - (windowHeight - visibleHeight);

    // 0 at the top of the page (dark image only), 1 once the hero is fully visible.
    // The Math.max keeps the fade gradual when the hero is already almost in view.
    let progress = window.scrollY / Math.max(fullyVisibleAt, 150);
    progress = Math.min(Math.max(progress, 0), 1);

    brightImage.style.opacity = progress;
}

// make sure the bright image really loads before we ever show it
if (brightImage) {
    const match = /url\(["']?(.*?)["']?\)/.exec(getComputedStyle(brightImage).backgroundImage);
    if (match) {
        const probe = new Image();
        probe.onload = function () { brightReady = true; updateHeroFade(); };
        probe.onerror = function () { console.warn("Hero fade skipped: bright image not found:", match[1]); };
        probe.src = match[1];
    }
}

window.addEventListener("scroll", updateHeroFade, { passive: true });
window.addEventListener("resize", updateHeroFade);
updateHeroFade();
