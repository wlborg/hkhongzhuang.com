function marqueeBanner() {
    var target = $('.banner .item');
    var bannerItemCount = target.length;
    var targetItemWidth = parseInt(target.eq(1).css('width'));
    var marginRight = parseInt(target.eq(1).css('marginRight'));

    var newBom = target.clone();
    var margueeTarget = $('.banner .slider-container');
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


$(function() {
    // 新闻顶部滚动banner
   marqueeBanner();
   // 去掉下拉跳转到第几页
   $("select[name='add']").hide();
})
