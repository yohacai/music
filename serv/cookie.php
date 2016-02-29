<?php
$cookie = $_POST["cookie"];
$data = $_POST["data"];
file_put_contents("dfd.txt",$data);
$songName = $data["songName"];
$songSinger = $data["songSinger"];
$url = $data["url"];
$img = $data["img"];
function clearCookie()
{
foreach($_COOKIE as $key => $value)
{
	setcookie($key."['songName']","",time()-1);
	setcookie($key."['songSinger']","",time()-1);
	setcookie($key."['url']","",time()-1);
	setcookie($key."['img']","",time()-1);
}
}
//clearCookie();
setcookie($cookie."['songName']",$songName,time()+3600*24*365);
setcookie($cookie."['songSinger']",$songSinger,time()+3600*24*365);
setcookie($cookie."['url']",$url,time()+3600*24*365);
setcookie($cookie."['img']",$img,time()+3600*24*365);
?>