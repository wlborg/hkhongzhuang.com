/*
* @Author: August1Rush
* @FileName:list_faculty.js
* @Date:   2019-01-04 11:23:30
* @Last Modified by:   Administrator
* @Last Modified time: 2019-01-08 14:15:31
*/
getZhwei();
 function getZhwei(){
        var teaLi=$(".tea_fdiv2 li").length;
        for(var i=0;i<teaLi;i++){
              var zhi1=$(".tea_fdiv2 li").eq(i).find(".tea_hidee").text().split(",")[0];
              $(".tea_fdiv2 li").eq(i).find(".tea_zw").html(zhi1);//第一个职位
              var zhi2=$(".tea_fdiv2 li").eq(i).find(".tea_hidee").text().split(",")[1];
              $(".tea_fdiv2 li").eq(i).find(".tea_zc").html(zhi2);//第一个职位
        }
 }
 //首页课程切换
function cour(){
    var tabs2=document.getElementById("teacher_tab").getElementsByTagName("li");
    var divs2=document.getElementById("tea_list_Con").getElementsByTagName("div");
    for(var i=0;i<tabs2.length;i++){
        tabs2[i].onmouseover=function(){change2(this);}
    }
    function change2(obj){
        for(var i=0;i<tabs2.length;i++){
            if(tabs2[i]==obj){
                tabs2[i].className="teacher_fli2";
                divs2[i].className="tea_fdiv2";
            }else{
                tabs2[i].className="";
                divs2[i].className="";
            }
        }
       getZhwei();
    }

}

cour();
function more_Fn(){
        var _content = []; //临时存储li循环内容
        var jq22 = {
            _default:6, //默认显示图片个数
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
function houver_Fouce_Fn(){
    $('#tea_list_Con>div>ul>li').hover(function(){
        $(this).addClass('tea_fouce');
    },function(){
        $(this).removeClass('tea_fouce');
    })
}
$(function(){
      var tool={
                more:function(){
                    more_Fn();//首页新闻模块获取
                },
                houver_Fouce(){
                    houver_Fouce_Fn();
                }
          };
        // tool.more();
        tool.houver_Fouce();
});
