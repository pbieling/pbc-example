<?php

return (
        function (): array {

            $pid = 4;
            return [
        'PAGE_ID' => $pid,
        'required_user_level' => 3,
        'tpl_file' => 'content-table-edituser.tpl',
        'css_files' => [
            '/css/pb-table.css',
            '/css/modal.css',
            '/admin/css/edituser.css',
            '/3rd/node_modules/toastr/build/toastr.min.css',
        ],
        'js_files' => [
            '/js/pbmodal.js',
            '/js/table-base.min.js' => ['type' => 'module'],
            '/3rd/node_modules/toastr/build/toastr.min.js',
            '/js/pbtoast.js',
            '/3rd/node_modules/sortablejs/Sortable.min.js',
            '/js/pbtbl/pbtbl-modal_replacement.js',
            '/js/pbtbl/pbtbl-sorter.js',
            '/admin/js/edit-access.js'
        ],
        'se_re' => [
            'pagetitle' => 'User editieren',
            'mainheader' => 'User editieren',
            'pbconfdata' => json_encode([
                'pid' => $pid,
                'pbtable_iconset' => \PbClasses\Conf::get('pbtable_icons')
            ]),
        ],
        'start' => [
            'classes' => '\\PbClasses\\Backend\\OptionalAccessTable',
        ]
            ];
        }
        )();

