
        //首页课程切换
function cour(){
    var tabs2=document.getElementById("stu_tab").getElementsByTagName("li");
    var divs2=document.getElementById("stu_list_Con").getElementsByTagName("div");
    href=window.location.href.split("?")[1];
    if(href=="cosmetology"){
        change2(tabs2[1]);
    }
    if(href=="manicure"){
        change2(tabs2[2]);
    }
    if(href=="shooting"){
        change2(tabs2[3]);
    }
    for(var i=0;i<tabs2.length;i++){
        tabs2[i].onmouseenter=function(){change2(this);}
    }
    function change2(obj){
        for(var i=0;i<tabs2.length;i++){

            if(tabs2[i]==obj){
                tabs2[i].className="stu_fli2";
                divs2[i].className="stu_fdiv2";
            }else{
                tabs2[i].className="";
                divs2[i].className="";
            }
        }
    }
}
cour();
function more_Fn1(index){
                var _content = []; //临时存储li循环内容
                var jq221 = {
                    _default:8, //默认显示图片个数
                    _loading:8,  //每次点击按钮后加载的个数
                    init:function(){
                        var lis = $(".jq22").eq(index).find("li");
                        for(var n=0;n<jq221._default;n++){
                            $("#stu_list_Con .stu_list_info").eq(index).append(lis.eq(n));
                        }
                        $("#stu_list_Con ul.stu_list_info img").each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                        for(var i=jq221._default;i<lis.length;i++){
                            _content.push(lis.eq(i));
                        }
                    },
                    loadMore1:function(index){
                        var mLis = $("#stu_list_Con ul.stu_list_info").eq(index).find("li").length;
                        for(var i =0;i<jq221._loading;i++){
                            var target = _content.shift();
                            if(!target){
                                $('.stu_list_more').eq(index).html("全部加载完毕...");
                                break;
                            }
                            $("#stu_list_Con .stu_list_info").eq(index).append(target);
                            $("#stu_list_Con .stu_list_info").eq(index).find("img").eq(mLis+i).each(function(){
                                $(this).attr('src',$(this).attr('realSrc'));
                            });
                        }
                    }
                };
                jq221.init();
                $(".stu_list_more1").on("click",function(){
                    jq221.loadMore1(0);
                });
                function reIndex(){
                    var index=$("#stu_tab li.stu_fli2").index();
                    return index;
                }

        }
