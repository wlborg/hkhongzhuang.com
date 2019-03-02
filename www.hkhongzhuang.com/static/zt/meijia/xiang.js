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
var bi=0;
//    $('.box li').eq(bi).show().siblings().hide();
function baa() {
    $('.box li').eq(bi).show().siblings().hide();
    bi++

    if (bi>2){
        bi=0
    }
}
bb=setInterval(baa,2000);
$('.xpage-l').click(function () {

    if (bi==0){
        bi=3
    }
    $('.box li').eq(--bi).show().siblings().hide();

});
$('.xpage-r').click(function () {


    if (bi==2){
        bi=-1
    }
    $('.box li').eq(++bi).show().siblings().hide();
});
$(".xpage>div").hover(
    function () {
        clearInterval(bb);
    },function () {
        bb = setInterval(baa, 2000);
    }
);
