function index_new_Fn(){
    var benefitactivities=$(".newNone li");//获取li元素
    var benefitactivitiesLen=benefitactivities.length;//获取li的长度
    var arr= new Array();//创建一个数组
    for(i=0;i<benefitactivitiesLen;i++){
        arr[i] = new Array();//创建多维数组
        var a1=benefitactivities.eq(i).text().split("&")[0];//分割日
        var a2=benefitactivities.eq(i).text().split("&")[1];//分割年-月
        var a3=benefitactivities.eq(i).text().split("&")[2];//分割标题
        var a4=benefitactivities.eq(i).text().split("&")[3];//分割链接
        var a5=benefitactivities.eq(i).text().split("&")[4];//分割摘要
        arr[i][0]=a1;
        arr[i][1]=a2;
        arr[i][2]=a3;
        arr[i][3]=a4;
        arr[i][4]=a5;
    }
    var swiper_benefitactivities= new Swiper('.index_new_swiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        grabCursor : true,
        lazyLoading : true,
        parallax:true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.new_Con_left_pap',
            clickable: true,
            renderBullet: function (index, className) {
                return '<ul class="new_list_index '+className+'"><a>'+
                    '<li class="new_list_index_1">'+
                    '<dd>'+arr[index][0]+'</dd>'+
                    '<dd>'+arr[index][1]+'</dd>'+
                    '</li>'+
                    ' <li>&nbsp;</li>'+
                    '<li>'+
                    '<p>'+arr[index][2]+'</p>'+
                    '<p>'+arr[index][4]+'</p>'+
                    '</li>'+
                    '</a></ul>';
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
        , lazy: {
        loadPrevNext: true,
    }
    });
}
function index_envir_Fn(){

    var swiper = new Swiper('.index_environmentdisplay_swiper', {
      on: {
            slideChange: function () {

              $(".environmentdisplay_Right_index").html("0"+this.activeIndex);
            },
       },
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
        grabCursor : true,
        parallax:true,
        lazyLoading : true,
        autoplay: {
            delay: 100000,
            disableOnInteraction: false,
        },
      pagination: {
        el: '.environmentdisplay_Right .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
      , lazy: {
        loadPrevNext: true,
    }
    });

}
function std(){
    var tabs2=document.getElementById("std_tab").getElementsByTagName("li");
    var divs2=document.getElementById("stdCon").getElementsByTagName("div");
    for(var i=0;i<tabs2.length;i++){
        tabs2[i].onmouseover=function(){change2(this);}
    }
    function change2(obj){
        for(var i=0;i<tabs2.length;i++){
            if(tabs2[i]==obj){
                tabs2[i].className="std_fli2";
                divs2[i].className="std_fdiv2";
            }else{
                tabs2[i].className="";
                divs2[i].className="";
            }
        }
    }
}
//首页课程切换
function cour(){
    var tabs2=document.getElementById("course_tab").getElementsByTagName("li");
    var divs2=document.getElementById("courseCon").getElementsByTagName("div");
    for(var i=0;i<tabs2.length;i++){
        tabs2[i].onmouseover=function(){change2(this);}
    }
    function change2(obj){
        for(var i=0;i<tabs2.length;i++){
            if(tabs2[i]==obj){
                tabs2[i].className="course_fli2";
                divs2[i].className="course_fdiv2";
            }else{
                tabs2[i].className="";
                divs2[i].className="";
            }
        }
    }
}

$(function(){
    var tool={
        index_new:function(){
            index_new_Fn();//首页新闻模块获取
        },
        index_environmentdisplay:function(){
            index_envir_Fn();//首页环境轮播图
        },
        cour_fn:function(){
            cour();//课程部分切换
        },std_fn:function(){
            std();
        }

    };
    tool.index_new();
    tool.index_environmentdisplay();//首页环境轮播图
    tool.cour_fn();
    tool.std_fn();
    //此js为懒加载对象(除了首页其他页面用此懒加载)
    function loadLazyFn(){
        $("img.lazy_index").lazyload({
            event: "scroll",//通过何种事件来加载图片
            placeholder : "../static/images/pc/icon/grey.gif", //用图片提前占位
            // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
            // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
            threshold: 200, // 提前开始加载
            // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
            // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
            // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
            failurelimit : 10 // 图片排序混乱时
            // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
        });
    }
    var lazyObj={
        loadLazy: function () {
            loadLazyFn();//页面加载完成加载
        }
    };
    lazyObj.loadLazy();
});
