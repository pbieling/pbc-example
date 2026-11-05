<?php

return [
    'PAGE_ID' => 1,
    'css_files' => ["/css/dashboard.css"],
    'se_re' => [
        'pagetitle' => 'Startseite',
        'mainheader' => 'Startseite',
        
        'pbconfdata' => json_encode(
                [
             
                    'general_iconset' => \PbClasses\Conf::get('icons')
                ]
        )
    ],
    'start' => ['tpl_file' => 'content-index.tpl'],
    'login' => [
        'outer_tpl_file' => 'outer_dashboard_login.tpl',
        'js_files' => [
            '/3rd/node_modules/toastr/build/toastr.min.js',
            '/js/pbtoast.js'],
        'css_files' => [
            '/3rd/node_modules/toastr/build/toastr.min.css',
        ]
    ]
];
