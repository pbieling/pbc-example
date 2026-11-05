<?php
namespace PbModule_rechnungen\Ajax;
use PbClasses\Conf;

class Test1 extends \PbClasses\Ajax\AbstractResponse {

   

    protected $db;
    protected $conf;

    public function action() {
       \PbClasses\Ajax\SessionStart::start();
       //  new \PbClasses\Debug\Logging($this->basePageConf, __FILE__, __LINE__);
      //  new \PbClasses\Debug\Logging(\PbClasses\Conf::getAll(), __FILE__, __LINE__);
      //  new \PbClasses\Debug\Logging(\PbModule_rechnungen\MConf::getAll(), __FILE__, __LINE__);
        
      //   new \PbClasses\Debug\Logging($_SESSION, __FILE__, __LINE__);
       //  new \PbClasses\Debug\Logging($_SERVER, __FILE__, __LINE__);
        $this->okOutput();
        
        
    }
    
}