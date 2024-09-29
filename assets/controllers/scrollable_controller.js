import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    document.addEventListener(
      "wheel",
      (e) => {
        const maxNegativeTranslateY = Math.min(
          window.innerHeight - this.element.clientHeight,
          0,
        );
        const oldVal =
          Number.parseFloat(
            this.element.style.transform.replace(
              /translateY\((-?\d+)px\)/,
              "$1",
            ),
          ) || 0;
        let newVal = oldVal - e.deltaY;
        newVal = Math.max(newVal, maxNegativeTranslateY);
        newVal = Math.min(newVal, 0);
        this.element.style.transform = `translateY(${newVal}px)`;
        e.preventDefault();
      },
      { passive: false },
    );
  }
}

