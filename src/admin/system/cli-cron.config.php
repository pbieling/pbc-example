<?php

define('CLI_ERRORFILE', __DIR__ . '/log/cli_error.log');
define('ERRORFILE', __DIR__ .  '/log/task_error.log');
define('LOCK_FILE', __DIR__ . '/tmp/task.lck');
define('AUTOLOADER', dirname(dirname(dirname(__DIR__))) . '/vendor/autoload.php');

ini_set("error_log", CLI_ERRORFILE);
ini_set("log_errors", 1);
error_reporting(E_ALL);
if (!file_exists(AUTOLOADER)) {
	log_task_error(' Autoloader fehlt.', __FILE__, __LINE__);
    exit(1);
}


function log_task_error($err, $file = '', $line = '') {
    
    $err_msg = date('Y-m-d H:i:s') . ' - ' . $file . ' : Line: ' . $line . "\r\n";
    $err_msg .= $err . "\r\n-------------------------------------------------\r\n";
    
    file_put_contents(ERRORFILE, $err_msg, FILE_APPEND);
}