/*
* @Author: Administrator
* @FileName:list_news.js
* @Date:   2018-12-27 10:13:35
* @Last Modified by:   Administrator
* @Last Modified time: 2018-12-27 10:54:02
*/
$(function(){

    $(function(){
              $(".new_list_con>li").hover(function(){
                  var index=$(this).index();
                      $(".list_new_fouce_line").removeClass('list_new_fouce_Line');
                      $(".list_new_fouce_line").eq(index).addClass("list_new_fouce_Line")
              })
    })

})
