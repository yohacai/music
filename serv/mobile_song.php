<?php
$song = $_POST["songName"];
$singer = $_POST["singer"];
$mid = $_POST["mid"];
$res = $song."|".$singer."|".$mid;
file_put_contents("song.txt", $res);
?>