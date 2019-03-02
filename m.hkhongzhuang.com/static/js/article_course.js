function marqueeBanner(containerClass, itemClass) {
    var target = $(itemClass);
    if (!target) return;
    var bannerItemCount = target.length;
    var targetItemWidth = parseInt(target.eq(1).css('width'));
    var marginRight = parseInt(target.eq(1).css('marginRight'));

    var newBom = target.clone();
    var margueeTarget = $(containerClass);
    margueeTarget.css('width', (targetItemWidth + marginRight) * bannerItemCount * 2)
    margueeTarget.append(newBom)

    var widthLen = (targetItemWidth + marginRight) * bannerItemCount;
    var currLen = 0;
    var stop = false;
    var timer = null;
    var marqueeTargetFun = function() {
        currLen++;
        if (currLen > widthLen) {
            margueeTarget.css({ 'left': 0 });
            currLen = 0;
        } else {
            margueeTarget.css({ 'left': -currLen });
        }
        if (window.requestAnimationFrame && !stop) {
            requestAnimationFrame(marqueeTargetFun);
        } else if (!window.requestAnimationFrame && timer == null) {
            timer = setInterval(marqueeTargetFun, 20);
        }
    };

    function onMove(e) {
        var x, y
        x = e.originalEvent.changedTouches[0].pageX,

            detaX = startX - x
        var newCurrentLen = currLen + detaX
        margueeTarget.css({ 'left': -newCurrentLen });
    }
    var startX;
    var startY;
    var detaX;
    margueeTarget.on("touchstart", function(e) {
        if (window.requestAnimationFrame) {
            stop = true;
        } else {

            clearTimeout(timer);
        }
        startX = e.originalEvent.changedTouches[0].pageX,
            startY = e.originalEvent.changedTouches[0].pageY;
        margueeTarget.on('touchmove', onMove)
    });



    margueeTarget.on("touchend", function(e) {

        var moveEndX = e.originalEvent.changedTouches[0].pageX,
            moveEndY = e.originalEvent.changedTouches[0].pageY,
            X = moveEndX - startX,
            Y = moveEndY - startY;
        //左滑
        if (X > 0 && Math.abs(X) > Math.abs(Y)) {
            currLen += X
        }
        //右滑
        else if (X < 0 && Math.abs(X) > Math.abs(Y)) {
            currLen -= X
        }
        margueeTarget.off('touchmove', onMove)
        if (window.requestAnimationFrame) {
            stop = false;
            marqueeTargetFun()
        } else {

            setInterval(marqueeTargetFun, 20)
        }

    });

    marqueeTargetFun();
}
// 学生学过的课程
function course() {
    // body...
    var target = $('.course .item')
    if (!target) return;
    var randomNum = Math.ceil(Math.random() * 6)

    for (var i = 0; i < randomNum; i++) {
        target.eq(Math.ceil(Math.random() * 6) - 1).addClass('active')

    }

}
// 课程列表slider
function courseSlider() {
    if(!$('.course1 .swiper-container')) return;
    var swiper = new Swiper('.course1 .swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });
}
function courseArticlePicSlider() {
   if(!$('.coursePic .swiper-container')) return;
    var swiper = new Swiper('.coursePic .swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        loop:true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
      pagination: {
        el: '.coursePic .swiper-pagination',
        clickable: true,
      }
    });
}
function courseArticleTeacherSlider() {
   if(!$('.courseTeacher .swiper-container')) return;
    var swiper = new Swiper('.courseTeacher .swiper-container', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        }
    });
}
function getZhi(){
    //分割职位
    var zhi1=$(".zhiweiHide").html().split(",")[0];
    var zhi2=$(".zhiweiHide").html().split(",")[1];
    $(".title-txt").eq(0).html(zhi1);
    $(".title-txt").eq(1).html(zhi2);
}
function getHor(){
    //获得荣誉
    var honerCon=$(".art_hor_hide").html().split(",");
    var len=honerCon.length;
    for(var i=0;i<len;i++){
        $(".flag").append("<span>"+honerCon[i]+"</span>");
    }
}
function article_course_ck_Fn(){
        // 安排课程第二个轮播
        var mySwiper_ap = new Swiper('.swiper-container-kecheng', {
            autoplay: 3000,//可选选项，自动滑动
            loop:true,
            speed:900,
            grabCursor : true,
            parallax:true,
            //allowTouchMove: false,
            navigation: {
                nextEl: '.icon_courseMore',
                prevEl: '.swiper-next',
            }
        });
    }
    function keSplit(){
        var tool={
            article_course_ck:function(){
                article_course_ck_Fn();//课程轮播图
            }
        };
        var kecheng=$(".kecheng").html().split(",");
        var kechengLen=$(".kecheng").html().split(",").length;
        var html="";
        var res="";
        function len12(list){
            html="<div class='swiper-slide'>";
            for(var i=0;i<list;i++){
                html=html+"<li>";
                html=html+kecheng[i];
                html=html+"</li>";
            }
            html=html+"</div>";
        }
        function len22(list){
            html=html+"<div class='swiper-slide'>";
            for(var i=12;i<list;i++){
                html=html+"<li>";
                html=html+kecheng[i];
                html=html+"</li>";
            }
            html=html+"</div>";
        }
        function len32(list){
            html=html+"<div class='swiper-slide'>";
            for(var i=24;i<list;i++){
                html=html+"<li>";
                html=html+kecheng[i];
                html=html+"</li>";
            }
            html=html+"</div>";
        }
        if(kechengLen>0){
            if(kechengLen>0&&kechengLen<=12){
                if(kechengLen==12){
                    len12(12);
                }else {
                    len12(kechengLen);
                }
            }
            if(kechengLen>12&&kechengLen<=24){
                len12(12);
                if(kechengLen==24){
                    len22(24);
                }else {
                    len22(10+(kechengLen%10)-1);
                }
            }
            if(kechengLen>24&&kechengLen<=36){
                len12(12);
                len22(24);
                if(kechengLen==36){
                    len32(36);
                }else {
                    len32(20+(kechengLen%10)-1);
                }
            }
            $(".swiper-container-kecheng .swiper-wrapper").append(html);
            tool.article_course_ck();
        }
    }

$(function() {
    // 新闻顶部滚动banner
    marqueeBanner('.banner .slider-container', '.banner .item');
    // 课程列表滚动课程
    marqueeBanner('.course2 .slider-container', '.course2  .item');
    marqueeBanner('.course3 .slider-container', '.course3 .item');
    marqueeBanner('.course4 .slider-container', '.course4 .item');
    course();
    courseSlider();
    courseArticlePicSlider();
    // courseArticleTeacherSlider();//课程详情页的授课老师
    getZhi();
    getHor();//获得荣誉
    article_course_ck_Fn();
    keSplit();//分割课程
})
