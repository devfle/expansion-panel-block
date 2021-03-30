const EXPANSION_PANELS = document.querySelectorAll('.devfle-expansion-panel');

const DEFAULT_PADDING = 8;
for (const EXPANSION_PANEL of EXPANSION_PANELS) {

    // set height to every single panel
    const EXPANSION_PANEL_CONTENT = EXPANSION_PANEL.lastElementChild;
    let panelHeight = EXPANSION_PANEL_CONTENT.offsetHeight;
    EXPANSION_PANEL_CONTENT.style.height = 0;

    EXPANSION_PANEL.addEventListener('click', () => {
        EXPANSION_PANEL.classList.toggle('devfle-expansion-panel--open');
        if (EXPANSION_PANEL.classList.contains('devfle-expansion-panel--open')) {
            EXPANSION_PANEL_CONTENT.style.height = `${panelHeight + (DEFAULT_PADDING * 2)}px`;
        } else {
            EXPANSION_PANEL_CONTENT.style.height = 0;
        }
    });
}