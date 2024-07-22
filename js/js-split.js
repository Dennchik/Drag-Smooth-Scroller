gsap.registerPlugin(ScrollTrigger);

let getRatio = el => window.innerHeight / (window.innerHeight + el.offsetHeight);

gsap.utils.toArray(".section").forEach((section, i) => {
	section.bg = section.querySelector(".bgimg");

	// Первый элемент (i === 0) обрабатывается иначе, потому что он должен начинаться с самого верха.
	gsap.fromTo(section.bg, {
		// Устанавливаем начальную позицию фона
		y: () => i ? -window.innerHeight * getRatio(section) : 0
	}, {
		// Устанавливаем конечную позицию фона
		y: () => window.innerHeight * (1 - getRatio(section)),
		ease: "none",
		scrollTrigger: {
			trigger: section,
			start: () => i ? "top bottom" : "top top",
			end: "bottom top",
			scrub: true,
			invalidateOnRefresh: true // чтобы сделать его отзывчивым
		}
	});
});