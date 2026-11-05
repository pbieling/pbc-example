<?php
namespace PbModule_pbletter1;

use PbModule_pbletter1\MConf;

class MakePbLetterPdf {

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
        $this->entryArr['header'] = $this->P['pdf_sere']['header'];
        $this->entryArr['user'] = $this->P['pdf_sere']['user'];
                
        $this->applyMarkdown(); //Verändert $this->P !
        $conf = MConf::get('pdf_conf');
        if (!$seRe && isset($this->P['pdf_sere'])) {
            $conf['sere'] = $this->P['pdf_sere'];
        } elseif ($seRe) {
            $conf['sere'] = $seRe;
        }

        $conf['sere']['header']['anschrift'] = $this->getAddress();
        if (!empty($this->P['save_checkbox']) && $this->P['save_checkbox'] === 'save') {
            $this->db = \PbClasses\Conf::get('db');
            $this->entryObj = new PbLetter\Entry();
            $this->id = $this->entryObj->getId();
            
            $pdfName = $this->id . '-' . date('YmdHis') . '.pdf';
            
            $conf['filename'] = $conf['pdf_output_dir'] . $pdfName;
          //  Dev::test(MConf::getAll(), __LINE__, 0);
          //  Dev::test($conf, __LINE__, 1);
            
            $this->saveEntries();
        }
        new \PbClasses\PDF\XML2PDF($conf);

        if (!empty($conf['filename'])) {
            //Nur den lokaeln Pfad speichern
            if ($this->saveData($conf['pdf_http_dir'] . $pdfName)) {
                header('Location: ' . $conf['pdf_http_dir'] . $pdfName);
            }
        }
    }
    
    

    protected function getAddress() {
        $add = '';
        /*
         * [PBLETTER_lastName] => Mustermann
          [PBLETTER_firstName] => Michael
          [PBLETTER_salutation] => Herr
          [PBLETTER_title] => Dr.
          [PBLETTER_company] => Tierarztpraxis
          [PBLETTER_zipCode] => 12345
          [PBLETTER_city] => Musterstadt
          [PBLETTER_streetName] => Musterstr.
          [PBLETTER_houseNumber] => 12
         */

        if ($this->P['pbletter_entry']['PBLETTER_company']) {
            $add .= $this->P['pbletter_entry']['PBLETTER_company'] . "\n";
        }
        //Falls Firma, dann Namen mit Anrede in die zweite Reihe, sont Anrede in die erste
        $nlorbr = ($add) ? ' ' : "\n";


        if ($this->P['pbletter_entry']['PBLETTER_firstName'] . $this->P['pbletter_entry']['PBLETTER_lastName']) {
            $add .= $this->P['pbletter_entry']['PBLETTER_salutation'] . $nlorbr;
            if ($this->P['pbletter_entry']['PBLETTER_title']) {
                $add .= $this->P['pbletter_entry']['PBLETTER_title'] . " ";
            }
            $add .= $this->P['pbletter_entry']['PBLETTER_firstName'] . " ";
            $add .= $this->P['pbletter_entry']['PBLETTER_lastName'] . "\n";
        }

        if ($this->P['pbletter_entry']['PBLETTER_addressAddOn']) {
            $add .= $this->P['pbletter_entry']['PBLETTER_addressAddOn'] . "\n";
        }
        $add .= $this->P['pbletter_entry']['PBLETTER_streetName'] . " " . $this->P['pbletter_entry']['PBLETTER_houseNumber'] . "\n";
        $add .= $this->P['pbletter_entry']['PBLETTER_zipCode'] . " " . $this->P['pbletter_entry']['PBLETTER_city'];

        return trim($add);
    }  

    protected function applyMarkdown() {
        if (!empty($this->P['pdf_sere']['user']['brieftext'])) {
            $this->P['pdf_sere']['user']['brieftext'] = $this->markdownFilter($this->P['pdf_sere']['user']['brieftext']);
        }
    }

    protected function markdownFilter($text) {
        return \Michelf\MarkdownExtra::defaultTransform($text);
    }



}
