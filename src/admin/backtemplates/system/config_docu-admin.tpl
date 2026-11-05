[main]
<?php
return array (
    'PAGE_ID' => {ID},
    'class_param' => array('MDocTree' => ['isAdmin' => true]),
    'outer_tpl_file' => 'bs_dashboard1.tpl',
    'tpl_file' => 'modules/module_content_standard.tpl',
    'se_re' =>
        array(
            'pagetitle' => 'Doku-Verwaltung',
            'mainheader' => 'Doku-Verwaltung',
            'pbconfdata' => json_encode(['pid' => {ID}])
        ),
    'start' => array(
        'modules' => array('documentation/{DOCU_NAME}' => array('placeholder' => 'module_output',
                                                     'namespace'   => 'commondocu'))
    )
);