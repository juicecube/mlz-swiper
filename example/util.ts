export function setHtmlFont() {
  // rem适配相关
  const docEl = document.documentElement;

  // adjust body font size
  function setBodyFontSize() {
    document.addEventListener('DOMContentLoaded', setBodyFontSize);
  }
  setBodyFontSize();

  function setRemUnit() {
    let rem = 16;
    rem = docEl!.offsetWidth / 750 * 100;
    rem = rem > 87 ? 87 : rem;
  docEl!.style.fontSize = `${rem}px`;
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', function pageShow(e) {
    if (e.persisted) {
      setRemUnit();
    }
  });
}
