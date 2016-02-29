<?php
$command = $_POST["command"];
$cookie = @$_POST["cookie"];
$id = $_COOKIE["id"];
function getRandChar($length){
   $str = null;
   $strPol = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
   $max = strlen($strPol)-1;

   for($i=0;$i<$length;$i++){
    $str.=$strPol[mt_rand(0,$max)];
   }
   return $str;
  }
$id==""?setcookie("id",time().getRandChar(6),time()+365*24*3600):1;
if($command=="query")
{
$i = 0;
@ $fp=fopen($id.".txt",'r');
if(!$fp)
	die();
while (!feof($fp))
{
 $temp = fgets($fp);
 $temp = explode("~",$temp);
 $data[$i]["cookie"] = $temp[0];
 $song = @explode("|",$temp[1]);
 $data[$i]["songName"] = $song[0];
 @$data[$i]["songSinger"] = $song[1];
 @$data[$i]["url"] = $song[2];
 @$data[$i]["img"] = $song[3];
 $i+=1;
}
echo json_encode($data);
}
else
{
$tmp=tempnam("H:\Appserv\html5music\serv","TMP0");
@$f2=fopen($tmp,'w');
 @ $fp=fopen($id.".txt",'r+');
while (!feof($fp))
{
 $line = fgets($fp);
 $temp = explode("~",$line);
 if($cookie!=$temp[0])
 { 
   fwrite($f2,$line);
 }	 
} 
@fclose($fp);
unlink($id.".txt");
@fclose($f2);
rename($tmp,$id.".txt");
}


?>