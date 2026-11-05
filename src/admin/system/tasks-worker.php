<?php
require_once __DIR__ . '/cli-cron.config.php';

if (file_exists(LOCK_FILE)) {
    log_task_error ('Lockfile vorhanden. ' , __FILE__ , __LINE__);
    exit(1);
} 


if (! \file_put_contents(LOCK_FILE, date('c'))) {
    log_task_error(' Lockfile konnte nicht gesetzt werden '  , __FILE__ , __LINE__);
    exit(1);       
}


require_once AUTOLOADER;
try {
    new \PbClasses\Init(__DIR__, dirname(__DIR__), []); //Empty array for config parameters
} catch (\Exception $exc) {
    log_task_error( $exc->getMessage()  , __FILE__ , __LINE__);
    unlink(LOCK_FILE);
    exit(1);    
}

try {
    new \PbClasses\Tasks\Runner($meta_table = 'pbtask__tasks_meta');  
} catch (\Exception $exc) {
   log_task_error($exc->getMessage() , __FILE__ , __LINE__);
}

unlink(LOCK_FILE);





