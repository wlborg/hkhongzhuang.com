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
            timer = setInterval(marqueeTargetFun, 50);
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
function debounce(fn, delay) {
    var timer = null;
    return function() {
        var that = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(
            function() {
                fn.apply(that, arguments);
            }, delay)
    }
}
function ScrollToDo() {
    this.targets = [];
    this.scrollH = 0;
    this.viewportH = $(window).height();
    this.init();
}
ScrollToDo.prototype.add = function(classname, fn) {
    var offset = 0;
    var height = 0;
    if (typeof classname == "number") {
        offset = classname;
        height = 300;
    } else {
        var el = $(classname).eq(0);
        if (!el) return;
        offset = el.offset().top;//各个课程距离顶部的距离
        console.log('')
        height = el.height();//页面各个课程高度
    }
    var target = { 'offset': offset, "height": height, "fn": fn, "state": 0 };
    // console.log(height);
    this.targets.push(target);
    // console.log(this.targets);
}
ScrollToDo.prototype.init = function() {
    var self = this;
    this.scrollH = $(document).scrollTop();
    $(window).scroll(function() { debounce(self.do(self), 200) });
};
ScrollToDo.prototype.do = function(self) {
    var scrollH = self.scrollH = $(document).scrollTop();
      console.log('scrollH---'+(scrollH+200));
    var targets = self.targets;
    if (targets.length) {
        targets.forEach(function(el, i, a) {
            // if (scrollH > el.offset-el.height && scrollH < el.offset + self.viewportH) {
            console.log('el.offset---'+el.offset);
            if (scrollH +200>= el.offset && scrollH < el.offset) {
                if (el.state == 0) {
                    (el.fn)();
                    el.state = 1;
                }
            } else {
               // $('#sideNav li a').removeClass("active-item");
               //  $("#course1").eq(0).addClass("active-item")
                el.state = 0;
                // console.log(el.state);
            }
        });
    }
    console.log('-----------');
}
    function addScrollToDo() {
    var targetNav = $('#sideNav li a');
    var scrolldo = new ScrollToDo();
     scrolldo.add("#course1", function() {
        targetNav.removeClass("active-item");
        targetNav.eq(0).addClass("active-item");

    });
    scrolldo.add("#course2", function() {
        targetNav.removeClass("active-item");
        targetNav.eq(1).addClass("active-item");

    });
     scrolldo.add("#course3", function() {
        targetNav.removeClass("active-item");
        targetNav.eq(2).addClass("active-item");

    });
    scrolldo.add("#course4", function() {
         targetNav.removeClass("active-item");
        targetNav.eq(3).addClass("active-item");

    });
}
$(function() {
    // 课程列表滚动课程
    marqueeBanner('.course2 .slider-container', '.course2  .item');
    marqueeBanner('.course3 .slider-container', '.course3 .item');
    marqueeBanner('.course4 .slider-container', '.course4 .item');
    course();
    courseSlider();
    courseArticlePicSlider();
    courseArticleTeacherSlider();
     //course.html
    function coursePageCustom() {
        var url = window.location.href;
        if (url.indexOf('course') >= 0) {
            addScrollToDo();
        }
    }
    coursePageCustom();
})
