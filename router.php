<?php

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . '/htdocs' . $path;
putenv('MY_PHP_ROUTER=1');

// Serve existing files/directories normally
if (is_file($file) || is_dir($file)) {
    return false;
}

// Redirect *.php to index.php
if (preg_match('/\.php$/i', $path)) {
    $_GET['srcpage'] = ltrim($path, '/');

    require __DIR__ . '/htdocs/index.php';
    return true;
}

// Everything else also to index.php
require __DIR__ . '/htdocs/index.php';