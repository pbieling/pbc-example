<?php

/*
 * This configurartion supplements or modifies the standard settings 
 * in \PbClasses\Init/() on a project-specific basis.
 * (Page-specific configuration takes place in the admin/config folder.)
 */

use PbClasses\Conf;
use PbClasses\Exception\Messages;

(function (): void {
    $project_name = 'pbc-backend';
    //$docroot = dirname(__DIR__) . '/';
	
    $projectroot = dirname(dirname(__DIR__));
	$docroot = $projectroot . '/htdocs/';
    $own_namespace = 'MyProject';
    $icon_key = 'bi'; //  'fa'; //Font Awesome //bi = Bootstrap-Icons
    $icon_css_arr = [
        'fa' => '/3rd/node_modules/@fortawesome/fontawesome-free/css/all.min.css',
        'bi' => '/3rd/node_modules/bootstrap-icons/font/bootstrap-icons.min.css'//
    ];
    $tpl_path = Conf::get('BACKTPLPATH');
    $sub_dir = ''; //This project is located in the docroot and not in a subdirectory.
    $table_prefix = 'pbc__';
    Conf::merge(
            [
                
                //'pref_lang' =>  'el', //The value is taken from the browser and can be overwritten here if needed.
                'icn_key' => $icon_key,
                'backnavi_accesslevel' => true,
                //Use this part to configure the support of different languages
                'I18n' => [
                    'project_lang' => 'de',
                    //if no language file is given for the project language, use the second parameter and not
                    //the default langauage file:
                    'default_value_if_project_lang' => true,
                    'supported_lang' => ['de', 'en', 'el'],
                    'language_selection' => [
                        'de' => 'DE',
                        'en' => 'EN',
                        'el' => 'GR'
                    ],
                    'fallback_language' => 'en', //If the user language is not supported the fallback is English [en]
                    'navigation_translation_table' => 'pbc__navigation_translation'
                ],
                'se_re' => [
                    'OUTER_TPL_PROJECT_NAME' => 'My Project', //Fills the project name or company name at the top of the page
                    'data_subroot' => '',
                    'BREADCRUMBNAVI' => '',
                    //change the footer in this file :
                    'myfooter' => file_get_contents(__DIR__ . '/includes/myfooter.inc.html')
                ],
                'DOCROOT' => $docroot,
                'sub_dir' => $sub_dir, //project starts in subdir : i.e. https:://project.test/subdir_one/index.php
                'global_css' => [
                    '/css/dashboard.css',
                    $icon_css_arr[$icon_key]
                ],
                'with_sql' => true,
                //'session' => false, //No session is required for some projects. Sessions are available by default.
                'ajax_no_user_check' => false,
                'navi' => 'navi-left-neu',
                // 'navi_autoprepend' => $sub_dir . '/', 
                // 'subnavi' => ['sidenavi', 'standard', 'sidenavi.tpl'],
                'breadcrumbnavi' => ['breadcrumbnavi', 'standard', 'breadcrumb.tpl'],
                'user_notification_mail' => 'test@mytest.test',
                'db_credentials' => require $projectroot . '/db-config/db_credentials.conf.php',
                //This part will activate the user check by access table
                'access_tables' => [
                    'PAGE2GROUPS_TABLE' => $table_prefix . 'access_page2groups',
                    'GROUP_TABLE' => $table_prefix . 'access_groups',
                    'USER2GROUPS_TABLE' => $table_prefix . 'access_user2groups',
                    'PAGE2USER_TABLE' => $table_prefix . 'access_page2user'
                ],
                //By default, all unregistered pages are blocked.
                'access_conf' => ['no_entry_is_free' => true], //default false
                'MODULE_PATH' => $docroot . 'modules/',
                'sess_config' => [
                    'SESSPATH' => __DIR__ . '/system/sessions',
                //      'SESSNAME' => 'php_mysession'
                ],
                'table_prefix' => $table_prefix,
                'project_name' => $project_name,
                // 'logout_destination' => '/', //  default: '/'
                'loadable_js_templates' => ['table_forms' => $tpl_path . 'tables/table_js_forms.tpl'],
                'own_namespace' => $own_namespace,
                'ownclasses_namespace' => '\\' . $own_namespace . '\\',
                'pbc_version' => '0.2', //Flag for the framework. Don't change.
    ]);
    //Icons are defined in separate configurations to make them interchangeable.
    Conf::merge(require __DIR__ . '/icons_' . $icon_key . '.conf.php');
    
    //LANGUAGE SUPPORT FOR SYSTEM ERRORS.
    Messages::loadFile(__DIR__ . '/system/languages/system_errors.php');
    //Ignores a missing file with the scnd. parameter set to false:
    //Messages::loadFile(__DIR__ . '/system/languages/system_errors-eee.php', false);
    //Set autoloader for own project classes
    require_once __DIR__ . '/classes/autoloader.php';

})();
