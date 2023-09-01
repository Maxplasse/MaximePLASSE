import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.setInitialFontSize();
    window.addEventListener("scroll", this.updateTitleSize.bind(this));
  }

  setInitialFontSize() {
    const windowWidth = window.innerWidth;
    let initialFontSize;

    if (windowWidth <= 375) {
      initialFontSize = 4;
    } else if (windowWidth <= 390) {
      initialFontSize = 4;
    } else if (windowWidth <= 414) {
      initialFontSize = 4;
    } else if (windowWidth <= 768) {
      initialFontSize = 4;
    } else if (windowWidth <= 992) {
      initialFontSize = 5;
    } else if (windowWidth <= 1200) {
      initialFontSize = 7;
    } else if (windowWidth <= 1350) {
      initialFontSize = 8;
    } else if (windowWidth <= 1600) {
      initialFontSize = 12;
    } else {
      initialFontSize = 14;
    }

    this.element.style.fontSize = `${initialFontSize}rem`;
  }

  updateTitleSize() {
    const scrolled = window.scrollY / (window.innerHeight - 250);
    const windowWidth = window.innerWidth;

    const fontSizeRanges = [
      { maxWidth: 375, minFontSize: 0.3, maxFontSize: 4 },
      { maxWidth: 390, minFontSize: 0.3, maxFontSize: 4 },
      { maxWidth: 414, minFontSize: 0, maxFontSize: 4 },
      { maxWidth: 768, minFontSize: 0.3, maxFontSize: 4 },
      { maxWidth: 992, minFontSize: 0.3, maxFontSize: 5 },
      { maxWidth: 1200, minFontSize: 1.2, maxFontSize: 7 },
      { maxWidth: 1350, minFontSize: 1.2, maxFontSize: 8 },
      { maxWidth: 1600, minFontSize: 1.5, maxFontSize: 12 },
      { maxWidth: 2700, minFontSize: 1.5, maxFontSize: 14 },
    ];

    let fontSize = 0;

    for (const { maxWidth, minFontSize, maxFontSize } of fontSizeRanges) {
      if (windowWidth <= maxWidth) {
        fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize - minFontSize)) + minFontSize : minFontSize;
        break;
      }
    }

    this.element.style.fontSize = `${fontSize}rem`;
  }

  switchLanguage(event) {
    const language = event.currentTarget.getAttribute('data-lang');
    window.location.href = `?locale=${language}`;
  }
}
