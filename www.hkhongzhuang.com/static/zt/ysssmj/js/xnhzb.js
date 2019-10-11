new WOW().init();
var swiper = new Swiper('.part5_swiper-container', {
      slidesPerView: 2,
      spaceBetween: 84,
      loop:true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.part5 .part5_left',
        prevEl: '.part5 .part5_right',
      },
    });
