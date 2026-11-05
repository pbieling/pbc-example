<?php

use PbClasses\Conf;
/*
 * 	ID 	WdIndex 	ZeitVon 	ZeitBis 	
 * OrgIndex 	EventIndex	Raum1 	Raum2 	
 * Kommentar 	LastUpdate 	
 */
return [
    'table' => 'pbcdemo_wochenplan',
    'get_filters' => [
        'pbtbldemofilter' => [
            'type' => 'overwrite-presettings',
            'filters' => [
                'filter1' =>
                ['param1' => 'veranstaltungsart']
            ]
        ]
    ],
    'display_tablename' => 'Belegung - Wochenansicht',
    'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_wochenplan.tpl',
    'table_js_ownforms' => Conf::get('BACKTPLPATH') . 'tables/ownforms_wochenplan.tpl',
    'query' => [
        'table_limit_rows' => 15,
        'table_what' => '',
        'table_condition' => "ORDER BY WdIndex, ZeitVon",
    ],
    'table_def' => [
        'hidden' => ['ID', 'LastUpdate'], //'german_weekday', 'organisation_label'
        'display_name' => [
            'ON_OFF' => 'An/Aus',
            'WdIndex' => 'Wochentag',
            'OrgIndex' => 'Organisation',
            'EventIndex' => 'Veranstaltung'
        ],
        'rights' => [
            'change' => ['ZeitVon', 'ZeitBis', 'WdIndex', 'OrgIndex', 'EventIndex', 'Leitung', 'Kommentar'],
            'delete' => true,
            'insert' => ['ZeitVon', 'ZeitBis', 'WdIndex', 'OrgIndex', 'EventIndex', 'Kommentar'],
            /* 'switch' => array(
              'Raum1' => array(0 => '<i class="far fa-minus-square fa-2x" style="color:silver"></i>', 1 => '<i class="far fa-check-square fa-2x" style="color:green"></i>'),
              'Raum2' => array(0 => '<i class="far fa-minus-square fa-2x" style="color:silver"></i>', 1 => '<i class="far fa-check-square fa-2x" style="color:green"></i>')) */
            'switch' => [
                'Raum1' => [0 => '<i class="bi bi-dash-square" style="color:silver;font-size:150%;"></i>', 1 => '<i class="bi bi-check-square" style="color:green;font-size:150%;"></i>'],
                'Raum2' => [0 => '<i class="bi bi-dash-square" style="color:silver;font-size:150%;"></i>', 1 => '<i class="bi bi-check-square" style="color:green;font-size:150%;"></i>']] //Todo Häkchen-Grafik
        ],
        'primary_key' => 'ID',
        'row_buttons' => ['changeable' => true,
            'deletable' => true
        ]
    ],
    'provide_dyn_data' => [
        'organisation_label' => ['\\PbClasses\\Table\\TableDefSingleVal', 'pbcdemo_organisation', 'OrgIndex', 'OrgIndex', 'OrgName', '-'],
        'event_label' => ['\\PbClasses\\Table\\TableDefSingleVal', 'pbcdemo_events', 'EventIndex', 'EvIndex', 'EvName', '-'],
        'german_weekday' => Conf::get('ownclasses_namespace') . 'Tables\\Def\\GermanWeekday',
    ],
    'transform_values' => [
        'refresh' => [
            'WdIndex' => true,
            'OrgIndex' => true,
            'EventIndex' => true]
    ],
    'filters_template' => 'filters', //Deafault
    'filters' => [
        'filter1' => [
            'classname' => "\\MyProject\\Tables\\Filters\\SearchMainAndDefTables",
        ]
    ],
    'filters_client' =>
    [
        'filter1' => [
            'type' => 'textinput',
            'send_after_keyupdelay' => 1,
            'filteroff_on' => ['param1' => ''],
            'params' => ['param1' => null]],
       
    ],
    'css_rowmod' => [
        'Raum1' => 'TABLE_VALUE',
        'Raum2' => 'TABLE_VALUE'],
    'js_modal_input_modifyer' => [
        'attributes' => ['Kommentar' => 'data-ownval="is_test"  minlength="3"',
            'Leitung' => 'required minlength="3"'
        ],
        'label' => ['Kommentar' => 'Kommentar (test darf nicht enthalten sein.',
            'Leitung' => 'Leitung (mindestens 3 Buchstaben)'
        ],
    ],
];
