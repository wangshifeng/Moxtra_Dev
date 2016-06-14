<!DOCTYPE html>
<html>
<head>
    
    <title>Callback PHP Script</title>
    <meta charset="utf-8"/>
	<script type="text/javascript">
		function quitBox(cmd)
		{   
			if (cmd=='quit')
			{
				open(location, '_self').close();
			}   
			return false;   
		}
	</script>
</head>
<body>
    <h1>You have successfully signed in.</h1>
    <p>You may close this window now.</p>
	
	<input type="button" name="Quit" id="Quit" value="Close Window" onclick="return quitBox('quit');" /
</body>


</html>
<script type="text/javascript">

		var is_edge = document.documentMode || /Edge/.test(navigator.userAgent);
		var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
		var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
		var is_safari = navigator.userAgent.indexOf("Safari") > -1;
		var is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
		if ((is_chrome)&&(is_safari)) {is_safari=false;}
		if ((is_chrome)&&(is_opera)) {is_chrome=false;}

		if(is_edge){
			var url = window.location.href;
            var parts = url.split("#")[1].split("&");

            console.log(parts[0]);
            console.log(parts[0].split("=")[1]);
            localStorage.setItem("tokenci", parts[0].split("=")[1]);

            open(location, '_self').close();
		}
		else if(is_safari)
		{
			setInterval(function(){open(location, '_self').close();},3000); // wait 3 seconds so we can get token
		}
		else if (window !== null && window.location !== null && window.location.href !== null && window.location.href.indexOf("#access_token") !== -1)
		{
			var url = window.location.href;
            var parts = url.split("#")[1].split("&");

            console.log(parts[0]);
            console.log(parts[0].split("=")[1]);
            localStorage.setItem("tokenci", parts[0].split("=")[1]);

            window.close();
		}
		else if (window !== null && window.document !== null && window.document.URL !== null && window.document.URL.indexOf("#access_token") !== -1) 
		{
            var url = window.document.URL;
            var parts = url.split("#")[1].split("&");

            console.log(parts[0]);
            console.log(parts[0].split("=")[1]);
            localStorage.setItem("tokenci", parts[0].split("=")[1]);

            window.close();
        }
</script>