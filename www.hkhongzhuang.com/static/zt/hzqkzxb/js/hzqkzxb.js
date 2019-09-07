/*
* @Author: Administrator
* @FileName:hzqkzxb.js
* @Date:   2019-04-26 11:21:00
* @Last Modified by:   Administrator
* @Last Modified time: 2019-04-26 15:02:12
*/
$(function(){
    new WOW().init();
    var swiper = new Swiper('.part10 .swiper-container', {
      slidesPerView: 4,
      spaceBetween: 25,
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      lazy: {
        loadPrevNext: true
      }
    });
    var swiper = new Swiper('.part5 .swiper-container', {
      slidesPerView: 5,
      spaceBetween: 25,
      loop:true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
       navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
       lazy: {
        loadPrevNext: true
      }
    });

})

