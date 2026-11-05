<?php
use PbClasses\Conf;

return [
    'table' => 'pbtask__tasks_list1',
    'display_tablename' => 'Task-Tabelle',
    'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_tasks1.tpl',
    'table_js_ownforms' => Conf::get('BACKTPLPATH') . 'tables/ownforms_edittasks1.tpl', //Basisforms s. Projektkonfig
    'query' => [
        'table_limit_rows' => 30,
    ],
    'table_def' => [
        'hidden' => ['Fingerprint'],
        'rights' => [
            'change' => ['Description', 'TaskClass', 'Minutes', 'Nextrun', 'Status'],
            'delete' => true,
            'insert' => ['Description', 'TaskClass', 'Minutes', 'Nextrun', 'Status'],
        ],
        'primary_key' => 'ID', // => 'ID', //oder array bei zusammengesetzten Schlüsseln
        'display_name' => ['Description' => 'Beschreibung',
            'Minutes' => 'Minuten',
            'Nextrun' => 'Nächster Start',
            'LastStart' => 'Letzter Start',
            'Finished' => 'Beendet',
            'Heartbeat' => 'Letzte Aktion'],
        'row_buttons' => ['changeable' => true,
            'deletable' => true
        ],
    ],
    'provide_fields' => ['Status' => 'fieldvalue_status'],
    'transform_values' => [
        'refresh' => ['Status' => true]
    ],

    'filters_template' => 'filters', //Deafault
    'filters' => [
        'filter1' => [
            'filter_where' => "Description  LIKE  '%{PARAM1}%' OR TaskClass like '%{PARAM1}%'"
        ],
        'filter2' => [
            'filter_where' => "Status = '{PARAM1}'"
        ],
    ],
    'filters_client' =>
    [
        'filter1' => [
            'type' => 'textinput',
            'send_after_keyupdelay' => 1,
            'filteroff_on' => ['param1' => ''],
            'params' => ['param1' => null]],
        'filter2' => [
            'type' => 'buttonsselect',
            'send_after_change' => 1,
            'params' => ['param1' => null]],

    ], 
    'events' => ['after_insert' => '\\PbClasses\\Tasks\\GenerateTaskClass']
];
