<?php

use PbClasses\Conf;
use PbClasses\I18n;
use PbClasses\Tpl\LanguageTemplates;

return (
        function (): array {
            $language_files = [
                'tables' => 'tables'
            ];
            $langObj = I18n::getInstance($language_files);

            return [
        'table' => Conf::get(['access_tables', 'GROUP_TABLE']),
        'display_tablename' => $langObj->get('tables.accessgroups_template.user_table', 'Zugriffsgruppen-Verwaltung'),
        'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_editaccessgroups.tpl',
        'table_template_sere' => $langObj->map('tables.accessgroups_template', [
            'aria_filterselection' => 'Filter-Auswahl',
            'btn_all' => 'Alle',
            'btn_active' => 'Aktiv',
            'btn_passive' => 'Passiv',
            'btn_new_entry' => 'Neuer Eintrag',
            'label_show' => 'Zeige',
            'label_find' => 'Suche',
            'text_intotal' => 'insgesamt',
            'text_of' => 'von'
        ]),
        'query' => [
            'table_what' => 'GID, GKey, "" AS GroupMembers, GLabel, Hide'
        ],
        'ins_upd_validation' => [
            'GKey' => [
                ['StringLengthMinMax', [3, 100], 'Erlaubte Länge 3 - 100 Zeichen'],
                ['RegExp', '/^[a-zA-Z0-9]+$/i', 'Unerlaubte(s) Zeichen in der Eingabe']
            ]
        ],
        'table_def' => [
            'rights' => [
                'change' => ['GKey', 'GLabel'],
                'delete' => true,
                'insert' => ['GKey', 'GLabel'],
                'switch' => ['Hide' => [
                        0 => $langObj->get('tables.accessgroups_table.active', 'AKTIV'),
                        1 => $langObj->get('tables.accessgroups_table.passive', 'PASSIV')
                    ]
                ]
            ],
            'primary_key' => 'GID', // => 'ID', //oder array bei zusammengesetzten Schlüsseln
            'display_name' => $langObj->map('tables.accessgroups_table', [
                'GKey' => 'Key',
                'GLabel' => 'Gruppenname',
                'Hide' => 'Aktiv/Aus',
                'GroupMembers' => 'Mitglieder'
            ]),
            'row_buttons' => [
                'changeable' => true,
                'deletable' => true
            ],
            
        ],
        'js_language_mapping' => $langObj->get('tables.modal_labels'),        
        'add_fields' => ['GroupMembers' => '\\PbClasses\\Table\\Access\\GroupMembers'],
        'filters_template' => 'filters', //Deafault
        'filters' => [
            'filter1' => [
                'filter_where' => "GKey  LIKE  '%{PARAM1}%' OR GLabel like '%{PARAM1}%'"
            ],
            'filter2' => [
                'filter_where' => "Hide = '{PARAM1}'"
            ]
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
        ]
            ];
        })();
