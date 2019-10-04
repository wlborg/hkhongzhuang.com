$(function () {
    function tabCon() {
        for (var i = 0; i < 4; i++) {
            var liLen = $("#stu_list_Con>div").eq(i).find(".stu_list_info>li").length;
            console.log(liLen+"---------------");
            if (liLen <= 6) {
                $("#stu_list_Con>div").find(".stu_list_more").css("display", "none");
            }
        };

    }
    tabCon();
});

