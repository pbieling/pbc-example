<?php
return [
    'PAGE_ID' => 9,
    'tabledef_data' => [
        // Defines a key used to assign the action.
        'a345b678rzrz5' => ['\\PbClasses\\Table\\TableDefHtml', 'pbcdemo_organisation', 'OrgIndex', 'OrgName'],
        'a345b678rzr999' => ['\\PbClasses\\Table\\TableDefHtml', 'pbcdemo_events', 'EvIndex', 'EvName'],
    ],
    'tablesort_data' => [
        'a345b678rzrz5' => ['pbcdemo_organisation'],
        'a345b678rzr999' => ['pbcdemo_events']
    ],
    'css_files' => [
        '/css/pb-table.css',
        '/css/modal.css',
        '/3rd/node_modules/toastr/build/toastr.min.css',
        '/admin/css/edit-tasks.css'],
    'js_files' => [
        '/3rd/node_modules/toastr/build/toastr.min.js',
        '/js/pbtoast.js',
        '/js/pbmodal.js',
        '/3rd/node_modules/sortablejs/Sortable.min.js',
        '/js/table-base.min.js' => ['type' => 'module'],
        '/js/pbtbl/pbtbl-modal_replacement.js',
        '/js/pbtbl/pbtbl-sorter.js',
        '/js/wochenplan.js',
        '/js/demo-wochenplan-validation.js',
        '/js/pbtbl/pbtbl-standard-validation.js'
    ],
    'se_re' =>
    ['pagetitle' => 'Demo-Wochenplan',
        'mainheader' => 'Demo-Wochenplan',
        'pbconfdata' => json_encode(['pid' => 9,
            'pbtable_iconset' => \PbClasses\Conf::get('pbtable_icons')
        ])],
    'start' => ['tpl_file' => 'testbereich/content-demo-wochenplan.tpl']
];