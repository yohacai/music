<?php
$act = $_POST["act"];
file_put_contents("play.txt", $act);
?>