
var swiper1 = new Swiper('.m2mrs', {
    direction: 'horizontal',
    loop: true,
    autoplay: 2500,//自动轮播
    speed: 2000,
    nextButton: '.lunleft',
    prevButton: '.lunright',
    autoplayDisableOnInteraction: false,
    paginationClickable: true,
    paginationType: 'custom',
    paginationCustomRender: function (swiper, current, total) {
        var customPaginationHtml = "";
        for (var i = 1; i <= total; i++) {
            //判断哪个分页器此刻应该被激活
            if (i == current) {
                customPaginationHtml += '<span class="m5active2">'+'</span>';
            } else {
                customPaginationHtml += '<span>'+ '</span>';
            }
        }
        return customPaginationHtml;
    }
//
});
$('.m2mrs').mouseenter(function () {
    swiper1.stopAutoplay();
}).mouseleave(function () {
    swiper1.startAutoplay()
});
