$(function(){

    $(".works-show-1 li img").each(function(index,el){
          if($(this).data("original")==""){
              $(this).parent("li").remove();
          }
    });
     $("#art_video .item a").each(function(index,el){
          if($(this).text()==""){
              $(this).parent("li").addClass("videoHide");
          }
    });
    for(var i=0;i<3;i++){
        var index=Math.floor(Math.random()*6);
        $(".courses-wrap .item").eq(index).addClass("active");
    }
    var xgkc=$("#xgkc").html().split(",");
    for (var i = 0; i < xgkc.length; i++) {

         var str="";
         console.log(xgkc[i].length+"-----");
         if(xgkc[i].length!=1){
           str='<li class="item active">'+
                                    '<div class="item-txt">'+
                                        '<p>'+xgkc[i]+'</p>'+
                                    '</div>'+
                                '</li>';
                                 $(".courses-wrap ul").append(str);
         }

    }

});
