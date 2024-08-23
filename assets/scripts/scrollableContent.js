document.addEventListener(
	"wheel",
	(e) => {
		const scrollableContent = document.getElementById("scrollableContent");
		const maxNegativeTranslateY = Math.min(
			window.innerHeight - scrollableContent.clientHeight,
			0,
		);
		const oldVal =
			Number.parseFloat(
				scrollableContent.style.transform.replace(
					/translateY\((-?\d+)px\)/,
					"$1",
				),
			) || 0;
		let newVal = oldVal - e.deltaY;
		newVal = Math.max(newVal, maxNegativeTranslateY);
		newVal = Math.min(newVal, 0);
		scrollableContent.style.transform = `translateY(${newVal}px)`;
		e.preventDefault();
	},
	{ passive: false },
);
