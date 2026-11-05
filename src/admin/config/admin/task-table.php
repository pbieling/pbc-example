<?php

return [
    'PAGE_ID' => 3,
    'css_files' => [
        '/css/pb-table.css',
        '/css/modal.css',
        '/3rd/node_modules/toastr/build/toastr.min.css',
        '/admin/css/edit-tasks.css'],
    'js_files' => [
        '/3rd/node_modules/toastr/build/toastr.min.js',
        '/js/pbtoast.js',
        '/js/pbmodal.js',
        '/js/table-base.min.js' => ['type' => 'module']],
    'se_re' =>
    ['pagetitle' => 'Tasks',
        'mainheader' => 'Tasks',
        'pbconfdata' => json_encode(['pid' => 3,
            'pbtable_iconset' => \PbClasses\Conf::get('pbtable_icons')
        ])],
    'start' => ['tpl_file' => 'content-tasks.tpl']
];
