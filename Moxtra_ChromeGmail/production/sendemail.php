<?php header('Access-Control-Allow-Origin: *');

require 'class.phpmailer.php';
if($_POST){
	$email = new PHPMailer();
	$email->From      = $_POST['from_email'];
	$email->Subject   = $_POST['message_subject'];
	$email->Body      = urldecode($_POST['message_body']);
	$email->addAddress( $_POST['binder_email'] );
	$email->isHTML(true); 
	$email->CharSet = "utf-8";
	return $email->Send();
}
?>