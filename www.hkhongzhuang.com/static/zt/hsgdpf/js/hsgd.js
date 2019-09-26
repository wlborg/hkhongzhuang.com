$(document).ready(function () {
    var swiper = new Swiper('.box5_swiper', {
        slidesPerView: 3,
        centeredSlides: true,
        loop: true,
        autoplay: {delay: 3000, disableOnInteraction: false,},
        pagination: {
            el: '.pagination2',
            clickable: true,
        },
    });
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    };
})