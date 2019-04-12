$(function() {
    //此js为懒加载对象
    function loadLazyFn() {
        $("img.lay_com").lazyload({
            placeholder: "/static/images/pc/icon/grey.gif", //用图片提前占位
            // placeholder,值为某一图片路径.此图片用来占据将要加载的图片的位置,待图片加载时,占位图则会隐藏
            //effect: "fadeIn", // 载入使用何种效果
            // effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
            threshold: 200, // 提前开始加载
            // threshold,值为数字,代表页面高度.如设置为200,表示滚动条在离目标位置还有200的高度时就开始加载图片,可以做到不让用户察觉
            // event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标莫过或点击图片才开始加载,后两个值未测试…
            // container,值为某容器.lazyload默认在拉动浏览器滚动条时生效,这个参数可以让你在拉动某DIV的滚动条时依次加载其中的图片
            // container:"body",
            //failurelimit : 10 // 图片排序混乱时
            // failurelimit,值为数字.lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况,failurelimit意在加载N张可见区域外的图片,以避免出现这个问题.
        });
    }
    loadLazyFn();
    //点击微信icon
    $(".footer_weixin_btn").click(function() {
        $(".footer_weixin").show();
    })
    $(".foot_wei_close").click(function() {
        $(".footer_weixin").hide();
    });
    $(".j-consult").bind("click", function() {
        // var href="https://hztk5.kuaishang.cn/bs/im.htm?cSource=2&cas=56599___926520&fi=65113";
        var href = "https://www.hkhongzhuang.com/kst.html";
        window.open(href, "_blank");
    })
});
/* serviceworker */
//注册  serviceWorker
//if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/serviceworker.js'); }
// 延迟注册serviceWorker
window.addEventListener('load', function() {
  if('serviceWorker' in navigator){
     navigator.serviceWorker.register('/serviceworker.js').then(function (registration) {
      console.log('Service Worker Registered,register script: serviceworker.js.');
    }).catch(function (error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  }
});

//显示service worker缓存占用情况
if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(estimate => {
        console.log(`Using ${estimate.usage/1024/1024} out of ${estimate.quota/1024/1024} MB.And the proportion is ${estimate.usage/estimate.quota*100}%`);
    });
}


//PWA 用户端监测
self.addEventListener('error', function (event) {
  var msg = {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    stack: event.error && event.error.stack
  };
  // report error msg
});

self.addEventListener('unhandledrejection', function (event) {
  // event.reason
  if (/Quota exceeded/i.test(event.reason)) {
    // maybe clean some cache here
  }
});

//初始化
window.addEventListener('load', () => {
    // tools_kst.addKSTScript();
    // 初始化 quicklink
    quicklink({
        priority: true,
        origins:[
            'www.hkhongzhuang.com',
            'm.hkhongzhuang.com'
        ]
     });
    //                //添加百度快商通
    // var tools_kst = (
    //     function(module) {
    //          function addScript(src) {
    //             var bldyE = document.getElementsByTagName("body");
    //             var scriptE = document.createElement("script");
    //             scriptE.setAttribute("type", "text/javascript");
    //             scriptE.setAttribute("src", src);
    //             if (bldyE.length) {
    //                 bldyE[0].appendChild(scriptE);
    //             } else {
    //                 document.documentElement.appendChild(scriptE);
    //             }
    //         }
    //         module.addKSTScript = function() {
    //             addScript("https://hztk5.kuaishang.cn/bs/ks.j?cI=926520&fI=65113");
    //         }
    //         return module;
    //     }
    // )(window.tools_kst || {});
});
// 百度推送 改良版
//改良版本的百度索引自动推送脚本
(function() {
    var canonicalURL, curProtocol;
    //Get the  tag
    var x = document.getElementsByTagName("link");
    //Find the last canonical URL
    if (x.length > 0) {
        for (i = 0; i < x.length; i++) {
            if (x[i].rel.toLowerCase() == 'canonical' && x[i].href) {
                canonicalURL = x[i].href;
            }
        }
    }
    //Get protocol
    if (!canonicalURL) {
        curProtocol = window.location.protocol.split(':')[0];
    } else {
        curProtocol = canonicalURL.split(':')[0];
    }
    //Get current URL if the canonical URL does not exist
    if (!canonicalURL) canonicalURL = window.location.href;
    //Assign script content. Replace current URL with the canonical URL
    ! function() { var e = /([http|https]:\/\/[a-zA-Z0-9\_\.]+\.baidu\.com)/gi,
            r = canonicalURL,
            t = document.referrer; if (!e.test(r)) { var n = (String(curProtocol).toLowerCase() === 'https') ? "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif" : "//api.share.baidu.com/s.gif";
            t ? (n += "?r=" + encodeURIComponent(document.referrer), r && (n += "&l=" + r)) : r && (n += "?l=" + r); var i = new Image;
            i.src = n } }(window);
})();
