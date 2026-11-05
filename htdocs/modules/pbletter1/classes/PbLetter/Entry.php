<?php
namespace PbModule_pbletter1\PbLetter;
use PbClasses\Conf;
use PbModule_pbletter1\MConf;
class Entry {
    const PRE_STATUS = 5;
    
    
    
    public function getId($uid = 0) {
        if (! $uid && isset($_SESSION['uid'])) {
            $uid = $_SESSION['uid'] ;   
        }
        if ($uid) {
            $inArr['UID'] = $uid;
        }
        $inArr['Status'] = self::PRE_STATUS;
        $inArr['CrDate'] = date('Y-m-d H:i:s');
        // 	Encoding
        //$inArr['LetterTypeId'] = 1;
        $inArr['Encoding'] = 1;
        
        $letterTable = MConf::get(array('mod_tables', 'briefe'));
        Conf::get('db')->insert($letterTable, $inArr);
        return Conf::get('db')->insertId();
    }
    
    public function updateData($what, $id) {
        $where = array('ID' => $id,
                       'Status' => self::PRE_STATUS);
        $letterTable = MConf::get(array('mod_tables', 'briefe'));
        if (Conf::get('db')->update($letterTable, $what, '', $where)) {
            return true;
        }
        return false;
        
    }
}
