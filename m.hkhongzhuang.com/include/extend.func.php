<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);

    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");

    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);

    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);

    //返回结果
    return $lit_imglist;
}
function replaceurl($newurl)
{
$newurl='https://www.hkhongzhuang.com'.$newurl;
return $newurl;
}
//获取对应老师的文档id
function getcaseproject($tea_id)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
    where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$imgafter = replaceurl($row["pc_list"]);
$title = cn_substr($row["title"],80,0);
}
if($ns>0){
$relatecase.= '<img src="'.$imgafter.'">';
}
return $relatecase;
}
//获取对应老师的职位
function getTeaZhi($tea_id)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
    where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$imgafter = replaceurl($row["pc_list"]);
$title = cn_substr($row["title"],80,0);
$zhiwei = cn_substr($row["zhiwei"],80,0);
}
if($ns>0){
$relatecase.=$zhiwei;
}
return $relatecase;
}
//获取对应老师的职位
function getTeaSu($tea_id)
{
global $dsql;
$relatecase="";
$relatetypeid = "";
$indicators="";
$list="";
$counter=0;
$dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
    where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
$dsql->Execute();
$ns = $dsql->GetTotalRow();
while($row=$dsql->GetArray())
{
$id = $row["id"];
$pc_stu = replaceurl($row["pc_stu"]);

}
if($ns>0){
$relatecase.= '<img src="'.$pc_stu.'">';
}
return $relatecase;
}

//获取对应老师的文档摘要
 function getTeaDes($tea_id)
 {
 global $dsql;
 $relatecase="";
 $relatetypeid = "";
 $indicators="";
 $list="";
 $counter=0;
 $dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
     where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
 $dsql->Execute();
 $ns = $dsql->GetTotalRow();
 while($row=$dsql->GetArray())
 {
 $id = $row["id"];
 $description = cn_substr($row["description"],255,0);
 }
 if($ns>0){
 $relatecase.=$description;
 }
 return $relatecase;
 }
 //获取对应老师的荣誉
   function art_hor_hide($tea_id)
   {
   global $dsql;
   $relatecase="";
   $relatetypeid = "";
   $indicators="";
   $list="";
   $counter=0;
   $dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
       where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
   $dsql->Execute();
   $ns = $dsql->GetTotalRow();
   while($row=$dsql->GetArray())
   {
   $id = $row["id"];
   $honor = cn_substr($row["honor"],80,0);
   }
   if($ns>0){
   $relatecase.=$honor;
   }
   return $relatecase;
   }
   //获取对应老师的头像 pc_info字段
     function getTeaHead($tea_id)
     {
     global $dsql;
     $relatecase="";
     $relatetypeid = "";
     $indicators="";
     $list="";
     $counter=0;
     $dsql->SetQuery( "SELECT  * FROM #@__archives AS a,dede_addon22 as b
         where a.id =b.aid and a.id='$tea_id' and  a.arcrank=0");
     $dsql->Execute();
     $ns = $dsql->GetTotalRow();
     while($row=$dsql->GetArray())
     {
     $id = $row["id"];
     $pc_info = replaceurl($row["pc_info"]);
     }
     if($ns>0){
          $relatecase.= '<img src="'.$pc_info.'">';
     }
     return $relatecase;
     }
