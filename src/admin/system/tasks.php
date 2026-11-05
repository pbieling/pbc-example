<?php
require_once __DIR__ . '/cli-cron.config.php';

$cmd = 'php ' . __DIR__ . '/tasks-worker.php';
$process = proc_open($cmd, [], $pipes);

$timeout = 30;
$start = time();

while (true) {
    $status = proc_get_status($process);

    if (!$status['running']) {
        // Child ist fertig
        proc_close($process);
       // $msg =  "Worker normal beendet (Exitcode {$status['exitcode']})\nZeit: " . time() - $start . "\n";
       // log_task_error($msg);
        break;
    }

    if (time() - $start >= $timeout) {
        $msg = "Timeout – Worker braucht zu lange.\n";
        log_task_error($msg);
        proc_terminate($process);
        proc_close($process);
        if (file_exists(LOCK_FILE)) {
           unlink(LOCK_FILE);
        }
        break;
    }
    //usleep(200_000); // 200 ms
    sleep(1); 
}