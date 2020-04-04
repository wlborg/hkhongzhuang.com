
$(function () {
    var swiper = new Swiper('.part1_swiper', {
        spaceBetween: 0,
        centeredSlides: true,
        autoplay: {delay: 4000, disableOnInteraction: false,},
        loop: true,
        navigation: {nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',},
        on: {
            slideChangeTransitionStart: function () {
                var num = (this.realIndex);
                $(".tab li").removeClass("active");
                $(".tab li:eq(" + num + ")").addClass("active");
            }
        }
    });
    /*$('.tab li').click(function () {
        var index = $(this).index();
        swiper.slideTo(index + 1);
    });*/
    $('.tab li').mouseenter(function () {
        var index = $(this).index();
        swiper.slideTo(index + 1);
    });
    if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
        new WOW().init();
    };
});

$(function(){
    // 提供工具api:
    var tools = (
        function(module) {

            module.brand_honour = function(con,obj) {
                var brand_honour_container = new Swiper(con, {
                    slidesPerView: 3,
                    spaceBetween: 81,
                    loop:true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: con+' .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: obj+' .swiper-button-next',
                        prevEl: obj+' .swiper-button-prev'
                    }
                });
            };
            return module;
        }
    )(window.tools || {});
    tools.brand_honour('.part6 .swiper-container','.part6');//品牌页面设备轮播图
});

