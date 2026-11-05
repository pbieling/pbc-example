<?php

namespace PbModule_commondocu;

use PbModule_commondocu\MConf;
use PbClasses\Conf;

require_once __DIR__ . '/classes/autoloader.php';
\call_user_func(function () {
    //Im Admin-Modus werden andere Javascript-Dateien benötigt
    $isAdmin = (!empty(Conf::get('page_conf')['class_param']['MDocTree']['isAdmin'])) ? true : false;

    $module_name = 'documentation/demodoc';
    $namespace = '\\PbModule_' . $module_name . '\\';
    
    $modHttpRoot = '/modules/' . $module_name . '/';
    $modRoot = __DIR__ . '/';

    //Bei mehreren Dokumentationen können Dateien gemeinasamm verwendet werden

    $commonDocPath = \PbClasses\Conf::get('DOCROOT') . 'modules/documentation/common/';
    $modTplPath = $commonDocPath . 'templates/';
    $fronttpl_path =  $modTplPath . 'fronttemplates/';
    $commonDocHttp = '/modules/documentation/common/';

    $table_prefix = 'demodoc__';

    $jsFiles = array(
        '/3rd/node_modules/jstree/dist/jstree.min.js',
        '/3rd/node_modules/toastr/build/toastr.min.js',
        '/js/pbmodal.js',
        '/js/pbtoast.js',
        '/js/table-base.min.js' => ['type' => 'module'],
        '/3rd/node_modules/prismjs/prism.js',
        '/3rd/node_modules/prismjs/plugins/autoloader/prism-autoloader.min.js',
        '/3rd/node_modules/markdown-text-editor/dist/markdown-text-editor.js'
    );
    $cssFiles = array(
       // '/admin/css/jstree-pb.css',
        '/css/modal.css',
        '/3rd/node_modules/prismjs/themes/prism.css',
        '/3rd/node_modules/jstree/dist/themes/default/style.min.css',
        '/3rd/node_modules/toastr/build/toastr.min.css',
        '/css/pb-table.css',
        '/3rd/node_modules/markdown-text-editor/dist/markdown-text-editor.css'
    );
    if ($isAdmin) {
        array_push($jsFiles,
                $commonDocHttp . 'js/doc_imguploader.js',
                '/3rd/node_modules/prismjs/components/prism-markup.min.js',
                '/3rd/node_modules/prismjs/components/prism-markup-templating.min.js',
                '/3rd/node_modules/prismjs/components/prism-clike.min.js',
                '/3rd/node_modules/prismjs/components/prism-php.min.js',
                '/3rd/node_modules/prismjs/components/prism-smarty.min.js',
                '/3rd/node_modules/prismjs/components/prism-sql.min.js',
                
        );
        
        $jsFiles[$commonDocHttp . 'js/doc_admin.js'] =  ['type' => 'module'];
        array_push($cssFiles, 
                '/css/doc.css', 
                $commonDocHttp . 
                'css/doc_admin.css',
                $commonDocHttp . 'css/file_upload.css',
                '/3rd/node_modules/codejar-linenumbers/js/codejar-linenumbers.css',
                
                
                );
    } else {
        array_push($jsFiles, $commonDocHttp . 'js/doc_show.js');
        array_push($cssFiles, '/css/doc.css');
        
    }

    $docuConf = array(
        'public' => array('tree_tpl' => $modTplPath . 'doc/site-tree.tpl',
            'search_tpl' => $modTplPath . 'doc/ajax/search.tpl'),
        'admin' => array('tree_tpl' => $modTplPath . 'doc/site-admintree.tpl',
            'module_form_tpl' => $modTplPath . 'doc/ajax/module_form.tpl',
            'image_upload_tpl' => $modTplPath . 'doc/ajax/image_upload.tpl',
            'thumb_src_dir' => $modRoot . 'upload/img/thumbs',
            'thumb_http_path' => $modHttpRoot . 'upload/img/thumbs/',
            'img_src_dir' => $modRoot . 'upload/img',
            'image_destination_dir' => $modRoot . '/media/img/',
            //'image_upload_dir' => $modRoot . 'upload/img/',
            'thumb_destination_dir' => $modRoot . 'upload/img/thumbs/registered/',
            'img_allowed_types' => ['jpg', 'gif', 'png'],
            'thumb_max_size' => 100
        ),
        'doc_tables' => array(
            "PAGE_INDEX" => $table_prefix . 'doc_index',
            "PAGE_STRUCTURE" => $table_prefix . 'doc_structure',
            "PAGE_TEMPLATES" => $table_prefix . 'doc_templates',
            "PAGE_CONTENT" => $table_prefix . 'doc_content',
            "PAGE_NAVIS" => $table_prefix . 'doc_navis',
            "PAGE_IMAGES_DEST" => $table_prefix . 'doc_images_dest',
            "PAGE_IMAGES_INDEX" => $table_prefix . 'doc_images_index',
            "PAGE_METAS" => $table_prefix . 'doc_metas',
            "PAGE_TOKENS" => $table_prefix . 'doc_tokens',
            "PAGE_MODULES" => $table_prefix . 'doc_modules',
            //"PAGE_CONTENT_PATH" => $apath . 'pagecontent/',
            "PAGE_INDEX_INLINE" => $table_prefix . 'doc_index_inline',
            "PAGE_CONTENT_INLINE" => $table_prefix . 'doc_content_inline',
            "PAGE_INLINE_FIELDS" => $table_prefix . 'doc_inline_fields'),
        'doc_vars' => array("STANDARD_DE_IMGDIR" => $modHttpRoot . 'media/img/',
            'FRONTTPLPATH' => $fronttpl_path, //$tpl_path,
            'PAGE_CONTENT_PATH' => \PbClasses\Conf::get('APATH') . 'pagecontent/',
            'PROJECT_METHODS_CLASS' => '\\PbClasses\\MDoc\\OwnProjectMethods',
            'placeholder_filter' => array('keywords' => '',
                'maintext' => 'md',
                'teaser' => ''),
            'code_types' => array('code_php' => 2,
                'code_html' => 3,
                'code_pbtpl' => 4,
                'code_css' => 5,
                'code_javascript' => 7,
                'code_xml' => 8,
                'code_sql' => 9
            ),
            'doc_media_pdf' => $modHttpRoot . 'media/pdf/',
            'doc_media_video' => $modHttpRoot . 'media/video/',
            'img_http_dir' => $modHttpRoot . 'media/img/',
            'image_types' => array('image_standard' => 16,
                'image_author_floatleft' => 10,
                'image_author_description_floatleft' => 11,
                'image_description_floatleft' => 12,
                'image_author_floatright' => 13,
                'image_author_description_floatright' => 14,
                'image_description_floatright' => 15
            ),
            
            'docu_tpl_sere' => ['module_name' => $module_name]
    ));

    MConf::merge(array(
        'docu_conf' => $docuConf,
        'MODHTTPROOT' => $modHttpRoot,
        'MODTPLPATH' => $modTplPath,
        'output_sere' => array(
            'icn_key' => \PbClasses\Conf::get('icn_key'), //Wird für CSS-Modifizierung gebraucht
            'module_data' => json_encode([
                'name' => $module_name,
                'nsp' => __NAMESPACE__,
                
            ]),
            //Wenn das Modul im Unterverzeichis ist, und dadurch einen Slash im Namen hat, muss dieser für das Tabellensystem
            //geändert werden. Im Allocator wird das zurückgewandelt.
            'table_keyname' => 'module_documentation-7-demodoc_table_images'),
        'output_tpl_file' => null,
        'output_tpl_name' => 'content',
        'mod_start' => array(
            'output_tpl_file' => ($isAdmin) ? $modTplPath . 'doc/content-docadmin.tpl' : $modTplPath . 'doc/content-doc.tpl',
            'css_files' => $cssFiles,
            'js_files' => $jsFiles,
            'classes' => ['\\PbClasses\\MDoc\\DocTree' => $docuConf],
            'se_re' =>
            array('pagetitle' => 'Dokumentation',
                'mainheader' => 'Dokumentation')
        ),
    ));
});

return __NAMESPACE__;

