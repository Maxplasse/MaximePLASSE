import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ "navbarContainer", "icon", "link", "title", "text" ]
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

    // Define an array of objects for different device widths and scroll positions
    const deviceConfig = [
      { maxWidth: 375, scrollPosition: 380, smallHeightScrollPosition: 350 },
      { maxWidth: 390, scrollPosition: 385, smallHeightScrollPosition: 350 },
      { maxWidth: 414, scrollPosition: 530, smallHeightScrollPosition: 510 },
      { maxWidth: 768, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 992, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 1200, scrollPosition: 320, smallHeightScrollPosition: 315 },
      { maxWidth: 2600, scrollPosition: 320, smallHeightScrollPosition: 320 },
      // Add more as needed
    ];

    // Find the appropriate device configuration
    const currentConfig = deviceConfig.find(config => window.matchMedia(`(max-width: ${config.maxWidth}px)`).matches);

    let scrollPositionThreshold = currentConfig.scrollPosition;

    if (windowHeight <= 600) {
      scrollPositionThreshold = currentConfig.smallHeightScrollPosition;
    }

    if (currentConfig) {
      if (scrollAmount <= (scrollPositionThreshold - 100)) {
        this.element.classList.add("bg-transparent");
        this.element.classList.remove("bg-backgroundcolor");
        this.titleTarget.classList.add("hidden");
      } else if (scrollAmount <= scrollPositionThreshold) {
        this.element.classList.remove("bg-transparent");
        this.element.classList.add("bg-backgroundcolor");
        this.titleTarget.classList.remove("hidden");
      } else if (scrollAmount <= (scrollPositionThreshold + 600)) {
        // Begin to make the navbar transparent again
        const transparencyProgress = (scrollAmount - scrollPositionThreshold) / 600;
        this.element.style.backgroundColor = `rgba(250, 249, 247, ${1 - transparencyProgress})`;
        this.titleTarget.classList.remove("hidden");
      } else {
        // Fully transparent
        this.element.style.backgroundColor = "rgba(250, 249, 247, 0)";
        this.titleTarget.classList.remove("hidden");
      }
    }
  }



  handleScroll() {
    const scrollAmount = window.scrollY;
    const textElement = this.textTarget;

    // Adjust these values as needed
    const startScroll = 250; // The scroll position where the effect starts
    const endScroll = 600;

    const windowWidth = window.innerWidth;

    let moveFactor = 0.8; // Default moveFactor for larger screens

    if (windowWidth <= 390) {
      moveFactor = 0.3;
    } else if (windowWidth <= 414) {
      moveFactor = 0.25;
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
      textElement.style.transform = `translateX(-${(scrollAmount - startScroll) * moveFactor}px)`;
    } else {
      textElement.style.transform = "translateX(0)";
      textElement.style.opacity = 1;
    }
  }
}
