//PC端自适应
	window.onresize = function () {
	    rem()
	};
	// 进行rem的计算 因为是已1920px为基准进行计算的，所以为了方便，把1rem等于100px
	function rem() {
	    var whdef = 100/1920;// 表示1920的设计图,使用100PX的默认值
	    var wH = window.innerHeight;// 当前窗口的高度
	    var wW = window.innerWidth;// 当前窗口的宽度
	    var rem = wW * whdef;// 以默认比例值乘以当前窗口宽度,得到该宽度下的相应FONT-SIZE值
	    $('html').css('font-size', rem + "px");
	}
	rem();
$(function(){
	function article_course_ck_Fn(){
		// 安排课程第二个轮播
		var mySwiper_ap = new Swiper('.swiper-container-2', {
			autoplay: 3000,//可选选项，自动滑动
			loop:true,
			speed:900,
			grabCursor : true,
			parallax:true,
			//allowTouchMove: false,
			navigation: {
				nextEl: '.swiper-prev',
				prevEl: '.swiper-next',
			}
		});
	}
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
		$(".swiper-container-2 .swiper-wrapper").append(html);
		tool.article_course_ck();
	}
	//分割职位
	var zhi1=$(".zhiweiHide").html().split(",")[0];
	var zhi2=$(".zhiweiHide").html().split(",")[1];
	$(".title-txt").eq(0).html(zhi1);
	$(".title-txt").eq(1).html(zhi2);
	//获得荣誉
	var honerCon=$(".art_hor_hide").html().split(",");
	var len=honerCon.length;
	for(var i=0;i<len;i++){
		$(".info-tap .clearFix").append("<li class='tab-item'>"+honerCon[i]+"</li>");
	}
	//学生作品轮播
	var swiper_stu = new Swiper('.swiper-container-1', {
		slidesPerView: 4,
		grabCursor : true,
		parallax:true,
		spaceBetween: 4,
		loop:true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		navigation: {
			nextEl: '.arrowL',
			prevEl: '.arrowR',
		}
	});
	//大型活动
	var mySwiper1_news = new Swiper('.swiper-container-3', {
		loop: true,
		speed: 2500,
		autoplay: 2500,
		effect : 'fade',
		pagination: {
			el: '.swiper-container-3 .swiper-pagination',
			clickable: true,
		}
	});

});



