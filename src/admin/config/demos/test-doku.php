<?php

return [
    'PAGE_ID' => 7,
    'tpl_file' => 'modules/module_content_standard.tpl',
    'se_re' =>
    [
        'pagetitle' => 'Demo-Dokumentation',
        'mainheader' => 'Demo-Dokumentation',
        'pbconfdata' => json_encode(
                [
                    'pid' => 7,
                    'pg_iconset' => \PbClasses\Conf::get('pg_icons')
                ]
        )
    ],
    'start' => [
        'modules' => [
            'documentation/demodoc' => [
                'placeholder' => 'module_output',
                'namespace' => 'commondocu']
        ]
    ]
];
