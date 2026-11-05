<?php

return [
    'PAGE_ID' => 8,
    'class_param' => ['MDocTree' => ['isAdmin' => true]],
    'tpl_file' => 'modules/module_content_standard.tpl',
    'se_re' =>
    [
        'pagetitle' => 'Doku-Editor',
        'mainheader' => 'Doku-Editor',
        'pbconfdata' => json_encode(['pid' => 8,
            'pg_iconset' => \PbClasses\Conf::get('pg_icons')])
    ],
    'start' => [
        'modules' => [
            'documentation/demodoc' => [
                'placeholder' => 'module_output',
                'namespace' => 'commondocu']
        ]
    ]
];
