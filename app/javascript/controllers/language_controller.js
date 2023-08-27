import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  switchLanguage(event) {
    const language = event.currentTarget.getAttribute('data-lang');
    window.location.href = `?locale=${language}`;
  }
}
