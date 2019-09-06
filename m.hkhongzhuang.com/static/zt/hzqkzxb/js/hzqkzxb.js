/*
* @Author: Administrator
* @FileName:hzqkzxb.js
* @Date:   2019-04-26 15:51:54
* @Last Modified by:   Administrator
* @Last Modified time: 2019-04-26 15:52:29
*/
$(function(){
     var swiper = new Swiper('.swiper-container', {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 100500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
})
