<?php
$id = $_POST['id'];
$picUrl = "http://www.kuwo.cn/yinyue/".$id."/";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$picUrl);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$picOut = curl_exec($ch);
//echo $picOut;
$reg = "#lazy_src=\"(.*)\" onerror#U";
preg_match($reg,$picOut,$n);
echo json_encode($n);
?>