<?php
$id = $_COOKIE["id"];
$cookie = $_POST["cookie"];
$data = $_POST["data"];
$songName = $data["songName"];
$songSinger = $data["songSinger"];
$url = $data["url"];
$img = $data["img"];
function clearCookie()
{
foreach($_COOKIE as $key => $value)
{
	setcookie($key."[songName]","",time()-1);
	setcookie($key."[songSinger]","",time()-1);
	setcookie($key."[url]","",time()-1);
	setcookie($key."[img]","",time()-1);
}
}
//clearCookie();
$save = $cookie."~".$songName."|".$songSinger."|".$url."|".$img."\r\n";
file_put_contents($id.".txt",$save,FILE_APPEND);
?>