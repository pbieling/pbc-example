<?php
namespace MyProject\Tasks;
class ZweiterTest {
    protected $db;
    public function run(\PbClasses\Tasks\SingleTask $taskObj) {
        for ($i = 0; $i < 10; $i++) {
            $testOutput = 'Zweiter  Task - Lauf ' . $i . ' ' . date('Y-m-d H:i:s');
            new \PbClasses\Debug\Logging($testOutput, __FILE__, __LINE__);
            sleep(15);
        }
        return true;
    }
}
