$(document).ready(function () {
     $(".box2_min_left li").mouseenter(function () {
         $(".box2_min_left li").removeClass("bg_active");
         $(this).addClass("bg_active");
         $(".box2_min_left li p").removeClass("p_line");
         $(this).find("p").addClass("p_line");
         var li=$(this).index();
         $(".box2_min_right li").removeClass("right_active");
         $(".box2_min_right li").eq(li).addClass("right_active");
     })
    $(".right_anniu p").mouseenter(function () {
        $(this).parents(".right_anniu").find("p").removeClass("bg_anniu");
        $(this).addClass("bg_anniu");
        var p=$(this).index();
        $(this).parents(".right_active").find(".box2_li_right_con").removeClass("con_active");
        $(this).parents(".right_active").find(".box2_li_right_con").eq(p).addClass("con_active");
    })

})