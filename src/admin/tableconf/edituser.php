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
            $message_char = $langObj->get('tables.validation.min_max_chars', 'Anzahl der erlaubten Zeichen: ');
            $message_regex = $langObj->get('tables.validation.regex', 'Unerlaubte Zeichen in der Eingabe.');

            return [
        'table' => Conf::get('table_prefix') . 'user',
        'display_tablename' => $langObj->get('tables.user.user_table', 'Benutzer-Tabelle'),
        // 'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_edituser.tpl',
        'table_templatefile' => LanguageTemplates::get(Conf::get('I18n'), Conf::get('BACKTPLPATH'), 'tables/table_edituser.tpl'),
        'table_js_ownforms' => Conf::get('BACKTPLPATH') . 'tables/ownforms_edituser.tpl', //Basisforms s. Projektkonfig
        'table_template_sere' => Conf::get('pbtable_icons'),
        'query' => [
        //'table_what' => '' 
        ],
        'ins_upd_validation' => [
            'RealName' => [
                ['StringLengthMinMax', [3, 50], $message_char . '3 - 50'],
                ['RegExp', '/^[a-z\s\-\.\'äüöß]+$/i', $message_regex]
            ],
            'Uname' => [
                ['StringLengthMinMax', [4, 20], $message_char . '4- 20'],
            ],
            'Passw' => [
                ['StringLengthMinMax', [4, 20], $message_char . '4- 20'],
            ]
        ],
        'table_def' => [
            'rights' => [
                'change' => ['Uname', 'Passw', 'RealName', 'Frg'],
                'delete' => true,
                'insert' => ['Uname', 'Passw', 'RealName', 'Frg'],
                'switch' => ['ON_OFF' => [
                        0 => $langObj->get('tables.user.off', 'Aus'),
                        1 => $langObj->get('tables.user.on', 'An')]
                ]
            ],
            'primary_key' => 'UID',
            'display_name' =>
            [
                'Frg' => $langObj->get('tables.user.access', 'Freigabe'),
                'Passw' => $langObj->get('tables.user.password', 'Passwort'),
                'CrDate' => $langObj->get('tables.user.created', 'Eintragszeit'),
                'Uname' => $langObj->get('tables.user.username', 'Benutzername'),
                'RealName' => $langObj->get('tables.user.real_name', 'Vor- und Zuname'),
                'ON_OFF' => $langObj->get('tables.user.on_off', 'An/Aus')
            ]
            ,
            'row_buttons' => [
                'changeable' => true,
                'deletable' => true
            ],
            'insert_filters_standard' => [
                'Passw' => 'phpPassword',
                'CrDate' => 'insertTimestamp'
            ],
            'update_filters_standard' => ['Passw' => 'phpPassword'],
            'update_output_filters' => ['Passw' => '**********']
        ],
        'js_language_mapping' => $langObj->get('tables.modal_labels'),
        'run_classes' => [
            Conf::get('ownclasses_namespace') . 'ApprovalSelection'
        ],
        'filters_template' => 'filters', //Deafault
        'filters' => [
            'filter1' => [
                'filter_where' => "RealName  LIKE  '%{PARAM1}%' OR Uname LIKE '%{PARAM1}%'"
            ],
            'filter2' => [
                'filter_where' => "ON_OFF = '{PARAM1}'"
            ],
            'filter3' => [
                'filter_where' => "Frg = '{PARAM1}'",
            ],
        ],
        'filters_client' =>
        [
            'filter1' => [
                'type' => 'textinput',
                'send_after_keyupdelay' => 1,
                'params' => ['param1' => null]
            ],
            'filter2' => [
                'type' => 'buttonsselect',
                'send_after_change' => 1,
                'params' => ['param1' => null]
            ],
            'filter3' => [
                'type' => 'singleselect',
                'send_after_select' => 1,
                'params' => ['param1' => null]
            ],
        ]
            ];
        })();
