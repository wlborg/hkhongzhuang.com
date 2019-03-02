function reHeight_Fn(){
  var hg=$(".list_chain_con_Main").height()-519+97;
  $(".list_chain_con_Main_C").height(hg);
}
function more_Fn(){
        var _content = []; //临时存储li循环内容
        var jq22 = {
            _default:9, //默认显示图片个数
            _loading:6,  //每次点击按钮后加载的个数
            init:function(){
                var lis = $(".jq22 .hidden li");
                $(".jq22 ul.list").html("");
                for(var n=0;n<jq22._default;n++){
                    lis.eq(n).appendTo(".jq22 ul.list");
                }
                $(".jq22 ul.list img").each(function(){
                    $(this).attr('src',$(this).attr('realSrc'));
                })
                for(var i=jq22._default;i<lis.length;i++){
                    _content.push(lis.eq(i));
                }
                $(".jq22 .hidden").html("");
            },
            loadMore:function(){
                var mLis = $(".jq22 ul.list li").length;
                for(var i =0;i<jq22._loading;i++){
                    var target = _content.shift();
                    if(!target){
                        $('.jq22 .more').html("<p>全部加载完毕...</p>");
                        break;
                    }
                    $(".jq22 ul.list").append(target);
                    $(".jq22 ul.list img").eq(mLis+i).each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                }
            }
        }
        jq22.init();
         $(".more").on("click",function(){
               jq22.loadMore();
               reHeight_Fn();
               clickFn();
         })
}
function clickFn(){

    $(".list>li").click(function(event) {
        var html="";
        /* Act on the event */
        var hg=$(".jq22").height()+50;
        //替换真正的url
        var mLis = $(".jq22 ul.list li").length;
        console.log(mLis);
        for(var i=0;i<mLis;i++){
            $(".hidwSw .swiper-slide img").eq(i).each(function(){
                $(this).attr('src',$(this).attr('realSrc'));
            });

            html=html+$(".hidwSw").eq(i).html();
            $(".article_chain_sw_sw_c .swiper-wrapper").html("");
            $(".article_chain_sw_sw_c .swiper-wrapper").html(html);
        }


        $(".article_chain_sw").show();

        $(".article_chain_sw").height(hg);//swriper轮播图遮住层
        $(".article_chain_sw_sw").show();//显示swriper轮播图
        swiper_envir=article_chain_env();

        //定位对应swiper
        var index_Sw = parseInt($(this).index())+1;
        slideToFrom(swiper_envir,index_Sw);
    });
}
function slideToFrom(caseSix,index_Sw) {
    caseSix.slideTo(index_Sw);
}
function article_chain_env(){
    var swiper = new Swiper('.article_chain_sw_sw_c', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
        grabCursor : true,
        parallax:true,
        autoplay: {
            delay: 100000,
            disableOnInteraction: false,
        },
      pagination: {
        el: '.environmentdisplay_Right .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.article_chain_right',
        prevEl: '.article_chain_left',
      },
    });
    return swiper;
}
function close_btn(){
  $(document).on("click",".list_chain_close",function(){
         $(".article_chain_sw_sw").hide();
         $(".article_chain_sw").hide();
  })
}
$(function(){
    var tool={
        reHeight:function(){
            reHeight_Fn();//首页新闻模块获取
        },
        more:function(){
           more_Fn();//加载更多
        },
        listLiClick:function(){
            clickFn();
        },
       list_env:function(){
           article_chain_env();
       },
       close:function(){
         close_btn();
       }
    };
     tool.more();
     tool.reHeight();
     tool.listLiClick();
     tool.close();//关闭按钮添加click事件
});
