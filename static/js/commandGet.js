var getCommand = function()
{
	$.get("serv/command.php",function(data){
		if(data['song']!="")
			{
				var song = data['song'].split("|");
				playSong(song[2],song[0],song[1],"play");
			}
		if(data['play']!="")
			{
				switch(data['play'])
				{
					case "play" : $("#play").click(); break;
					case "left" :$("#backword").click();break;
					case "right": $("#forward").click();break;
					case "random": $("#random").click();break;
				}
				
			}
		if(data['vol']!="")
			{
				$("#voiceC").val((1-data['vol']).toFixed(2));
				$("#audio")[0].volume = data['vol'];
			}
	},"json");
}
setInterval("getCommand()",1000);