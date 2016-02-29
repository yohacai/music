var initListener = function()
{
	$(".sePlay").click(function(){
		stop();
		var mid = $(this).children().attr("mid");
		$singer = $(this).prev();
		$name = $singer.prev();
		playSong(mid,$name.html(),$singer.html(),"play");		
		});
	$(".seName").click(function(){
	//alert($(this).html());
	$(this).next().next().click();
    });
	$(".seAdd").click(function(){
		var mid = $(this).children().attr("mid");
		$singer = $(this).prev().prev();
		$name = $singer.prev();
		playSong(mid,$name.html(),$singer.html(),"add");	
	});
	$(".changePage").click(function(){
		var name = $(this).attr('name');
		var se = $("#seInput").val();
		if(name=="prePage")
		{
			if(nowPage == 1)
				return;
			else
			{
				nowPage--;
			    $.post("serv/search.php",{"se":se,"page":nowPage},function(data){displayResult(data);},"json");
			}
		}
		else
		{
			if(nowPage == allPage)
				return;
			else
			{
				nowPage++;
			    $.post("serv/search.php",{"se":se,"page":nowPage},function(data){displayResult(data);},"json");
			}
		}
	});
}

var initSongName = function()
{
	$(".songName").off();
	$(".deleteList").off();
	$(".songName").click(function(){
var surl = $(this).attr("surl");
var simg = $(this).attr("simg");
var name = $(this).attr("title");
var singer = $(this).next().html();
	index = $(".songItemWrap").index($(".songItemWrap").has("li[surl='"+surl+"']"));
if($("#audio").children().attr("src"))
if(surl==$("#audio").children().attr("src").replace(/(^\s*)|(\s*$)/g, ""))
	return;
	stop();
		$("#timeWrap").html("ª∫≥Â÷–...");
		$("#musicName").html(name);
		$("#musicName").attr("title",name);		
		$("#singer").html(singer);
		$("#singer").attr("title",singer);
$play = $("#playWraps");
$play.html("");
$play.append("<audio id='audio' autoplay><source src='"+surl+"'></audio>");
$("#audio")[0].volume = 1-$("#voiceC").val();
$("#musicImg").attr("src",simg);
initPlayListen(name,singer);
});
$(".deleteList").click(function(){
	$(this).parent().parent().remove();
	$.post("serv/queryCookie.php",{"command":"delete","cookie":$(this).attr("id")},function(data){},"json");
});
}
var init = function()
{
$.post("serv/queryCookie.php",{"command":"query"},function(data){
	for(i=0;i<data.length;i++)
	addToList(data[i]);
},"json");
}
$(document).ready(function(){
		init();
$("#seBu").click(function(){
	var se = $("#seInput").val();
	if(se!="")
	{
	   $("#seTop").show();
	   $("#logo").hide();
		$.post("serv/search.php",{"se":se,"page":1},function(data){nowPage=1;displayResult(data);},"json");
	}
}); //À—À˜∞¥≈•µ„ª˜º‡Ã˝

$("#volume").change(
function()
{
	var val = $(this).val();
	$("#audio")[0].currentTime = allTime*val;
}
);
$("#volume").mousedown(
function(){timeSlideFlag = 1;}
);
$("#volume").mouseup(
function(){timeSlideFlag = 0;}
);

$("#search").click(function(){
	$musicPage = $("#musicPage");
	var right = $musicPage.css("right");
	right=="-500px"?$musicPage.css("right","300px"):$musicPage.css("right","-500px");
	$("#ani:visible").hide();
	$("#ani:hidden").show();
});

$("#play").click(function(){
	var state = $(this).attr("state");
	$audio = $("#audio");
	if(state=="pause")
	{
		$audio[0].play();
		$(this).attr("state","play");
		$(this).attr("class","fa fa-pause fa-2x icon controlBu");
		rotateFlag = setInterval("rotate()",13);
	}
	else
	{
		$audio[0].pause();
		$(this).attr("state","pause");
		$(this).attr("class","fa fa-play fa-2x icon controlBu");
		clearInterval(rotateFlag);
	}
});

$("#seInput").keydown(function(event){
  if(event.keyCode==13) 
            $("#seBu").click();
			 else
				 return;
});

$("#repeat").click(function(){
	$("#random").removeClass("hover");
	pattern == "repeat"?(pattern="circle",$(this).removeClass("hover")):(pattern="repeat",$(this).addClass("hover"));
	
});
$("#random").click(function(){
	$("#repeat").removeClass("hover");
	pattern == "random"?(pattern="circle",$(this).removeClass("hover")):(pattern="random",$(this).addClass("hover"));
});

$("#forward").click(function(){
	switch(pattern)
	{
		case "random" :RandomPlay();break;
		case "circle" :circlePlay("f");break;
		default:circlePlay("f");break;
	}
});
$("#backward").click(function(){
	switch(pattern)
	{
		case "random" :RandomPlay();break;
		case "circle" :circlePlay("b");break;
		default:circlePlay("b");break;
	}
});

$("#listBu").click(function(){
	$("#musicList:visible").hide(500);
	$("#musicList:hidden").show(500);
});

$("#voice").click(function(){
	$("#voiceWrap:visible").slideUp(100);
	$("#voiceWrap:hidden").slideDown(100);	
});
$("#voiceC").bind("change",function(){
	$("#audio")[0].volume = 1-$(this).val();
});
});