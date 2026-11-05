<?php
namespace PbModule_pbletter1;
use PbModule_pbletter1\MConf;

require_once __DIR__ . '/classes/autoloader.php';
\call_user_func(function() {
    $module_name = 'pbletter1';
    $namespace = '\\PbModule_' . $module_name . '\\';
    //$project_name = \PbClasses\Conf::get('project_name');
    $database = 'pbletter1';
    //$table_prefix = $database . $project_name . '__' . $module_name . '__';
    $table_prefix = $database . '.' . $module_name . '__';
    $tpl_path = __DIR__ . '/templates/';
    $pdf_path = __DIR__ . '/pdf/';
    $mod_http_root = '/modules/' . $module_name . '/';

    $pdf_conf = array(
        'header' => $pdf_path . 'user_xml/header-pb.xml',
        'footer' => $pdf_path . 'user_xml/footer-pb.xml',
        'user' => $pdf_path . 'user_xml/letter-pb.xml',
        'page' => $pdf_path . 'user_xml/page.xml',
        'PDF_IMGPATH' => $pdf_path . 'images/',
        'PDF_DUMMY_IMG' => $pdf_path . 'images/dummy.jpg',
        'pdf_output_dir' => \dirname(\PbClasses\Conf::get('APATH')) . '/dokumente/briefe/',
        'pdf_http_dir' => '/dokumente/briefe/'
    );


    MConf::merge(array(
        'pdf_conf' => $pdf_conf,
        'MODTPLPATH' => $tpl_path,
        'output_sere' => array(),
        'output_tpl_file' => null,
        'output_tpl_name' => 'content',
        /*
          'module_db_credentials' => array('host' => 'localhost',
          'user' => 'root',
          'pwd' => '4zZ81sOs',
          'db' => $project_name),
         */
        'mod_tables' => array(
            'briefe' => $table_prefix . 'briefe',
            'entries' => $table_prefix . 'entries'
        ),
        'mod_actions' => array(
            'make_preview' => array(
                'classes' => array(
                    $namespace . 'MakePbLetterPdf'
                )
            ),
            //Todo: muss nicht als newaction definiert werden
            'save' => array(
                'testkey' => 'testvalue',
                'classes' => array(
                    $namespace . 'MakePbLetterPdf'
                )
            )
        ),
        'mod_start' => array(
            'output_tpl_file' => $tpl_path . 'pbletter-form.tpl',
            'output_sere' => array(
                'briefdatum' => date('d.m.Y')
            ),
            'css_files' => array(
                $mod_http_root . 'css/brief.css'
            ),
            'js_files' => array(
                $mod_http_root . 'js/pbletter.js'
            )
        ),
    ));
    // \PbClasses\Develop::test(MConf::getAll(), __LINE__, 0);
});
return __NAMESPACE__;




