<?php
namespace PbModule_marmelade1;
use PbModule_marmelade1\MConf;
require_once __DIR__ . '/classes/autoloader.php';
\call_user_func(function() {
    $module_name = 'marmelade1';
    $namespace = '\\PbModule_' . $module_name . '\\';
    $tpl_path = __DIR__ . '/templates/';
    $pdf_path = __DIR__ . '/pdf/';
    $mod_http_root = '/modules/' . $module_name . '/';

    $pdf_conf = [
        
        'classes' => $namespace . 'pdf\\BuildLabels',
       // 'filename' => __DIR__ . '/output/jam.pdf',
        //'pdf_output_dir' => __DIR__ . '/output/',
        //'pdf_location_dir' => '/modules/marmelade1/output/',
        
        
        'data' =>  [
            'xml_template' => $pdf_path . 'xml_templates/marmelade1.xml',
            'start_x' => 20,
               'start_y' => 20, 
            'y_offset_row1' => 5,
            'y_offset_row2' => 19,
            
            'cols' => 3,
            'rows' => 6,
            'col_width' => 60,
            'row_height' => 40],
        
        
        'page' => $pdf_path . 'user_xml/page.xml',
        'PDF_IMGPATH' => $pdf_path . 'images/',
        'PDF_DUMMY_IMG' => $pdf_path . 'images/dummy.jpg',
    ];


    MConf::merge([
        'pdf_conf' => $pdf_conf,
        'MODTPLPATH' => $tpl_path,
        'output_sere' => [],
        'output_tpl_file' => null,
        'output_tpl_name' => 'content',

        'mod_actions' => [
            'make_preview' => [
                'classes' => [
                    $namespace . 'MakeJam'
                ]
            ],
        ],
        'mod_start' => [
            'output_tpl_file' => $tpl_path . 'marmelade-form.tpl',
            'output_sere' => [
                'date_now' => date('Y-m-d')
            ],
            'css_files' => [
                //$mod_http_root . 'css/brief.css'
            ],
            'js_files' => [
                $mod_http_root . 'js/marmelade.js'
            ]
        ],
    ]);
});
return __NAMESPACE__;