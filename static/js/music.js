var nowTime = 0;
var allTime = 0;
var timeFlag ;
var timeSlideFlag = 0;
var rotateFlag;   //cd脨媒脳陋卤锚脰戮
var logoImgRotate = 0;
var nowPage = 1;
var allPage = 0;
var pattern = "circle";
var index = "";
var nums = 0;
var playUIControl = function(state,name,singer)
{
	$play = $("#play");
	if(state=="play")
	{
		$play.attr("class","fa fa-pause fa-2x icon controlBu");
		$("#play").attr("state","play");
	}
	else
	{
		$play.attr("class","fa fa-play fa-2x icon controlBu");
		$("#play").attr("state","pause");
	}
}
var displayResult = function(data)
{
	$resWrap = $("#resultWrap");
	$resWrap.html("");
	for(i=0;i<data[0].length;i++)
	{
		$ul = $("<ul class='seItemWrap'></ul>");
		$name = $('<li class="seItem seName"></li>');
		$name.attr("title",data[1][i]);
		$name.html(data[1][i]);
		$ul.append($name);
		$singer = $('<li class="seItem seSinger"></li>');
		$singer.html(data[2][i]);
		$ul.append($singer);
		$play = $('<li class="seItem sePlay"></li>');
		$play.append('<i class="fa fa-headphones fa-lg listIcon" mid="'+data[0][i]+'"></i>');
		$ul.append($play);
		$add = $('<li class="seItem seAdd"></li>');
		$add.append('<i class="fa fa-plus fa-lg listIcon" mid="'+data[0][i]+'"></i>');
		$ul.append($add);
		$resWrap.append($ul);
	}
		if(data[3]>1)
		{
		allPage = data[3];
		$footer = $("<footer style='margin:20px 0 0 0' id='resPage'><button name='prePage' class='changePage'><i class='fa fa-angle-left fa-lg'></i></button><button name='nextPage' class='changePage'><i class='fa fa-angle-right fa-lg'></i></button><label style='font-size:13px;'>"+nowPage+"/"+allPage+"ҳ</label></footer>");
		$resWrap.append($footer);
		}
		initListener();
}
var initPlayListen = function(name,singer)
{
	clearInterval(timeFlag);
	$audio = $("#audio");
	$audio.bind("loadeddata",function(){
		$(".allTime").html("/"+secondToTime($audio[0].duration));
		allTime = $audio[0].duration;
		currentTime = $audio[0].currentTime;
		$("#timeWrap").html('<label class="time nowTime">'+secondToTime(currentTime)+'</label><label class="time allTime">/'+secondToTime(allTime)+'</label></label>');
		timeFlag = setInterval("changeTime()",1000);
		playUIControl("play");
		logoImgRotate = 0;
		clearInterval(rotateFlag);
		rotateFlag = setInterval("rotate()",13);
		});
	$audio.bind("ended",function(){
	switch(pattern)
	{
		case "random" :RandomPlay();break;
		case "circle" :circlePlay("f");break;
		case "repeat" :$audio[0].load();break;
		default:circlePlay("f");break;
	}
	});
}
var secondToTime = function(second)
{
   var min = parseInt(second / 60);
   var sec = parseInt(second%60);
      sec<10?sec='0'+sec:1;
   return min+":"+sec;
}
var timeToSecond = function(time)
{
	
}
var play = function(song,name,singer,action,mid){
var datas = new Array();
if(action=="play")
{
$play = $("#playWraps");
$play.html("");
$play.append("<audio id='audio' autoplay><source src='"+song[0]+"'></audio>");
$("#audio")[0].volume = 1-$("#voiceC").val();
initPlayListen(name,singer);
	index = $(".songItemWrap").index($(".songItemWrap").has("li[surl='"+song[0]+"']"));
}
$.post("curl.php",{"id":mid},function(data){
	    datas["img"] = data[1];
	    $("#musicImg").attr("src",datas["img"]);
	    datas["songName"] = name;
datas["songSinger"] = singer;
datas["url"] = song[0];
datas["cookie"] = Math.random().toString(36).substr(2);
addToList(datas);
addCookie(datas);
        },"json");
}
var playSong = function(mid,name,singer,action)
{
		if(action=="play")
		{
		$("#audio")[0]!=undefined?$("#audio")[0].pause():1;
		$("#timeWrap").html("loading...");
		clearInterval(rotateFlag);
		$("#musicName").html(name);
		$("#musicName").attr("title",name);		
		$("#singer").html(singer);
		$("#singer").attr("title",singer);
		}
 	    $.post("serv/getSong.php",{"mid":mid},function(data){play(data,name,singer,action,mid);},"json");
}

var changeTime = function()
{
	$audio = $("#audio");
	nowTime = $audio[0].currentTime;
	if(timeSlideFlag==0)
	$("#volume").val(nowTime/allTime);
	$(".nowTime").html(secondToTime(nowTime));
}

var rotate = function()
{
	$img = $("#music");
	logoImgRotate+=0.3;
	$img.css("webkitTransform","rotate("+logoImgRotate+"deg)");
}
var addToList = function(data)
{
	   if(data["songName"]==""||data["songSinger"]==""||data["url"]=="")
		   return;
	    $listBody = $("#listBody");
		$ul = $("<ul class='itemWrap songItemWrap'></ul>");
		$name = $('<li class="songItem listItem songName" surl='+data["url"]+' simg='+data["img"]+'></li>');
		$name.attr("title",data["songName"]);
		$name.html("   "+data["songName"]);
		$ul.append($name);
		$singer = $('<li class="listItem songSinger"></li>');
		$singer.html(data["songSinger"]);
		$ul.append($singer);
		$add = $('<li class="listItem songHandle"></li>');
		$add.append('<i class="fa fa-trash listIcon deleteList" id="'+data["cookie"]+'"></i>');
		$ul.append($add);
		$listBody.append($ul);
		//$name.css("cursor","pointer");
		initSongName();
		document.getElementById('listBody').scrollTop = document.getElementById('listBody').scrollHeight;
		nums++;
}
var stop = function()
{
clearInterval(rotateFlag);	
clearInterval(timeFlag);
$("#audio").html("");
playUIControl("pause");
}

var addCookie = function(data)
{
    $.post("serv/setCookie.php",{"cookie":data["cookie"],"data":{"songName":data["songName"],"songSinger":data["songSinger"],"img":data["img"],"url":data["url"]}},function(data){},"json");	
}

var RandomPlay = function()
{
    var getIndex;
	getIndex = Math.floor(Math.random()*(nums));
	while(getIndex==index)
	getIndex = Math.floor(Math.random()*(nums));
    index = getIndex;
	$(".songItemWrap").eq(index).children(".songName").click();
}
var circlePlay = function(action)
{
	if(action=="f")
	index==nums-1?index=0:index++;
	else
	index==0?index=nums-1:index--;
	$(".songItemWrap").eq(index).children(".songName").click();
}



