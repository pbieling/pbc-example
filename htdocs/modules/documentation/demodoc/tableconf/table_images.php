<?php

use PbModule_commondocu\MConf;

return [
    'table' => MConf::get(['docu_conf', 'doc_tables', 'PAGE_IMAGES_INDEX']),
    'table_templatefile' => MConf::get('MODTPLPATH') . 'tables/table_images.tpl',
    'table_template_file_replacements' => ['%%MODUL_HTTP_ROOT%%' => MConf::get('MODHTTPROOT')],
    'display_if_empty_on_start' => ['show_table' => true],
    'display_tablename' => 'Bild-Index',
    'query' => [
        'table_what' => 'ID, UploadFileName, ImgFile, ImgW, ImgH, CrDate, Updated, ImgAlt, ImgDescr, Location, Author, Comment',
        'table_condition' => 'ORDER BY ID DESC'
    ],
    'table_def' => [
        'rights' => [
            'change' => ['Author', 'Comment', 'ImgDescr'],
            'delete' => true,
            'insert' => false,
        ],
        'primary_key' => 'ID',
        'display_name' => [
            'ImgFile' => 'Dateiname',
            'ImgW' => 'Breite',
            'ImgH' => 'Höhe',
            'ImgDescr' => 'Beschreibung',
            'ImgAlt' => 'Alt-Text',
            'CrDate' => 'Bilddatum',
            'Updated' => 'Aktualisiert',
            'Author' => 'Autor',
            'Location' => 'Aufnahmeort',
            'Comment' => 'Kommentar',
            'UploadFileName' => 'Bild'
        ],
        'row_buttons' => [
            'changeable' => true,
            'deletable' => true
        ],
    ],
    'filters_template' => 'filters',
    'filters' => [
        'filter1' => [
            'filter_where' => "(ImgDescr  LIKE  '%{PARAM1}%' OR Comment LIKE '%{PARAM1}%'   "
            . " OR ImgFile  LIKE  '%{PARAM1}%' OR Location LIKE '%{PARAM1}%'   OR Author LIKE '%{PARAM1}%') "
        ],
    ],
    'filters_client' => [
        'filter1' => [
            'type' => 'textinput',
            'onoff' => 0,
            'active_always' => 0,
            'send_on_activation' => 0,
            'send_after_keyupdelay' => 1,
            'filteroff_on' => ['param1' => ''],
            'params' => ['param1' => null]
        ],
    ]
];
