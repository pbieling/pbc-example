<?php

return [
    'PAGE_ID' => 5,
    'css_files' => [
        '/3rd/node_modules/jstree/dist/themes/default/style.min.css',
        '/css/modal.css',
        '/3rd/node_modules/toastr/build/toastr.min.css',
        '/3rd/node_modules/prismjs/themes/prism.css',
        '/3rd/node_modules/codejar-linenumbers/js/codejar-linenumbers.css',
    ],
    'js_files' => [
        '/3rd/node_modules/jstree/dist/jstree.min.js',
        '/3rd/node_modules/prismjs/prism.js',
        '/3rd/node_modules/prismjs/components/prism-markup.min.js',
        '/3rd/node_modules/prismjs/components/prism-markup-templating.min.js',
        '/3rd/node_modules/prismjs/components/prism-clike.min.js',
        '/3rd/node_modules/prismjs/components/prism-php.min.js',
        '/3rd/node_modules/toastr/build/toastr.min.js',
        '/js/pbtoast.js',
        '/admin/js/backendgenerator.js' => ['type' => 'module'],
    ],
    'se_re' =>
    [
        'pagetitle' => 'Seitenverwaltung',
        'mainheader' => 'Seitenverwaltung',
        'pbconfdata' => json_encode(
                [
                    'pid' => 5,
                    'tree_iconset' => \PbClasses\Conf::get(['pg_icons', 'page_tree']),
                ]
        )
    ],
    'start' => ['tpl_file' => 'content-page-creator.tpl',
        'classes' => '\\PbClasses\\Backend\\BackendTree',
    ]
];