function more_Fn2(index){
            var _content2 = []; //临时存储li循环内容
            var jq222 = {
                _default:8, //默认显示图片个数
                _loading:8,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".jq22").eq(index).find("li");
                    for(var n=0;n<jq222._default;n++){
                        $("#stu_list_Con .stu_list_info").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.stu_list_info img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq222._default;i<lis.length;i++){
                        _content2.push(lis.eq(i));
                    }
                },
                loadMore2:function(index){
                    var mLis = $("#stu_list_Con ul.stu_list_info").eq(index).find("li").length;
                    for(var i =0;i<jq222._loading;i++){
                        var target = _content2.shift();
                        if(!target){
                            $('.stu_list_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .stu_list_info").eq(index).append(target);
                        $("#stu_list_Con .stu_list_info").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq222.init();
            $(".stu_list_more2").on("click",function(){
                jq222.loadMore2(1);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
function more_Fn3(index){
            var _content3 = []; //临时存储li循环内容
            var jq223 = {
                _default:8, //默认显示图片个数
                _loading:8,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".jq22").eq(index).find("li");
                    for(var n=0;n<jq223._default;n++){
                        $("#stu_list_Con .stu_list_info").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.stu_list_info img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq223._default;i<lis.length;i++){
                        _content3.push(lis.eq(i));
                    }
                },
                loadMore3:function(index){
                    var mLis = $("#stu_list_Con ul.stu_list_info").eq(index).find("li").length;
                    for(var i =0;i<jq223._loading;i++){
                        var target = _content3.shift();
                        if(!target){
                            $('.stu_list_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .stu_list_info").eq(index).append(target);
                        $("#stu_list_Con .stu_list_info").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq223.init();
            $(".stu_list_more3").on("click",function(){
                jq223.loadMore3(2);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
function more_Fn4(index){
            var _content4 = []; //临时存储li循环内容
            var jq224 = {
                _default:8, //默认显示图片个数
                _loading:8,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".jq22").eq(index).find("li");
                    for(var n=0;n<jq224._default;n++){
                        $("#stu_list_Con .stu_list_info").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.stu_list_info img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq224._default;i<lis.length;i++){
                        _content4.push(lis.eq(i));
                    }
                },
                loadMore4:function(index){
                    var mLis = $("#stu_list_Con ul.stu_list_info").eq(index).find("li").length;
                    for(var i =0;i<jq224._loading;i++){
                        var target = _content4.shift();
                        if(!target){
                            $('.stu_list_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .stu_list_info").eq(index).append(target);
                        $("#stu_list_Con .stu_list_info").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq224.init();
            $(".stu_list_more4").on("click",function(){
                jq224.loadMore4(3);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
more_Fn1(0);
more_Fn2(1);
more_Fn3(2);
more_Fn4(3);
        //视频预览图
       function removeVideo(index){
           var firLen=$(".vi").eq(index).find("li").length;
           try{
               for(var k=0;k<firLen;k++){
                   var firV=$(".vi").eq(index).find("li").eq(k).find("img").attr("realsrc");
                   if(firV.indexOf("uploads")==-1){
                       $(".vi").eq(index).find("li").eq(k).addClass("remove");
                   }
               }
           }catch(err){

           }
           function remo(){
               $(".vi").eq(index).find("li.remove").remove();
               if( $(".vi").eq(index).find("li.remove").length!=0) {
                   remo();
               }
           }
           remo();
       }
        function more_Fn1_1(index){
            removeVideo(index);//视频模块图片地址为空时移除
            var _content = []; //临时存储li循环内容
            var jq221 = {
                _default:6, //默认显示图片个数
                _loading:6,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".vi").eq(index).find("li");
                    for(var n=0;n<jq221._default;n++){
                        $("#stu_list_Con .list_stu_video").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.list_stu_video img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq221._default;i<lis.length;i++){
                        _content.push(lis.eq(i));
                    }
                },
                loadMore1_1:function(index){
                    var mLis = $("#stu_list_Con ul.list_stu_video").eq(index).find("li").length;
                    for(var i =0;i<jq221._loading;i++){
                        var target = _content.shift();
                        if(!target){
                            $('.stu_list_video_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .list_stu_video").eq(index).append(target);
                        $("#stu_list_Con .list_stu_video").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq221.init();
            $(".stu_list_video_more1").on("click",function(){
                jq221.loadMore1_1(0);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
        function more_Fn1_2(index){
            removeVideo(index);//视频模块图片地址为空时移除
            var _content = []; //临时存储li循环内容
            var jq221 = {
                _default:6, //默认显示图片个数
                _loading:6,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".vi").eq(index).find("li");
                    for(var n=0;n<jq221._default;n++){
                        $("#stu_list_Con .list_stu_video").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.list_stu_video img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq221._default;i<lis.length;i++){
                        _content.push(lis.eq(i));
                    }
                },
                loadMore1_2:function(index){
                    var mLis = $("#stu_list_Con ul.list_stu_video").eq(index).find("li").length;
                    for(var i =0;i<jq221._loading;i++){
                        var target = _content.shift();
                        if(!target){
                            $('.stu_list_video_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .list_stu_video").eq(index).append(target);
                        $("#stu_list_Con .list_stu_video").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq221.init();
            $(".stu_list_video_more2").on("click",function(){
                jq221.loadMore1_2(1);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
        function more_Fn1_3(index){
            removeVideo(index);//视频模块图片地址为空时移除
            var _content = []; //临时存储li循环内容
            var jq221 = {
                _default:6, //默认显示图片个数
                _loading:6,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".vi").eq(index).find("li");
                    for(var n=0;n<jq221._default;n++){
                        $("#stu_list_Con .list_stu_video").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.list_stu_video img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq221._default;i<lis.length;i++){
                        _content.push(lis.eq(i));
                    }
                },
                loadMore1_3:function(index){
                    var mLis = $("#stu_list_Con ul.list_stu_video").eq(index).find("li").length;
                    for(var i =0;i<jq221._loading;i++){
                        var target = _content.shift();
                        if(!target){
                            $('.stu_list_video_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .list_stu_video").eq(index).append(target);
                        $("#stu_list_Con .list_stu_video").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq221.init();
            $(".stu_list_video_more3").on("click",function(){
                jq221.loadMore1_3(2);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
        function more_Fn1_4(index){
            removeVideo(index);//视频模块图片地址为空时移除
            var _content = []; //临时存储li循环内容
            var jq221 = {
                _default:6, //默认显示图片个数
                _loading:6,  //每次点击按钮后加载的个数
                init:function(){
                    var lis = $(".vi").eq(index).find("li");
                    for(var n=0;n<jq221._default;n++){
                        $("#stu_list_Con .list_stu_video").eq(index).append(lis.eq(n));
                    }
                    $("#stu_list_Con ul.list_stu_video img").each(function(){
                        $(this).attr('src',$(this).attr('realSrc'));
                    });
                    for(var i=jq221._default;i<lis.length;i++){
                        _content.push(lis.eq(i));
                    }
                },
                loadMore1_4:function(index){
                    var mLis = $("#stu_list_Con ul.list_stu_video").eq(index).find("li").length;
                    for(var i =0;i<jq221._loading;i++){
                        var target = _content.shift();
                        if(!target){
                            $('.stu_list_video_more').eq(index).html("全部加载完毕...");
                            break;
                        }
                        $("#stu_list_Con .list_stu_video").eq(index).append(target);
                        $("#stu_list_Con .list_stu_video").eq(index).find("img").eq(mLis+i).each(function(){
                            $(this).attr('src',$(this).attr('realSrc'));
                        });
                    }
                }
            };
            jq221.init();
            $(".stu_list_video_more4").on("click",function(){
                jq221.loadMore1_4(3);
            });
            function reIndex(){
                var index=$("#stu_tab li.stu_fli2").index();
                return index;
            }

        }
        more_Fn1_1(0);
        more_Fn1_2(1);
        more_Fn1_3(2);
        more_Fn1_4(3);
function checkNull(){
    for(var i=0;i<4;i++){
        if($(".list_stu_video").eq(i).html().trim()==""){
           $(".stu_list_video_more").eq(i).hide();
        }
    }
}checkNull();
        $(function () {
            function tabCon() {
                for (var i = 0; i < 4; i++) {
                    var liLen = $("#stu_list_Con>div").eq(i).find(".stu_list_info>li").length;
                    if (liLen <= 6) {
                        $("#stu_list_Con>div").eq(i).find(".stu_list_more").css("display", "none");
                    }
                };

            }
            tabCon();
        });
