$(document).ready(function () {
     $(".box2_min_left li").click(function () {
         $(".box2_min_left li").removeClass("bg_active");
         $(this).addClass("bg_active");
         $(".box2_min_left li p").removeClass("p_line");
         $(this).find("p").addClass("p_line");
         var li=$(this).index();
         $(".box2_min_right li").removeClass("right_active");
         $(".box2_min_right li").eq(li).addClass("right_active");
     });
    $(".right_anniu p").click(function () {
        $(this).parents(".right_anniu").find("p").removeClass("bg_anniu");
        $(this).addClass("bg_anniu");
        var p=$(this).index();
        $(this).parents(".right_active").find(".box2_li_right_con").removeClass("con_active");
        $(this).parents(".right_active").find(".box2_li_right_con").eq(p).addClass("con_active");
        clearInterval(interval);
    });
    function run(){
        interval=setInterval(function () {
            var y=$(".box2_min_left li.bg_active").index();
            if (y>1){
                y=-1;
                $(".box2_min_left li").eq(y+1).click();
            }else {
                $(".box2_min_left li").eq(y+1).click();
            }
        },3500);
    }
    run();

})