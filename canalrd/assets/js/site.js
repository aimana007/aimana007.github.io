(function ($) {
    "use strict";

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var windowOn = $(window);

    // preloader
    windowOn.on('load', function () {
        $('#loading').fadeOut(300);
    });

    // offcanvas menu
    $('.tp-offcanvas-toogle').on('click', function () {
        $('.tp-offcanvas').addClass('tp-offcanvas-open');
        $('.tp-offcanvas-overlay').addClass('tp-offcanvas-overlay-open');
    });
    $('.tp-offcanvas-close-toggle, .tp-offcanvas-overlay, .tp-offcanvas-menu a').on('click', function () {
        $('.tp-offcanvas').removeClass('tp-offcanvas-open');
        $('.tp-offcanvas-overlay').removeClass('tp-offcanvas-overlay-open');
    });

    // sticky header
    windowOn.on('scroll', function () {
        var scrollTop = windowOn.scrollTop();
        scrollTop < 20
            ? $('#header-sticky').removeClass('header-sticky')
            : $('#header-sticky').addClass('header-sticky');
    });

    // back to top
    var backToTopBtn = $('#back_to_top');
    var backToTopWrapper = $('.back-to-top-wrapper');
    windowOn.on('scroll', function () {
        windowOn.scrollTop() > 300
            ? backToTopWrapper.addClass('back-to-top-btn-show')
            : backToTopWrapper.removeClass('back-to-top-btn-show');
    });
    backToTopBtn.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, prefersReducedMotion ? 0 : 300);
    });

    // parallax backgrounds
    if (typeof jarallax === 'function' && !prefersReducedMotion) {
        jarallax(document.querySelectorAll('.jarallax'), { speed: 0.2 });
    }

    // photo gallery lightbox
    $('.popup-image').magnificPopup({
        type: 'image',
        gallery: { enabled: true }
    });

    // walkthrough video lightbox
    $('.popup-video').magnificPopup({
        type: 'iframe'
    });

    // gallery carousel
    if (document.querySelector('.tp-project-gallery-active')) {
        new Swiper('.tp-project-gallery-active', {
            slidesPerView: 1.15,
            spaceBetween: 16,
            loop: true,
            autoplay: prefersReducedMotion ? false : { delay: 3500, disableOnInteraction: true },
            speed: 600,
            breakpoints: {
                568: { slidesPerView: 2, spaceBetween: 20 },
                992: { slidesPerView: 3, spaceBetween: 20 }
            }
        });
    }

    // scroll-reveal, skipped entirely for reduced-motion users
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        var revealItems = document.querySelectorAll('.reveal');
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        revealItems.forEach(function (item) { observer.observe(item); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (item) {
            item.classList.add('is-visible');
        });
    }

})(jQuery);
