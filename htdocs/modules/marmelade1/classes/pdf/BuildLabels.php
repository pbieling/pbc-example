<?php

namespace PbModule_marmelade1\pdf;

//use \PbClasses\Develop as Dev;

/**
 * Description of newPHPClass
 *
 * @author Peter Bieling - info@media-palette.de
 * Created on : 03.03.2019, 19:05:03
 */
class BuildLabels extends \PbClasses\PDF\AbstrPDF {

    const MAX_NUMBER = 300;

    protected $t;
    protected $P;
    protected $seRe;
    protected $itemCounter = 0;
    protected $number;

    public function __construct($pdf, $config) {
        $this->pdf = $pdf;
        $this->config = $config;
        $this->P = \filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);
        //$this->entryArr['header'] = $this->P['pdf_sere']['header'];
        $this->seRe = $this->P['pdf_sere']['user'];

        if (!empty($this->P['sorte_eingabe'])) {
            $this->seRe['sorte'] = $this->modifyType($this->P['sorte_eingabe']);
        }

        $this->seRe['datum'] = $this->modifyDate($this->seRe['datum']);
        /*

          [xml_template] => D:\Projekte\test\pbdemo3\modules\marmelade1/pdf/xml_templates/marmelade1.xml
          [start_x] => 20
          [start_y] => 20
          [y_offset_row1] => 5
          [y_offset_row2] => 19
          [cols] => 3
          [rows] => 5
          [col_width] => 60
         */
        $this->t = new \PbClasses\PbTpl($config['data']['xml_template']);

        $this->number = $this->P['number_of_items'] + 0;
        if ($this->number > self::MAX_NUMBER) {
            $this->number = self::MAX_NUMBER;
        }


        if (!$this->number) {
            echo 'Keine Anzahl übermittelt';
            exit;
        }

        do {
            $more = $this->buildPage();
        } while ($more);
    }

    protected function modifyDate($date) {
        $dateArr = explode('-', $date);
        return 'vom ' . $dateArr[2] . '.' . $dateArr[1] . '.' . $dateArr[0];
    }

    protected function modifyType($text) {
        $txt = trim($text);
        $pattern = '/([a-z])(marmelade|konfitüre|gelée)/i';
        $replacement = '${1}-${2}';
        return preg_replace($pattern, $replacement, $txt);
    }

    protected function buildPage() {
        for ($i = 1; $i <= $this->config['data']['rows']; $i++) {
            //Reihe übermitteln
            $more = $this->buildRow($i);
            if (!$more) {
                return false;
            }
        }
        $this->pdf->AddPage();
        return true;
    }

    protected function buildRow($row) {
        for ($i = 1; $i <= $this->config['data']['cols']; $i++) {
            //Reihe und Spalte übermitteln
            $more = $this->buildItem($row, $i);
            if (!$more) {
                return false;
            }
        }
        return true;
    }

    protected function buildItem($row, $col) {
        $sere = $this->seRe;
        $data = $this->config['data'];


        /*
         *           [start_x] => 20
          [start_y] => 20
          [y_offset_row1] => 5
          [y_offset_row2] => 19
          [cols] => 3
          [rows] => 5
          [col_width] => 60
         * 'row_height' => 50
         */

        $y = ($row - 1) * $data['row_height'] + $data['start_y'];

        $sere['top1'] = $y;
        $sere['top2'] = $y + $data['y_offset_row1'];
        $sere['top3'] = $y + $data['y_offset_row2'];
        $sere['left'] = ($col - 1) * $data['col_width'] + $data['start_x'];

        $xmlString = $this->t->fillTpl('main', $sere);
        $this->processXml($xmlString);

        $this->itemCounter++;

        if ($this->number > $this->itemCounter) {
            return true; //weiter machen
        }
        //mission accomplished
        return false;
    }

}
