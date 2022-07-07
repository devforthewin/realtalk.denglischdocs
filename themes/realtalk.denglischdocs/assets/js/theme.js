import { Swiper, Mousewheel } from 'swiper'
Swiper.use([ Mousewheel])

import { gsap, Power2 } from 'gsap'
gsap.registerPlugin(ScrollTrigger, Power2);

import $ from "jquery";
import "slick-carousel"

// Import October CMS System Framework (requires jQuery)
import '~/modules/system/assets/js/framework.js'
import '~/modules/system/assets/js/framework.extras.js'

// Import October CMS Plugins Examples
// import '~/themes/mytheme/assets/vendor/lazyload/lazyload.js'
// import '~/plugins/nms/plugin/assets/js/plugin.js'

document.addEventListener('DOMContentLoaded', () => {

	//Swiper Slider
	var swiper = new Swiper('.swiper', {
		//effect: 'fade',
		freeMode: true,
		mousewheel: true,
		observer: true,
    observeParents: true,
		mousewheel: {
			invert: false,
			releaseOnEdges: true,
			sensitivity: 2
		},

		// onSlideChangeEnd: function (swiperObj) {
		// 	$('.swiper').css('scrollTop', '0');
		// }
	});
	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#first-slider",
			start: "top top",
			end: `+=30%`,
			scrub: 0.5,
			pin: true,
			invalidateOnRefresh: true,
			id: "first-slider",
		}
	});

	// const options = {
	// 	root: document.getElementById('swiper')
	// }

	var observer = new IntersectionObserver(function (entries) {
		// isIntersecting is true when element and viewport are overlapping
		// isIntersecting is false when element and viewport don't overlap
		if (entries[0].isIntersecting === true) {
			console.log('Element has just become visible in screen');
			swiper.mousewheel.disable();
		}
		else {
			swiper.mousewheel.enable();

		}
	}, { threshold: [0.1] });

	observer.observe(document.querySelector('#scroll-container'));


	const swiper2 = new Swiper('.second-swiper', {
		direction: "horizontal",
		freeMode: true,
		mousewheel: true,
		mousewheel: {
			invert: false,
			releaseOnEdges: true
		},
	});

	//Read more
	document.getElementById('convinc-btn').addEventListener("click", function () {
		var more = document.getElementById('readMore');
		if (more.style.display === "none") {
			more.style.display = "block";
		} else {
			more.style.display = "none";
			enBlock.style.display = "none";
			deBlock.style.display = "none";
		}
	})

	//Benefits Buttons
	const btnEn = document.getElementById('english');
	const btnDe = document.getElementById('german');
	const enBlock = document.getElementById('en');
	const deBlock = document.getElementById('de');
	let buttons = document.querySelectorAll('benefits-btn');

	btnEn.onclick = function () {
		enBlock.style.display = "block";
		deBlock.style.display = "none";
		btnDe.classList.remove('btn_active')
		btnEn.classList.add('btn_active');
	}

	btnDe.onclick = function () {
		deBlock.style.display = "block";
		enBlock.style.display = "none";
		btnEn.classList.remove('btn_active')
		btnDe.classList.add('btn_active');
	}

	buttons.forEach(button => {
		button.addEventListener('click', function () {
			button.classList.add('btn_active');
		})
	})
	//Real Talk...block. Case example expand
	document.getElementById('click-block').addEventListener("click", function () {
		let arrow = document.getElementById('arrow');
		let arrow2 = document.getElementById('arrow2');
		var container = $(this).parents('.container-xxl');
		container.find('.real-talk__toggle-content').slideToggle();
		container.find('.real-talk__arrow').toggleClass('active');

		if (arrow2.style.display === "none") {
			arrow2.style.display = "block";
			arrow.style.display = "none";
		} else {
			arrow.style.display = "block";
			arrow2.style.display = "none";
		}
	})
	gsap.to(".background-arrow ", {
		ease: Power2.easeIn,
	})

	// multi step form
	const multiStepForm = document.querySelector("[data-multi-step]")
	const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
	const progress = document.getElementById("progress")
	const nextBtns = document.getElementById("next")
	const progressSteps = document.querySelectorAll(".step-link")

	let active = 1;

	let currentStep = formSteps.findIndex(step => {
		return step.classList.contains("active")
	})
	if (currentStep < 0) {
		currentStep = 0
		showCurrentStep();
		showCurrentProgress();
	}

	multiStepForm.addEventListener("click", e => {
		let incrementor
		if (e.target.matches("[data-next]")) {
			incrementor = 1
		} else if (e.target.matches("[data-prev]")) {
			incrementor = -1
		}

		if (incrementor == null) return

		const inputs = [...formSteps[currentStep].querySelectorAll("input")]
		const allValid = inputs.every(input => input.reportValidity())
		if (allValid) {
			currentStep += incrementor
			showCurrentStep();
			showCurrentProgress();
		}
	})

	function showCurrentStep() {
		formSteps.forEach((step, index) => {
			step.classList.toggle("active", index === currentStep)
		})
	}

	//progress steps
	function showCurrentProgress() {
		progressSteps.forEach((progressStep, index) => {
			if (index === currentStep) {
				progressStep.classList.add("step-link__active");
			} else {
				progressStep.classList.remove("step-link__active");
			}
		})
	}

	progressSteps.forEach((progress, index) => {
		progress.addEventListener('click', () => {
			formSteps.forEach((content) => {
				content.classList.remove('active');	
			});
			progressSteps.forEach((progress) => {
				progress.classList.remove('step-link__active');
			});
			formSteps[index].classList.add('active');
			progressSteps[index].classList.add('step-link__active');			
		})
	})

	// Add  Course Field
	var form = document.getElementById('options-block');
	var addField = document.getElementById('add-more-field');

	addField.onclick = function () {
		var newField = document.createElement('input');
		newField.setAttribute('type', 'text');
		newField.setAttribute('name', 'course-title[]');
		newField.setAttribute('id', 'course-title');
		newField.setAttribute('placeholder', 'Course Title');
		form.appendChild(newField);
	}

	//Animation Block
	//Animation Lines
	gsap.to(".revel", {
		scrollTrigger: {
			trigger: ".revel",
			toggleClass: 'active',
			start: "top 60.5%",
			end: "top 20%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".revel2", {
		scrollTrigger: {
			trigger: ".revel2",
			toggleClass: 'active',
			start: "top 45%",
			// end: "top 0%",
		}
	})

	//Animation Images
	gsap.to(".triggerToRightDown", {
		x: 20, y: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".triggerToRightDown",
			start: "top 21%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})
	gsap.to(".trigerToLeftUp ", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".trigerToLeftUp",
			start: "top 51%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".trigerToLeftUp2", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".trigerToLeftUp2",
			start: "top 23%",
			end: "top 40%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".abroad-overflow_under ", {
		y: 20,
		x: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".abroad-overflow_under",
			start: "top 15%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".abroad-overflow ", {
		x: 20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".abroad-overflow",
			start: "top 43%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".paving-overflow__under", {
		x: 20, y: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".paving-overflow__under",
			start: "top 21%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})
	gsap.to(".paving-overflow__above ", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".paving-overflow__above",
			start: "top 48%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".sibling-overflow ", {
		y: -20, x: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".sibling-overflow",
			start: "top 48.5%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".sibling-overflow_under ", {
		y: 20, x: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".sibling-overflow_under",
			start: "top 25%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".beyond-overflow__under", {
		x: 20,
		y: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".beyond-overflow__under",
			start: "top 20%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})
	gsap.to(".beyond-overflow__above ", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".beyond-overflow__above",
			start: "top 48%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".practice-overflow_under", {
		y: 20,
		x: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".practice-overflow_under",
			start: "top 20%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".practice-overflow ", {
		y: -20,
		x: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".practice-overflow",
			start: "top 46%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".prepped-overflow__under", {
		x: 20,
		y: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".prepped-overflow__under",
			start: "top 20%",
			end: "top 70%",
			toggleActions: "play none reverse none",

		}
	})
	gsap.to(".prepped-overflow__above ", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".prepped-overflow__above",
			start: "top 47%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".diverse-overflow", {
		y: -20, x: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".diverse-overflow",
			start: "top 33%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".real-talk-overflow__under", {
		x: 20,
		y: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".real-talk-overflow__under",
			start: "top 13%",
			end: "top 70%",
			toggleActions: "play none reverse none",

		}
	})
	gsap.to(".real-talk-overflow__above ", {
		x: -20,
		y: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".real-talk-overflow__above",
			start: "top 41%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	gsap.to(".sync-overflow_under", {
		y: 20, x: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".sync-overflow_under",
			start: "top 11%",
			end: "top 60%",
			toggleActions: "play none reverse none",
		}
	})
	gsap.to(".sync-overflow ", {
		y: -20, x: 20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".sync-overflow",
			start: "top 37%",
			end: "top 60%",
			toggleActions: "play none reverse none",
		}
	})

	// gsap.to(".multi-step__form-block__bus__overflow", {
	// 	y: -20,
	// 	x: 20,
	// 	ease: Power2.easeIn,
	// 	scrollTrigger: {
	// 		trigger: ".multi-step__form-block__bus__overflow",
	// 		start: "top 50%",
	// 		end: "top 60%",
	// 		toggleActions: "play none reverse none",
	// 	}
	// })

	// gsap.to(".multi-step__form-block__everybody-img", {
	// 	y: 20, x: -20,
	// 	ease: Power2.easeIn,
	// 	scrollTrigger: {
	// 		trigger: ".multi-step__form-block__everybody-img",
	// 		start: "top 40%",
	// 		end: "top 50%",
	// 		toggleActions: "play none reverse none",
	// 	}
	// })

	gsap.to(".got-questions__image-overflow", {
		y: 20,
		x: -20,
		ease: Power2.easeIn,
		scrollTrigger: {
			trigger: ".got-questions__image-overflow",
			start: "top 25%",
			end: "top 70%",
			toggleActions: "play none reverse none",
		}
	})

	//Modal Window
const modal = document.querySelector('.modal');
const hideButton = document.getElementById('hideButton');
const showButton = document.getElementById('showButton');

hideButton.addEventListener('click', hideModal);
showButton.addEventListener('click', showModal);

function hideModal() {
    modal.id = 'hide';
}

function showModal() {
    modal.id = 'show';
}

});
