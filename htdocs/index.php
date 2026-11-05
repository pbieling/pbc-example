<?php
ini_set('display_errors', '0');
ini_set("log_errors", 1);
ini_set("error_log", dirname(__DIR__) . "/src/admin/system/log/php_error.log");
error_reporting(E_ALL);
require_once  dirname(__DIR__) . '/vendor/autoload.php';
new \PbClasses\Init(__DIR__, dirname(__DIR__) . "/src/admin");

