$("#volBu").bind("touchstart",function(){
   var vol = $(this).prev().val();
   $.post("serv/mobile_vol.php",{"vol":vol},function(data){});
});

$("#play").bind("touchstart",function(){
	$.post("serv/mobile_play.php",{"act":"play"},function(data){});
});
$("#left").bind("touchstart",function(){
	$.post("serv/mobile_play.php",{"act":"left"},function(data){});
});
$("#right").bind("touchstart",function(){
	$.post("serv/mobile_play.php",{"act":"right"},function(data){});
});
$("#random").bind("touchstart",function(){
	$.post("serv/mobile_play.php",{"act":"random"},function(data){});
});
seFlag = 0;
nowPage = 1;
var addEventListener = function()
{
	$(".songItem").bind("click",function(){
		var songName = $($(this).children()[0]).html();
		var singer = $($(this).children()[1]).html();
		var mid = $(this).attr("mid");
		$.post("serv/mobile_song.php",{"songName":songName,"singer":singer,"mid":mid},function(data){});
	});
	$("#pre").bind("click",function(){
		if(nowPage==1)
			return;
		var song = $("#seBu").prev().val();
		$.post("serv/search.php",{"se":song,"page":--nowPage},function(data){
		seFlag = 0;
		updateList(data);
	},"json");
	});
	$("#next").bind("click",function(){
		var song = $("#seBu").prev().val();
		$.post("serv/search.php",{"se":song,"page":++nowPage},function(data){
		seFlag = 0;
		updateList(data);
	},"json");
	});
}
var updateList = function(data)
{
	    $("#resWrap").html("");
		var songs="";
		for(i=0;i<data[0].length;i++)
		songs += "<div style='height:40px;line-height:40px;' class='songItem' mid="+data[0][i]+"><span>"+data[1][i]+"</span>-----<span>"+data[2][i]+"</span></div>";
	    songs += "<div><button id='pre'>上一页</button><button id='next'>下一页</button></div>";
	    $("#resWrap").append(songs);
	    addEventListener();
}
$("#seBu").bind("click",function(){
	if(seFlag==1)
		return;
	seFlag = 1;
	nowPage=1;
	var song = $(this).prev().val();
	var page = 1;
	$.post("serv/search.php",{"se":song,"page":1},function(data){
		seFlag = 0;
		updateList(data);
	},"json");
});
