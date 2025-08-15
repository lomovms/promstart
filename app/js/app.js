import 'jquery'
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import LazyLoad from 'lazyload';

// import '~components/input'
import Inputmask from 'inputmask';
import '../scss/style.scss'
import { each } from 'jquery';


$(document).ready(function() {
    // adds SVG External Content support to all browsers
    svg4everybody();

    // Polyfill object-fit/object-position on <img>
    objectFitImages();

    // lazyload
    let images = document.querySelectorAll("img.lazyload");
    new LazyLoad(images);
});
document.addEventListener('DOMContentLoaded', () => {
	const sw = new Swiper('#effectSwiper', {
		slidesPerView: 1,
		spaceBetween: 12,
		loop: false,
		pagination: { el: '.effect__pagination', clickable: true },
		navigation: { nextEl: '.effect__next', prevEl: '.effect__prev' },
		breakpoints: {
			576: { spaceBetween: 16 },
			768: { slidesPerView: 2, spaceBetween: 20 },
			992: { slidesPerView: 3, spaceBetween: 24, allowTouchMove: false }
		}
	});
});
document.addEventListener('DOMContentLoaded', () => {
	new Swiper('#platformSwiper', {
		slidesPerView: 1,
		spaceBetween: 24,
		autoHeight: true,
		navigation: {
			nextEl: '.platform__next',
			prevEl: '.platform__prev'
		},
		loop: false
	});
});
document.addEventListener('DOMContentLoaded', () => {
	const im = new Inputmask('+7 (999) 999-99-99', {
		showMaskOnHover: false,
		clearIncomplete: true
	});
	im.mask('#ctaPhone');
});

document.addEventListener('DOMContentLoaded', () => {
	const h = document.querySelector('.header');
	if (!h) return;
	const onScroll = () => h.classList.toggle('is-stuck', window.scrollY > 2);
	onScroll();
	window.addEventListener('scroll', onScroll, { passive: true });
});
ocument.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	if (!header) return;

	const setOffset = () => {
		document.documentElement.style.setProperty(
			'--header-h',
			header.offsetHeight + 'px'
		);
	};

	// первичная установка + при ресайзе
	setOffset();
	window.addEventListener('resize', setOffset, { passive: true });

	// если у тебя меню скрыто в .header__nav.collapse — пересчитать при открытии/закрытии
	document.addEventListener('shown.bs.collapse', setOffset);
	document.addEventListener('hidden.bs.collapse', setOffset);
});
document.addEventListener('DOMContentLoaded', () => {
	const header = document.querySelector('.header');
	const navEl = document.getElementById('mainNav');

	// выставляем высоту хедера в CSS-переменную
	const setHeaderOffset = () => {
		const h = header ? header.offsetHeight : 0;
		document.documentElement.style.setProperty('--header-h', h + 'px');
	};
	setHeaderOffset();
	window.addEventListener('resize', setHeaderOffset, { passive: true });
	document.addEventListener('shown.bs.collapse', setHeaderOffset);
	document.addEventListener('hidden.bs.collapse', setHeaderOffset);

	// плавный скролл с учётом фикс-хедера + закрытие меню на мобиле
	document.querySelectorAll('.header__link[href^="#"]').forEach(a => {
		a.addEventListener('click', e => {
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			e.preventDefault();

			const y =
				target.getBoundingClientRect().top +
				window.pageYOffset -
				(header ? header.offsetHeight : 0);
			window.scrollTo({ top: y, behavior: 'smooth' });

			// скрыть мобильное меню
			if (navEl && navEl.classList.contains('show')) {
				bootstrap.Collapse.getOrCreateInstance(navEl).hide();
			}
		});
	});

	// ScrollSpy — подсветка активного пункта
	new bootstrap.ScrollSpy(document.body, {
		target: '#mainNav',
		rootMargin: '0px 0px -70% 0px', // активируем чуть раньше
		offset: header ? header.offsetHeight : 0
	});
});