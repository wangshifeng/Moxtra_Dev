<?php
$file_name_with_full_path = realpath('./upload.png');

$target_url = "https://apisandbox.moxtra.com/".$_POST['binder_id']."/files?access_token=".$_POST['access_token'];
$curl_handle = curl_init($target_url);
curl_setopt($curl_handle, CURLOPT_POST, 1);
$args['file'] = new CurlFile($file_name_with_full_path, 'image/png');
curl_setopt($curl_handle, CURLOPT_POSTFIELDS, $args);
curl_setopt($curl_handle, CURLOPT_RETURNTRANSFER, true);


//execute the API Call
$returned_data = curl_exec($curl_handle);
curl_close ($curl_handle);

print_r($target_url);

?>