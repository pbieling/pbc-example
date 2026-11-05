<?php
require_once __DIR__ . '/cli-cron.config.php';

require_once AUTOLOADER;
try {
  new \PbClasses\Init(__DIR__, dirname(__DIR__), []); //Empty array for config parameters
} catch (\Exception $exc) {
    log_task_error($exc->getMessage(), __FILE__, __LINE__);
    exit(1);
}

new \PbClasses\Tasks\SingleTask($argv[1], $argv[2], $argv[3]);