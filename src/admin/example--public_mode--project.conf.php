<?php

use PbClasses\Conf;

call_user_func(function () {
    $project_name = 'pbc-backend';
    $own_namespace = 'MyProject';
    $icon_key = 'bi';//  'fa'; //Font Awesome //bi = Bootstrap-Icons
    $icon_css_arr = [
        'fa' => '/3rd/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        'bi' => '/3rd/node_modules/bootstrap-icons/font/bootstrap-icons.min.css'//
    ];
    $tpl_path = Conf::get('BACKTPLPATH');
    $sub_dir = ''; //This project is located in the docroot and not in a subdirectory
    $table_prefix = 'pbc__';
    Conf::merge(
      [
        'pbc_version' => '0.1', //At the moment, this has no impact.
        'public_mode' => true,
        'icn_key' => $icon_key,
        'se_re' => [
            'OUTER_TPL_PROJECT_NAME' => 'PbClasses',
            'data_subroot' => '',
            'BREADCRUMBNAVI' => ''
        ],
        'DOCROOT' => \dirname(__DIR__) . '/',
        'sub_dir' => $sub_dir, //for projects in subdir
        'global_css' => [
            '/css/dashboard.css',
            $icon_css_arr[$icon_key]
        ],
        'with_sql' => true,
        'session' => true,
        'ajax_no_user_check' => true, //false,
        'navi' => 'navi-left-neu',
        // 'navi_autoprepend' => $sub_dir . '/', 
        // 'subnavi' => ['sidenavi', 'standard', 'sidenavi.tpl'],
        'breadcrumbnavi' => ['breadcrumbnavi', 'standard', 'breadcrumb.tpl'],
        'user_notification_mail' => 'test@mytest.test',
        'db_credentials' => ['host' => 'localhost',
            'user' => 'root',
            'pwd' => 'your-password', //
            'db' => 'pbc-backend'],
        /*
         //This part will activate the user check by access table
        'access_tables' => [
            'PAGE2GROUPS_TABLE' => $table_prefix . 'access_page2groups',
            'GROUP_TABLE' => $table_prefix . 'access_groups',
            'USER2GROUPS_TABLE' => $table_prefix . 'access_user2groups',
            'PAGE2USER_TABLE' => $table_prefix . 'access_page2user'
        ],
        'access_conf' => ['no_entry_is_free' => true], //default false
         */ 
          
        'module_path' => \dirname(__DIR__) . '/modules/',
        'sess_config' => [
            'SESSPATH' => __DIR__ . '/system/sessions',
        //      'SESSNAME' => 'php_mysession'
        ],
       
        'table_prefix' => $table_prefix,
        'project_name' => $project_name,
        // 'logout_destination' => '/', //Standard: '/'
        'loadable_js_templates' => ['table_forms' => $tpl_path . 'tables/table_js_forms.tpl'],
        'own_namespace' => $own_namespace,
        'ownclasses_namespace' => '\\' . $own_namespace . '\\',
    ]);
    //Icons are defined in separate configurations to make them interchangeable.
    Conf::merge(require __DIR__ . '/icons_' . $icon_key . '.conf.php');
    
    //Set autoloader for project classes
    require_once __DIR__ .  '/classes/autoloader.php';
});
