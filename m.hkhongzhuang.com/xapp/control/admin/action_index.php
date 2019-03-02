<?php

class seo_index extends Base{
    function ac_make(){
        $templet = SEOTEMPLETS."/admin/makehtml.htm";
        $this->LoadTemplate($templet);
        $this->Display();
    }
    
    function ac_xml()
    {
        global $cfg_basedir,$cfg_cmspath;
        require_once(DEDEINC."/arc.partview.class.php");

         //各个栏目的sitemap索引 
        $murl_large=$cfg_cmspath."/sitemap_large.xml";
        $murl_student=$cfg_cmspath."/sitemap_student.xml"; 
        $murl_environmentdisplay=$cfg_cmspath."/sitemap_environmentdisplay.xml";
        $murl_course=$cfg_cmspath."/sitemap_course.xml";  
        $murl_zt=$cfg_cmspath."/sitemap_zt.xml";
        $murl_brand=$cfg_cmspath."/sitemap_brand.xml";
        $murl_news=$cfg_cmspath."/sitemap_news.xml"; 
        $murl_faculty=$cfg_cmspath."/sitemap_faculty.xml";                        
        $murl = $cfg_cmspath."/sitemap.xml";


        //各个栏目的sitemap索引模板
        $tmpfile_large=SEOTEMPLETS."/admin/sitemap_large.xml";
        $tmpfile_student=SEOTEMPLETS."/admin/sitemap_student.xml"; 
        $tmpfile_environmentdisplay=SEOTEMPLETS."/admin/sitemap_environmentdisplay.xml";
        $tmpfile_course=SEOTEMPLETS."/admin/sitemap_course.xml";  
        $tmpfile_zt=SEOTEMPLETS."/admin/sitemap_zt.xml";
        $tmpfile_brand=SEOTEMPLETS."/admin/sitemap_brand.xml";
        $tmpfile_news=SEOTEMPLETS."/admin/sitemap_news.xml"; 
        $tmpfile_faculty=SEOTEMPLETS."/admin/sitemap_faculty.xml";  
        $tmpfile = SEOTEMPLETS."/admin/sitemap.xml";
   
        $pv = new PartView();

        //加载各个栏目sitemap索引模板
        $pv->SetTemplet($tmpfile_large); 
        $pv->SaveToHtml($cfg_basedir.$murl_large);

        $pv->SetTemplet($tmpfile_student); 
        $pv->SaveToHtml($cfg_basedir.$murl_student);

        $pv->SetTemplet($tmpfile_environmentdisplay); 
        $pv->SaveToHtml($cfg_basedir.$murl_environmentdisplay); 

        $pv->SetTemplet($tmpfile_course); 
        $pv->SaveToHtml($cfg_basedir.$murl_course); 

        $pv->SetTemplet($tmpfile_zt); 
        $pv->SaveToHtml($cfg_basedir.$murl_zt); 

        $pv->SetTemplet($tmpfile_brand); 
        $pv->SaveToHtml($cfg_basedir.$murl_brand);

        $pv->SetTemplet($tmpfile_news); 
        $pv->SaveToHtml($cfg_basedir.$murl_news); 

        $pv->SetTemplet($tmpfile_faculty); 
        $pv->SaveToHtml($cfg_basedir.$murl_faculty); 
       
        $pv->SetTemplet($tmpfile);
        $pv->SaveToHtml($cfg_basedir.$murl);
        echo "<a href='$murl' target='_blank'>成功更新文件: $murl 浏览...</a>";
        exit();
    }
    
    function ac_txt()
    {
        global $cfg_basehost,$cfg_basedir,$cfg_cmspath,$cfg_multi_site,$dsql;
        $str = $cfg_basehost."\r\n";
        $murl = $cfg_basedir.$cfg_cmspath."/sitemap.txt";
        $dsql->Execute('me',"SELECT * FROM #@__arctype");
        while($arcRow = $dsql->GetArray())
        {
            $typeurl = GetTypeUrl($arcRow['id'],$arcRow['typedir'],$arcRow['isdefault'],$arcRow['defaultname'],
                        $arcRow['ispart'],$arcRow['namerule2'],$arcRow['moresite'],$arcRow['siteurl'],$arcRow['sitepath']);
             
            if($cfg_multi_site == 'N' && $arcRow['ispart'] != 2)
            {
                $str .= $cfg_basehost.$typeurl."\r\n";
            }else{
                $str .= $typeurl."\r\n";
            }
        }
        $query = "Select arc.id,arc.title,arc.shorttitle,arc.typeid,arc.ismake,arc.senddate,arc.arcrank,arc.money,arc.filename,arc.litpic,
                            t.typedir,t.typename,t.namerule,t.namerule2,t.ispart,t.moresite,t.siteurl,t.sitepath
                            from `#@__archives` arc left join #@__arctype t on arc.typeid=t.id  WHERE arc.ismake > 0 ";
        $dsql->Execute('a1',$query);
        while($aRow = $dsql->GetArray('a1'))
        {
            $arcurl = GetFileUrl($aRow['id'],$aRow['typeid'],$aRow['senddate'],$aRow['title'],$aRow['ismake'],
                        $aRow['arcrank'],$aRow['namerule'],$aRow['typedir'],$aRow['money'],$aRow['filename'],$aRow['moresite'],$aRow['siteurl'],$aRow['sitepath']);
            if($cfg_multi_site == 'N')
            {
                $str .= $cfg_basehost.$arcurl."\r\n";
            }else{
                $str .= $arcurl."\r\n";
            }
        }
        file_put_contents($murl,$str);
        echo "<a href='/sitemap.txt' target='_blank'>成功更新文件: /sitemap.txt 浏览...</a>";
        exit();
    }
    
}