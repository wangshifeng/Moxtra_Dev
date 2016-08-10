<?php

function preserve_qs() {
    if (empty($_SERVER['QUERY_STRING']) && strpos($_SERVER['REQUEST_URI'], "?") === false) {
        return "";
    }
    return "?" . $_SERVER['QUERY_STRING'];
}

function debug_to_console($data) {
    if(is_array($data) || is_object($data))
	{
		echo("<script>console.log('PHP: ".json_encode($data)."');</script>");
	} else {
		echo("<script>console.log('PHP: ".$data."');</script>");
	}
}

$url = 'https://api.moxtra.com/oauth/token';
$data = array('code' => $_GET["code"], 'client_id' => 'YTIzMjczOTM', 'client_secret' => 'v6JOPsybIPw','grant_type' => 'authorization_code','redirect_uri' => 'https://www.moxtra1.com/outlook/AppRead/Home/logincallback.php',);

// use key 'http' even if you send the request to https://...
$options = array(
    'http' => array(
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) { /* Handle error */ }
$returndata = json_decode($result, true);
// var_dump($returndata["access_token"]);
// var_dump($data);

header("Status: 301 Moved Permanently");
header("Location: logincallback.html?access_token=" . $returndata["access_token"] . "&refresh_token=" . $returndata["refresh_token"]);
?>
<script type="text/javascript">
    window.location.href = "logincallback.html?access_token="+"<?php echo $returndata["access_token"];?>"+"&refresh_token="+"<?php echo $returndata["refresh_token"];?>";
</script>