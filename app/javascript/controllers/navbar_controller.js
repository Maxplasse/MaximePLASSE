import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ "navbarContainer", "icon", "link", "title", "text", "language", "logo" ]
  }
  connect() {
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  initialize() {
    this.navbarContainerTarget.dataset.expanded = "1"
  }

  toggle(event) {
    event.preventDefault();
    if (this.navbarContainerTarget.dataset.expanded == "1") {
      this.navbarContainerTarget.dataset.expanded = "0"
      this.navbarContainerTarget.classList.remove("md:w-[100%]")
      this.linkTargets.forEach(link => {
        link.classList.remove("4xsm:sr-only")
      })
    } else {
      this.navbarContainerTarget.dataset.expanded = "1"
      this.navbarContainerTarget.classList.add("md:w-[100%]")
      this.linkTargets.forEach(link => {
        link.classList.add("4xsm:sr-only")
      })
    }
  }

  updateNavbar() {
    const scrollAmount = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const deviceConfig = [
      { maxWidth: 375, scrollPosition: 370, smallHeightScrollPosition: 420, smallestHeightScrollPosition: 340 },
      { maxWidth: 390, scrollPosition: 370, smallHeightScrollPosition: 420, smallestHeightScrollPosition: 340 },
      { maxWidth: 414, scrollPosition: 560, smallHeightScrollPosition: 500 },
      { maxWidth: 768, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 992, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 1200, scrollPosition: 390, smallHeightScrollPosition: 350 },
      { maxWidth: 2600, scrollPosition: 390, smallHeightScrollPosition: 350 },

    ];

    const currentConfig = deviceConfig.find(config => window.matchMedia(`(max-width: ${config.maxWidth}px)`).matches);

    let scrollPositionThreshold = currentConfig.scrollPosition;

    if (windowHeight <= 620) {
      if (windowWidth >= 600) {
        scrollPositionThreshold = currentConfig.smallHeightScrollPosition;
      } else {
        scrollPositionThreshold = currentConfig.smallestHeightScrollPosition;
      }
    } else if (windowHeight <= 640) {
      scrollPositionThreshold = currentConfig.smallHeightScrollPosition;
    }

    if (currentConfig) {

      const transparentScrollPosition = windowHeight * 0.8;

      if (scrollAmount > transparentScrollPosition) {
        this.element.classList.remove("bg-backgroundcolor");
        this.element.classList.add("bg-transparent");
        this.titleTarget.classList.remove("hidden");
      } else if (scrollAmount > (windowHeight - scrollPositionThreshold)) {
        this.element.classList.add("bg-backgroundcolor");
        this.element.classList.remove("bg-transparent");
        this.titleTarget.classList.remove("hidden");
      } else {
        this.element.classList.remove("bg-backgroundcolor");
        this.titleTarget.classList.add("hidden");
      }
    }
  }

  handleScroll() {
    const scrollAmount = window.scrollY;
    const textElement = this.textTarget;
    const logoElement = this.logoTarget;
    const languageElement = this.languageTarget;

    const startScroll = 250;
    const startScrollLogo = 250;
    const startScrollLanguage = 250;
    const endScroll = 600;

    const windowWidth = window.innerWidth;

    let moveFactor = 0.8;

    if (windowWidth <= 390) {
      moveFactor = 0.3;
    } else if (windowWidth <= 414) {
      moveFactor = 0.8;
    } else if (windowWidth <= 768) {
      moveFactor = 0.5;
    } else if (windowWidth <= 992) {
      moveFactor = 0.65;
    } else if (windowWidth <= 1200) {
      moveFactor = 0.75;
    } else {
      moveFactor = 0.8;
    }

    if (scrollAmount > startScroll) {
      const opacity = 1 - (Math.min(scrollAmount - startScroll, endScroll - startScroll) / (endScroll - startScroll));
      textElement.style.opacity = opacity;
      languageElement.style.opacity = opacity;

      if (windowWidth <= 414) {
        const logoTranslate = -(scrollAmount - startScrollLogo) * moveFactor;

        logoElement.style.transform = `translateX(${logoTranslate}px)`;
      }
    } else {
      textElement.style.opacity = 1;
      languageElement.style.opacity = 1;
      logoElement.style.transform = "translateX(0)";

      document.body.style.overflowX = "auto";
    }
  }
}
