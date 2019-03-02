
$(function(){

    $(".works-pic .row a>img").each(function(index,el){
          if($(this).data("original")==""){
              $(this).parent("a").remove();
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
