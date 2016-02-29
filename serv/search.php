<?php
header("Content-type: text/html; charset=utf-8"); 
$se = $_POST["se"];
//$se = "周杰伦";
$page= $_POST["page"];
$url="http://sou.kuwo.cn/ws/NSearch?key=".$se."&type=music&pn=".$page;
$ch = curl_init();
curl_setopt($ch,CURLOPT_URL,$url);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$output = curl_exec($ch);
curl_close($ch);
//var_dump($output);
$reg = "#mid\=\"(.*)\" />#U";
preg_match_all($reg,$output,$m1);
$reg = "#s_name.*title=\"(.*)\".*<\/p>#U";
preg_match_all($reg,$output,$m3);
$reg = "#<p class=\"m_name\">.*title=\"(.*)\".*<\/p>#Us";
preg_match_all($reg,$output,$m2);
//var_dump($m2);
for($i=0;$i<count($m3[1]);$i++)
{
	$reg = "#title=\"(.*)\"#U";
	preg_match_all($reg,$m3[0][$i],$m);
	if(count($m[0])>1)
	{
		for($j=0;$j<count($m[0]);$j++)
			$j==0?$result[2][$i]=$m[1][$j]:$result[2][$i].="&".$m[1][$j];
	}
	else
		$result[2][$i] = $m[1][0];
}
$reg = "#pn=(.*)\">尾页</a>#U";
preg_match_all($reg,$output,$m4);
$result[0] = $m1[1];
$result[1] = $m2[1];
//$result[2] = $m3[1];
$result[3] = $m4[1];
$m1 = "";
$m2 = "";
$m3 = "";
echo json_encode($result);
?>