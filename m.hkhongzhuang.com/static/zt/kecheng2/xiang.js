
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
var uu=$(".bn").height()+$(".show-in").height()*2+$(".main1").height()+$(".main2").height()+$(".main3").height();
var ii=uu+$(".main4-body").height();
var oo=ii+$(".main4-body").height();
var pp=oo+$(".main4-body").height();
          $(".show1").click(function(){
       $('html, body').animate({scrollTop:uu}, 1000); 
          })
          $(".show2").click(function(){
          	$("html,body").animate({scrollTop:ii},1000)
          })
          $(".show3").click(function(){
          	$("html,body").animate({scrollTop:oo+"px"},1000)
          })
          $(".show4").click(function(){
          	$("html,body").animate({scrollTop:pp+"px"},1000)
          })
	 });