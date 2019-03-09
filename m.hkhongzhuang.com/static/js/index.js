$(function(){
    function index_stu_sw_Fn(){
              var swiper = new Swiper('.index_stu_true', {
                 autoplay: {
                delay: 4500,
                disableOnInteraction: false,
                   },
                  slidesPerView: 1,
                  spaceBetween: 30,
                  loop: 4500,
                   pagination: {
                        el: '.index_stu_n .index_stu_paption',
                        type: 'custom',
                        renderCustom: function (swiper, current, total) {
                          return '<span>'+current+'</span>' + '<span class="_po_absolute">&nbsp;</span> ' + '<span>'+total+'</span>';
                        }
                    },
                  navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                  },
                });
    }
    function index_cour_sw_Fn(){
        var swiper = new Swiper('.courseCon', {
             autoplay: {
                delay: 16000,
                disableOnInteraction: false,
                   },
            slidesPerView: 1,
            spaceBetween: 30,
            loop: 16000,
            pagination: {
                el: '.index_cou .index_stu_paption',
                type: 'custom',
                renderCustom: function (swiper, current, total) {
                    return '<span>'+current+'</span>' + '<span class="_po_absolute">&nbsp;</span> ' + '<span>'+total+'</span>';
                }
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

          on: {
            slideChangeTransitionStart: function(){
              // alert(this.activeIndex);
              var num=(this.realIndex);
              if(num==0){
                $(".index_coure_title").html("化妆课程");
                indexCA(num);
              }else if (num==1) {
                $(".index_coure_title").html("美容课程");
                 indexCA(num);
              }else if (num==2) {
                $(".index_coure_title").html("美甲课程");
                 indexCA(num);
              }else if (num==3) {
                $(".index_coure_title").html("摄影课程");
                 indexCA(num);
              }
              function indexCA(index){
                   $(".index_coure_top_nav>li").eq(index).addClass('index_cou_active');
                   $(".index_coure_top_nav>li").eq(index).siblings("li").removeClass('index_cou_active');
              }
            },
          }
        });
        $("body").on("click",".index_coure_top_nav>li",function(){
              var index=$(this).index()+1;
               swiper.slideTo(index);
        })
    }
    function index_envi_sw_Fn(){
            var swiper = new Swiper('.index_envi', {
                  on: {
                        slideChange: function () {
                          $(".index_envicon_index").html("0"+this.activeIndex);
                           },
                   },
                  slidesPerView: 1,
                  spaceBetween: 0,
                  loop: 2500,
                    lazyLoading : true,
                   pagination: {
                        el: '.index_envicon .index_envi_paption',
                        type: 'custom',
                        renderCustom: function (swiper, current, total) {
                          return '<span>'+current+'</span>' + '<span class="_po_absolute">&nbsp;</span> ' + '<span>'+total+'</span>';
                        }
                    },
                     lazy: {
                       loadPrevNext: true,
                     }
                });
    }
    // 首页新闻模块
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
            delay: 25000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.new_Con_left_pap',
            clickable: true,
            renderBullet: function (index, className) {
                return '<ul class="new_list_index '+className+'"><a>'+
                    '<li class="new_list_index_1"><dl>'+
                    '<dd>'+arr[index][0]+'</dd>'+
                    '<dd>'+arr[index][1]+'</dd></dl>'+
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


    var tool={
                index_stu_sw:function(){
                    index_stu_sw_Fn();//首页作品模块获取
                },
                index_envi_sw:function(){
                      index_envi_sw_Fn();
                },
                index_new:function(){
                    index_new_Fn();//首页新闻模块获取
                },
                index_cour_sw:function(){
                        index_cour_sw_Fn();//首页课程模块获取
                }
    };
    tool.index_stu_sw();
    tool.index_envi_sw();
    tool.index_new();
    tool.index_cour_sw();
});
