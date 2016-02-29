<?php
/*$data['play'] = file_get_contents("http://yoha.ga/music/serv/play.txt");
$data['song'] = file_get_contents("http://yoha.ga/music/serv/song.txt");
$data['vol'] = file_get_contents("http://yoha.ga/music/serv/vol.txt");*/

$data['play'] = file_get_contents("play.txt");
$data['song'] = file_get_contents("song.txt");
$data['vol'] = file_get_contents("vol.txt");

file_put_contents("play.txt", "");
file_put_contents("song.txt", "");
file_put_contents("vol.txt", "");

echo json_encode($data);
?>