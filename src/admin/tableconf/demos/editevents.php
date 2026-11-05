<?php
use PbClasses\Conf;

return [
    'table' => 'pbcdemo_events',
    'display_tablename' => 'Veranstaltungen',
    'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_standard_def.tpl',
    'table_template_sere' =>  [
        'pbtbl_sortkey' => 'a345b678rzr999'
    ],
    
    'query' => [
        'table_what' => 'ID, Ord, EvIndex, EvName, EvComment, Hide',
        'table_limit_rows' => 100,
        'table_condition' => 'ORDER BY Ord',
    ],
    'table_def' => [
        'rights' => [
            'change' => ['EvIndex', 'EvName', 'EvComment'],
            'delete' => false,
            'insert' => ['EvIndex', 'EvName', 'EvComment'],
            'switch' => ['Hide' => [1 => 'Aus', 0 => 'An']]
        ],
        'hidden' => ['ID'],
        'primary_key' => 'ID',
        'display_name' => [
            'Hide' => 'An/Aus',
            'EvIndex' => 'Veranstaltungs-Nr.',
            'EvName' => 'Veranstaltungsname',
            'EvComment' => 'Kommentar',
            
        ],
        'row_buttons' => [
            'changeable' => true,
            'deletable' => true
        ],
    ]
];

