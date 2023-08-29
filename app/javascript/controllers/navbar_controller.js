import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ "navbarContainer", "icon", "link", "title", "text", "language" ]
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

  handleNavbarVisibility() {
    const scrollAmount = window.scrollY;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    // Only apply the behavior for devices up to 414px width
    if (windowWidth <= 414) {
      // Define the scroll thresholds for hiding and showing the navbar
      const hideThreshold = 800 * windowHeight / 414; // Hide navbar after scrolling down 800vh on mobile
      const showThreshold = 10 * windowHeight / 414; // Show navbar when scrolling back up by 20vh on mobile

      // Calculate the translateY value for the navbar container
      let translateY;

      if (scrollAmount > hideThreshold) {
        // Apply a cubic easing function for faster disappearance
        const distancePastThreshold = scrollAmount - hideThreshold;
        const maxDistancePastThreshold = windowHeight / 8; // Adjust this value as needed
        const progress = Math.min(distancePastThreshold / maxDistancePastThreshold, 1);
        const cubicProgress = Math.pow(progress, 40); // Cubic easing
        translateY = -1200 + (cubicProgress * 100);
      } else if (scrollAmount < showThreshold) {
        // Keep the navbar at translateY: 0
        translateY = 0;
      } else {
        // Smoothly transition between show and hide thresholds
        translateY = Math.min((scrollAmount - showThreshold) / (hideThreshold - showThreshold), 1) * -100;
      }

      // Apply the translateY value to the navbar container
      this.navbarContainerTarget.style.transform = `translateY(${translateY}%)`;
    } else {
      // Reset the translateY for wider screens
      this.navbarContainerTarget.style.transform = "translateY(0)";
    }
  }



  updateNavbar() {
    const scrollAmount = window.scrollY;
    const windowHeight = window.innerHeight;

    // Define an array of objects for different device widths and scroll positions
    const deviceConfig = [
      { maxWidth: 375, scrollPosition: 430, smallHeightScrollPosition: 400 },
      { maxWidth: 390, scrollPosition: 430, smallHeightScrollPosition: 400 },
      { maxWidth: 414, scrollPosition: 530, smallHeightScrollPosition: 500 },
      { maxWidth: 768, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 992, scrollPosition: 360, smallHeightScrollPosition: 330 },
      { maxWidth: 1200, scrollPosition: 390, smallHeightScrollPosition: 350 },
      { maxWidth: 2600, scrollPosition: 390, smallHeightScrollPosition: 350 },
      // Add more as needed
    ];

    // Find the appropriate device configuration
    const currentConfig = deviceConfig.find(config => window.matchMedia(`(max-width: ${config.maxWidth}px)`).matches);

    let scrollPositionThreshold = currentConfig.scrollPosition;

    if (windowHeight <= 600) {
      scrollPositionThreshold = currentConfig.smallHeightScrollPosition;
    }

    if (currentConfig) {
      // Calculate the scroll position to trigger transparency (half of viewport height)
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
