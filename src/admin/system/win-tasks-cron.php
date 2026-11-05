<?php
define('CLI_ERRORFILE', __DIR__ . '/log/cli_error.log');
define('LOCK_FILE', __DIR__ . '/tmp/win-cron1.lck');
define('STOP_FILE', __DIR__ . '/tmp/win-cron1.stp');
define('LOGFILE', __DIR__ . '/log/task-runner.log');
ini_set("error_log", CLI_ERRORFILE);
ini_set("log_errors", 1);
error_reporting(E_ALL);

if (file_exists(LOCK_FILE)) {
    trigger_error(date('Y-m-d H:i:s') . ' Cron-Lockfile vorhanden. ' . __FILE__ . ' : ' . __LINE__);
    exit(1);
}

if (file_exists(STOP_FILE)) {
    trigger_error(date('Y-m-d H:i:s') . ' Cron-Stopfile vorhanden. ' . __FILE__ . ' : ' . __LINE__);
    exit(1);
}

if (!\file_put_contents(LOCK_FILE, date('c'))) {
    trigger_error(date('Y-m-d H:i:s') . ' Lockfile konnte nicht gesetzt werden ' . __FILE__ . ' : ' . __LINE__);
    exit(1);
}



echo 'Cron-Start ' . date('Y-m-d H:i:s') . "\r\n";
$counter = 0;
$phpCommandPart = 'php tasks.php';
do {
    if (file_exists(STOP_FILE)) {
        unlink(STOP_FILE);
        unlink(LOCK_FILE);
        cronlog('CRONJOB-ENDE durch STOP: Lauf ' . $counter);
        exit(0);
    }
    
    $counter++;
    cronlog('CRONJOB-START: Lauf ' . $counter);
    if (strtoupper(substr(php_uname(), 0, 3)) == "WIN") {
        // start /B php PATH/1a-background.php
        $cmd = "start /B " . $phpCommandPart;
        pclose(popen($cmd, "r"));
    }
// ( LINUX
    else {
        exec($phpCommandPart  .  ' > /dev/null &');
    }

    cronlog('CRONJOB-END: Lauf ' . $counter);
    
    echo '|';
    if ($counter % 100 == 0) {
        echo "\r\nDurchgang " . $counter . ' - ' . date('Y-m-d H:i:s') . "\r\n";
    }
    sleep(60);
} while (true);

function cronlog($message) {
    $msg = date('Y-m-d H:i:s') . ' - ' . $message . "\r\n";
    file_put_contents(LOGFILE, $msg, FILE_APPEND);
}