$(document).ready(function() {
    var mySwiper1 = new Swiper('.box3_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        loop:true,
        navigation: {
            nextEl: '.swiper-button-next',
        },
        pagination: {
            el: '.pagination2',
        },
    })
    var mySwiper1 = new Swiper('.box4_swiper', {
        direction: 'horizontal',
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        loop:true,
        pagination: {
            el: '.pagination4',
        },
    })


})