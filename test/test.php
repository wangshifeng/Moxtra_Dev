<?php
if (isset($_POST["refresh_token"]) && $_POST["refresh_token"] != null && isset($_POST["access_token"]) && $_POST["access_token"]) {
    basic_statistic($_POST["refresh_token"],$_POST["access_token"]);
}
basic_statistic($GET["refresh_token"],$GET["access_token"])
function basic_statistic($refresh_token, $access_token)
{
    $url = 'https://api.moxtra.com/oauth/token?access_token=' . $access_token;
    $data = array('client_id' => 'spiDUIjwKNQ', 'client_secret' => 'i8GQwNBIM2o','grant_type' => 'authorization_code','refresh_token' => $refresh_token);
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
    var_dump($result)
    echo $result;
    // if($result != null)
    // {
    //     // echo json_encode([
    //     //     'RespCode' => 111111,
    //     //     'RespContent' => [
    //     //     'Status' => 'Success',
    //     //     'Content' => $result
    //     //     ]
    //     //     ]);
    //     echo $result
    // }
    // else{
    //     // echo json_encode(['RespCode' => '000004', 'RespContent' => ['Status' => 'Error', 'Content' => "Make sure the massaid is right. Something Wrong when get information from MassagistDetail table. no data return."]]);
    // }
}