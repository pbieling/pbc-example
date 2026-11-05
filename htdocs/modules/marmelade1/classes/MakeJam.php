<?php
namespace PbModule_marmelade1;

use PbModule_marmelade1\MConf;

class MakeJam {

    const STATUS_READY_FOR_UPLOAD = 0;

    protected $P;
    protected $id;
    protected $outputDir;
    protected $entryObj;
    protected $db;
    
    protected $entryArr; //header und user

    public function __construct($seRe = false) {
      //   Dev::test($this->outputDir, __LINE__, 0);
        $this->P = filter_input_array(INPUT_POST);
        //$this->entryArr['header'] = $this->P['pdf_sere']['header'];
        $this->entryArr['user'] = $this->P['pdf_sere']['user'];
                
        $conf = MConf::get('pdf_conf');
        if (!$seRe && isset($this->P['pdf_sere'])) {
            $conf['sere'] = $this->P['pdf_sere'];
        } elseif ($seRe) {
            $conf['sere'] = $seRe;
        }

       // $conf['sere']['header']['anschrift'] = $this->getAddress();
        
        /*
         *         'data' =>  array(
         * 'xml_template' => $pdf_path . 'xml_templates/marmelade1.xml',
            'start_x' => 20,
               'strart_y' => 20, 
            'y_offset_row1' => 5,
            'y_offset_row2' => 19,
            'cols' => 3,
            'rows' => 5,
            'col_width' => 60),
         */
        new \PbClasses\PDF\XML2PDF($conf);

        if (!empty($conf['filename'])) {
          
            //Nur den lokaeln Pfad speichern
            if ($this->saveData($conf['pdf_output_dir'] . $conf['filename'])) {
               // header('Location: ' . $conf['pdf_location_dir'] . $conf['filename']);
            }
        }
    }
    
    

  
}
