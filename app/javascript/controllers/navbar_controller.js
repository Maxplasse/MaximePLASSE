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
    if (window.matchMedia("(max-width: 375px)").matches) {
      if (window.scrollY > (window.innerHeight-380)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else if (window.matchMedia("(max-width: 390px)").matches) {
      if (window.scrollY > (window.innerHeight-385)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else if (window.matchMedia("(max-width: 414px)").matches) {
      if (window.scrollY > (window.innerHeight-530)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else if (window.matchMedia("(max-width: 768px)").matches) {
      if (window.scrollY > (window.innerHeight-360)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else if (window.matchMedia("(max-width: 992px)").matches){
      if (window.scrollY > (window.innerHeight-360)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else if (window.matchMedia("(max-width: 1200px)").matches){
      if (window.scrollY > (window.innerHeight-315)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else {
      if (window.scrollY > (window.innerHeight-315)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    }
  };

  handleScroll() {
    const scrollAmount = window.scrollY;
    const textElement = this.textTarget;

    // Adjust these values as needed
    const startScroll = 250; // The scroll position where the effect starts
    const moveFactor = 0.8;   // Speed of the movement
    const endScroll = 600;

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
