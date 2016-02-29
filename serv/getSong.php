<?php
header("Content-type: text/html; charset=utf-8"); 
$mid = $_POST["mid"];
/*
$picUrl = "http://www.kuwo.cn/yinyue/".$mid."/";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$picUrl);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$picOut = curl_exec($ch);
$reg = "#lazy_src=\"(.*)\" onerror#U";
preg_match($reg,$picOut,$n);*/
$url1 = "http://antiserver.kuwo.cn/anti.s?rid=MUSIC%5F".$mid."&response=url&format=acc%7Cmp3&type=convert%5Furl";
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url1);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$url = curl_exec($ch);
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HEADER, true);  
$output = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if($http_code==302)
{
	$reg = "#Location: (.*)#";
	preg_match($reg,$output,$m);
	$result[0] = $m[1];
}
if($http_code==200)
	$result[0] = $url;
/*{
	$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_HEADER, true);  
$output = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if($http_code==302)
{
	$reg = "#Location: (.*)#";
	preg_match($reg,$output,$m);
	$result[0] = $m[1];
}
}*/
$result[1] = 1;//$n[1];
curl_close($ch);

echo json_encode($result);
?>