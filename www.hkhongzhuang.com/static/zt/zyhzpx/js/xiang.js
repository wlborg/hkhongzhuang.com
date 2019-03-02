$(document).ready(function(){ 
       var $key=0;
    var speed=1000;
  var timer=setInterval(autoplay,5000)
function autoplay(){
     $(".lunbo-box ul").eq($key).hide();
     $key++;
     $key=$key%$(".lunbo-box ul").length;
     $(".lunbo-box ul").eq($key).fadeIn();
  };
 });

$(document).ready(function(){ 
          $(".show1").click(function(){
       $('html, body').animate({scrollTop:4480}, 1000); 
          })

          $(".show2").click(function(){
          	$("html,body").animate({scrollTop:5120},1000)
          })

          $(".show3").click(function(){
          	$("html,body").animate({scrollTop:5760+"px"},1000)
          })

          $(".show4").click(function(){
          	$("html,body").animate({scrollTop:6400+"px"},1000)
          })



	 });


  // var $sve=$(".main-seven").height();

  //    $(window).scroll(function() {
     
  //       var s = $(window).scrollTop();
  //       if (s >$banner) {
  //        $(".faclick").fadeIn(500);
  //            };
  //       if (s <$banner) {
  //        $(".faclick").fadeOut(500);
  //            };
  //       }); 