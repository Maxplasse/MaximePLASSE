import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static get targets() {
    return [ "navbarContainer", "icon", "link", "title" ]
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
        link.classList.remove("2xsm:sr-only")
      })
    } else {
      this.navbarContainerTarget.dataset.expanded = "1"
      this.navbarContainerTarget.classList.add("md:w-[100%]")
      this.linkTargets.forEach(link => {
        link.classList.add("2xsm:sr-only")
      })
    }
  }

  updateNavbar() {
    if (window.matchMedia("(max-width: 414px)").matches) {
      if (window.scrollY > (window.innerHeight-445)) {
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
      if (window.scrollY > (window.innerHeight-360)) {
        this.element.classList.add("bg-backgroundcolor")
        this.titleTarget.classList.remove("hidden")
        // this.titleTarget.classList.add("text-black")
      } else {
        this.element.classList.remove("bg-backgroundcolor")
        this.titleTarget.classList.add("hidden")
        // this.titleTarget.classList.remove("text-black")
      }
    } else {
      if (window.scrollY > (window.innerHeight-385)) {
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

}
