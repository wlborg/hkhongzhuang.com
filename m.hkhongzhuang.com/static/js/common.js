/*
* @Author: chaihongjun
* @email:   root@chaihongjun.me
* @File name: common.js
* @Date:   2019-02-23 16:40:21
* @Last Modified by:   chaihongjun
* @Last Modified time: 2019-02-23 16:40:42
* @Description: 移动端JS配置文件.
*/
$(function(){
     var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?e763d33211a14384cbe70ea9604da82c";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    var banner_swiper = new Swiper('.banner_swiper_container', {
      slidesPerView: 1,
        autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                   },
      spaceBetween: 30,
      loop: 3000,
       pagination: {
        el: '.banner_swiper_container .swiper-pagination',
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return '<span>'+current+'</span>' + ' <span class="line">&nbsp;</span> ' + '<span>'+total+'</span>';
        }
       }
    });
    function index_top_fn(){
        $(".site-nav").on("click",function(){
            $(".content").addClass("nav-animate");
            $(".contentWrap").addClass("Wrap-animate");

            $("body").css("overflow","hidden");

        })
        $(".WrapTap").on("click",function(){
            $(".content").removeClass("nav-animate");
            $(".contentWrap").removeClass("Wrap-animate");

            $("body").css("overflow","inherit");
        })
    }

    function sideNavHightlight() {
        if (!$('#sideNav')) return;
        var href = window.location.href;

        $('#sideNav').find("a").each(function () {
            var targetHref = $(this).attr("href");
            if (href.indexOf(targetHref) >= 0) {
                $(this).addClass("active-item").siblings().removeClass('active-item');
            }
        });
    }
    var tool_nav={
        index_top:function(){
            index_top_fn();
        },
        footNav:function(){
            sideNavHightlight();
        }
    };
    tool_nav.index_top();
    tool_nav.footNav();

    var bodyHg=$(window).height();
    var headerHg=$("#header").height();
    var footHg=$(".index_footer_nav").height();
    /*console.log(bodyHg);
    console.log(headerHg);
    console.log(footHg);*/
    //alert(bodyHg);
    //alert(headerHg);
    //alert(footHg);
    var htmlFont=$("html").css('font-size').split("px")[0];
    var wrHG=((bodyHg-headerHg-footHg)/htmlFont)+4;

    //alert(htmlFont);
    //alert(wrHG)
    $(".Wrapnav").height(wrHG+"rem");
    $(".top_con_nav").height(wrHG-2+"rem");
    $(".top_con_nav").css("overflow","auto");
    $(".j-consult").bind("click",function(){
                            // var href="https://hztk5.kuaishang.cn/bs/im.htm?cSource=2&cas=56599___926520&fi=65113";
                            var href="https://m.hkhongzhuang.com/kst.html";
                            window.open(href,"_blank");
                        })

var tools_kst = (
    function(module) {
         function addScript(src) {
            var bldyE = document.getElementsByTagName("body");
            var scriptE = document.createElement("script");
            scriptE.setAttribute("type", "text/javascript");
            scriptE.setAttribute("src", src);
            if (bldyE.length) {
                bldyE[0].appendChild(scriptE);
            } else {
                document.documentElement.appendChild(scriptE);
            }
        }
        module.addKSTScript = function() {
            addScript("https://hztk5.kuaishang.cn/bs/ks.j?cI=926520&fI=65113&ism=1");
        }

        return module;
    }
)(window.tools_kst || {});
tools_kst.addKSTScript();
});

//注册 Serviceworker
if('serviceWorker'in navigator){navigator.serviceWorker.register('/serviceworker.js');}

// 注册 quicklink
window.addEventListener('load', () =>{
   quicklink();
})

// 百度推送 改良版
//改良版本的百度索引自动推送脚本
    (function(){
        var canonicalURL, curProtocol;
        //Get the  tag
        var x=document.getElementsByTagName("link");
        //Find the last canonical URL
        if(x.length > 0){
            for (i=0;i<x.length;i++){
                if(x[i].rel.toLowerCase() == 'canonical' && x[i].href){
                    canonicalURL=x[i].href;
                }
            }
        }
        //Get protocol
        if (!canonicalURL){
            curProtocol = window.location.protocol.split(':')[0];
        }
        else{
            curProtocol = canonicalURL.split(':')[0];
        }
        //Get current URL if the canonical URL does not exist
        if (!canonicalURL) canonicalURL = window.location.href;
        //Assign script content. Replace current URL with the canonical URL
        !function(){var e=/([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,r=canonicalURL,t=document.referrer;if(!e.test(r)){var n=(String(curProtocol).toLowerCase() === 'https')?"https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif":"//api.share.baidu.com/s.gif";t?(n+="?r="+encodeURIComponent(document.referrer),r&&(n+="&l="+r)):r&&(n+="?l="+r);var i=new Image;i.src=n}}(window);})();