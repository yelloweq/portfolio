import { Controller } from '@hotwired/stimulus';

export default class extends Controller {


  connect() {
    this.#initializeScrollListeners();
  }

  #initializeScrollListeners() {
    let touchStartY = 0;
    let currentTranslateY = 0;
    let touchScrollSpeedMult = 1.5;

    //Desktop mouse wheel
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

    // Touch event listeners for mobile
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY; // Store initial touch position
      currentTranslateY =
        Number.parseFloat(
          this.element.style.transform.replace(/translateY\((-?\d+)px\)/, "$1")
        ) || 0; // Get current translation value
    });

    this.element.addEventListener('touchmove', (e) => {
      const touchCurrentY = e.touches[0].clientY;
      const maxNegativeTranslateY = Math.min(
        window.innerHeight - this.element.clientHeight,
        0
      );
      let newTranslateY = currentTranslateY + (touchCurrentY - touchStartY)*touchScrollSpeedMult;
      newTranslateY = Math.max(newTranslateY, maxNegativeTranslateY); // Prevent dragging too far up
      newTranslateY = Math.min(newTranslateY, 0); // Prevent dragging too far down
      this.element.style.transform = `translateY(${newTranslateY}px)`;
      e.preventDefault();
    }, { passive: false });
  }
}

