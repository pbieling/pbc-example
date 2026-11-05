<?php

use PbClasses\Conf;

return [
    'table' => 'pbcdemo_organisation',
    'display_tablename' => 'Organisationen',
    'table_templatefile' => Conf::get('BACKTPLPATH') . 'tables/table_standard_def.tpl',
    'table_template_sere' => [
        'pbtbl_sortkey' => 'a345b678rzrz5'
    ],
    'query' => [
        'table_what' => 'ID, Ord, OrgIndex, OrgName, DefComment, Hide',
        'table_limit_rows' => 100,
        'table_condition' => 'ORDER BY Ord',
    ],
    'table_def' => [
        'rights' => [
            'change' => ['OrgIndex', 'OrgName', 'DefComment'],
            'delete' => false,
            'insert' => ['OrgIndex', 'OrgName', 'DefComment'],
            'switch' => ['Hide' => [1 => 'Aus', 0 => 'An']]
        ],
        'hidden' => ['ID'],
        'primary_key' => 'ID',
        'display_name' => [
            'Hide' => 'An/Aus',
            'OrgIndex' => 'Organisations-Nr.',
            'OrgName' => 'Name der Organisation',
            'DefComment' => 'Kommentar'
        ],
        'row_buttons' => [
            'changeable' => true,
            'deletable' => true
        ],
    ]
];
