
$(function(){

    $(".works-pic .row a>img").each(function(index,el){
          if($(this).data("original")==""){
              $(this).parent("a").remove();
          }
    });
    //视频模块为空时隐藏
      $(".video_row a").each(function(index,el){

          if($(".video_row a").eq(index).html().trim().length==0||$(this).text().trim()==" "||$(this).html().trim()==" "){

              $(this).addClass("videoHide");
              // $("#art_video .item a").eq(index).parent("li").addClass("videoHide");
          }
    });
    for(var i=0;i<3;i++){
        var index=Math.floor(Math.random()*6);
        $(".courses-wrap .item").eq(index).addClass("active");
    }
    var xgkc=$("#xgkc").html().split(",");

          for (var i = 0; i < xgkc.length; i++) {
            var str="";
            if(xgkc[i].length!=1){
                            var str='<div class="item item1 active">'+
                                      '<span>'+xgkc[i]+'</span>'+
                                     '</div>';
                                       $(".item-wrapper").append(str)
          }
       }
 $(".logo>a>img").attr("src","/static/images/loge2.png");//更换logo
});
