<?php

namespace MyProject\Tables\Dojob;

use PbClasses\Conf;

class RefreshImageEntry {

    protected $P;
    protected $methodConf;
    protected $conf;

    public function __construct($P, & $methodConf, & $conf) {
        $this->P = $P;
        $this->methodConf = $methodConf;
        $this->conf = $conf;
    }

    public function doJob() {
        $db = Conf::get('db');
        $table = $this->conf['table'];
        $updArr = ['Updated' =>  date('Y-m-d H:i:s')];
        $where = [
            'ID' => $this->P['upd_id'],
           
        ];

        if ($db->update($table, $updArr, '', $where)) {
            return [
                'message' => 'Das Zugriffsdatum wurde aktualisiert und wird jetzt in der Bildauswahl am Anfang angezeigt.'
            ];
        }
        //Kein Update:
        return [
            'error' => 'Der Update-Befehl konnte nicht ausgeführt werden werden. Möglichkerseise wurden die Daten an anderer Stelle geändert. Bitte prüfen Sie den Bearbeitungs-Status.'
        ];
       
    }
   
}
