<?php
namespace MyProject\Tasks;
class ErsterTest {
    protected $db;
    public function run(\PbClasses\Tasks\SingleTask $taskObj) {
        for ($i = 0; $i < 10; $i++) {
            $testOutput = 'Erster  Task - Lauf ' . $i . ' ' . date('Y-m-d H:i:s');
            new \PbClasses\Debug\Logging($testOutput, __FILE__, __LINE__);
            sleep(10);
        }
        return true;
    }
}
