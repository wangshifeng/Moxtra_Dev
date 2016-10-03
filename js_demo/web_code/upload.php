<?php
	//Upload file to Binder using Binder ID and Access Token
    // $target_url = "https://api.moxtra.com/".$_POST['binderid']."/files?file=upload.png&access_token=".$_POST['access_token'];
    // $target_url = "https://api.moxtra.com/BAlkDiPjqb1HbSf5WAgcx80/files?access_token=kFIzMgAAAVcB2-TtAACowFVkWVFWeEJZZEQ3M1VqdGNTaDBuNzMyIAAAAANUMl9OVmkyNUdkZVpEV3ZBU2VucnI1TnNwaURVSWp3S05R";
    // $file_name_with_full_path = realpath(getcwd().'/upload.png');
    // $post = array('file'=>'@'.$file_name_with_full_path);
    // $ch = curl_init();
    // curl_setopt($ch, CURLOPT_URL,$target_url);
    // curl_setopt($ch, CURLOPT_POST,1);
    // curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    // curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data'));
    // $result=curl_exec ($ch);
    // curl_close ($ch);
$file_name_with_full_path = realpath('./upload.png');

// $curl_handle = curl_init("https://api.moxtra.com/BAlkDiPjqb1HbSf5WAgcx80/files?access_token=kFIzMgAAAVcB2-TtAACowFVkWVFWeEJZZEQ3M1VqdGNTaDBuNzMyIAAAAANUMl9OVmkyNUdkZVpEV3ZBU2VucnI1TnNwaURVSWp3S05R");
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