import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  initialize() {
    // min width 1201px
    if (window.matchMedia("(max-width: 414px)").matches) {
      this.element.style.fontSize = `2rem`;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      this.element.style.fontSize = `4rem`;
    } else if (window.matchMedia("(max-width: 992px)").matches){
      this.element.style.fontSize = `4rem`;
    } else if (window.matchMedia("(max-width: 1200px)").matches){
      this.element.style.fontSize = `4rem`;
    } else {
      this.element.style.fontSize = `5rem`;
    }
  }

  updateTitleSize() {
    const scrolled = (window.scrollY)/(window.innerHeight-250)

    // min width 1201px
    const maxFontSize = 5
    const minFontSize = 0.3

    // min width 1200px
    const maxFontSize2 = 5
    const minFontSize2 = 0.3

    // max width 992px
    const maxFontSize1 = 5
    const minFontSize1 = 0.3

    // max width 768px
    const maxFontSize3 = 4
    const minFontSize3 = 0.3

    // max width 414px
    const maxFontSize4 = 3
    const minFontSize4 = 0

    // max width 390px
    const maxFontSize5 = 2.8
    const minFontSize5 = 0

    // max width 375px
    const maxFontSize6 = 2.7
    const minFontSize6 = 0


    // fontSizeOutput(scrolled)
    if (window.matchMedia("(max-width: 375px)").matches) {
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize6 - minFontSize6)) + minFontSize6 : minFontSize6
      this.element.style.fontSize = `${fontSize}rem`;
    } else if (window.matchMedia("(max-width: 390px)").matches) {
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize5 - minFontSize5)) + minFontSize5 : minFontSize5
      this.element.style.fontSize = `${fontSize}rem`;
    } else if (window.matchMedia("(max-width: 414px)").matches) {
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize4 - minFontSize4)) + minFontSize4 : minFontSize4
      this.element.style.fontSize = `${fontSize}rem`;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize3 - minFontSize3)) + minFontSize3 : minFontSize3
      this.element.style.fontSize = `${fontSize}rem`;
    } else if (window.matchMedia("(max-width: 992px)").matches){
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize1 - minFontSize1)) + minFontSize1 : minFontSize1
      this.element.style.fontSize = `${fontSize}rem`;
    } else if (window.matchMedia("(max-width: 1200px)").matches){
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize2 - minFontSize2)) + minFontSize2 : minFontSize2
      this.element.style.fontSize = `${fontSize}rem`;
    } else {
      const fontSize = scrolled >= 0 && scrolled <= 1 ? ((1 - scrolled) * (maxFontSize - minFontSize)) + minFontSize : minFontSize
      this.element.style.fontSize = `${fontSize}rem`;
    }
  }

  switchLanguage(event) {
    const language = event.currentTarget.getAttribute('data-lang');
    window.location.href = `?locale=${language}`;
  }
}
