<?php
namespace MyProject\Tasks;
class DritterTest {
    protected $db;
    public function run(\PbClasses\Tasks\SingleTask $taskObj) {
        //Standard-Datenbankobjekt importieren:
       // $this->db = \PbClasses\Conf::get('db');
                
        //== your code:
        for ($i = 0; $i < 10; $i++) {
            $testOutput = 'Dritter  Task - Lauf ' . $i . ' ' . date('Y-m-d H:i:s');
            new \PbClasses\Debug\Logging($testOutput, __FILE__, __LINE__);
            sleep(20);
        }
        return true;
    }
}
