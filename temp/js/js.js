gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother);

ScrollSmoother.create({
	smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
	effects: true, // looks for data-speed and data-lag attributes on elements
	smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

let sections = gsap.utils.toArray(".panel");
let dragRatio = 1;
let scrollTo;

let scrollTween = gsap.to(sections, {
	xPercent: -100 * (sections.length - 1),
	ease: "none", // <-- IMPORTANT!
	scrollTrigger: {
		trigger: ".container",
		pin: true,
		scrub: 0.1,
		onRefresh: (self) => {
			dragRatio =
				(self.end - self.start) /
				((sections.length - 1) * sections[0].offsetWidth);
		},
		//snap: directionalSnap(1 / (sections.length - 1)),
		end: "+=3000"
	}
});

Observer.create({
	target: ".container",
	type: "wheel,touch,pointer",
	onPress: (self) => {
		self.startScroll = scrollTween.scrollTrigger.scroll();
		scrollTo = gsap.quickTo(scrollTween.scrollTrigger, "scroll", {
			duration: 0.5,
			ease: "power3"
		});
	},
	onDrag: (self) => {
		scrollTo(self.startScroll + (self.startX - self.x) * dragRatio);
	}
});

gsap.set(".box-1, .box-2", { y: 100 });
ScrollTrigger.defaults({ markers: { startColor: "white", endColor: "white" } });

// red section
gsap.to(".box-1", {
	y: -130,
	duration: 2,
	ease: "elastic",
	scrollTrigger: {
		trigger: ".box-1",
		containerAnimation: scrollTween,
		start: "left center",
		toggleActions: "play none none reset",
		id: "1"
	}
});

// gray section
gsap.to(".box-2", {
	y: -120,
	backgroundColor: "#1e90ff",
	ease: "none",
	scrollTrigger: {
		trigger: ".box-2",
		containerAnimation: scrollTween,
		start: "center 80%",
		end: "center 20%",
		scrub: true,
		id: "2"
	}
});

// purple section
ScrollTrigger.create({
	trigger: ".box-3",
	containerAnimation: scrollTween,
	toggleClass: "active",
	start: "center 60%",
	id: "3"
});

// green section
ScrollTrigger.create({
	trigger: ".green",
	containerAnimation: scrollTween,
	start: "center 65%",
	end: "center 51%",
	onEnter: () => console.log("enter"),
	onLeave: () => console.log("leave"),
	onEnterBack: () => console.log("enterBack"),
	onLeaveBack: () => console.log("leaveBack"),
	onToggle: (self) => console.log("active", self.isActive),
	id: "4"
});

// only show the relevant section's markers at any given time
gsap.set(
	".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end",
	{ autoAlpha: 0 }
);
["red", "gray", "purple", "green"].forEach((triggerClass, i) => {
	ScrollTrigger.create({
		trigger: "." + triggerClass,
		containerAnimation: scrollTween,
		start: "left 30%",
		end: i === 3 ? "right right" : "right 30%",
		markers: false,
		onToggle: (self) =>
			gsap.to(".marker-" + (i + 1), {
				duration: 0.25,
				autoAlpha: self.isActive ? 1 : 0
			})
	});
});

// helper function for causing the sections to always snap in the direction of the scroll (next section) rather than whichever section is "closest" when scrolling stops.
// function directionalSnap(increment) {
//   let snapFunc = gsap.utils.snap(increment);
//   return (raw, self) => {
//     let n = snapFunc(raw);
//     return Math.abs(n - raw) < 1e-4 || (n < raw) === self.direction < 0 ? n : self.direction < 0 ? n - increment : n + increment;
//   };
// }

// making the code pretty/formatted.
PR.prettyPrint();
