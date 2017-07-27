<?php

$i = $_POST['i'];
$ts = $_POST['ts'];
$token = $_POST['token'];
$str = json_encode($_POST);
$fp = fopen("logs/callback.log","w+");
fwrite($fp,$str,strlen($str));
fclose($fp);

?>