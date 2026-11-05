[main]
<?php
return array (
    'PAGE_ID' => {ID},
    'outer_tpl_file' => 'bs_dashboard1.tpl',
    //'tpl_file' => 'my-content.tpl', //Anpassen
    //'js_files' => array('/js/test1.js'),
    //'css_files' => array('/css/test1.css'),

    'se_re' =>
            array('pagetitle' => 'Testseite 1',
                  'mainheader' => 'Testseite 1'),
                 
    /*
    'start' => array(
         'classes' => array('\\MyProject\\ClassName1',
                            '\\MyProject\\ClassName2'),
        
        
    ), 
    */ 
    
   'action' => 
        array('make_job' => array(
                
            // 'classes'    => array('\\MyProject\\ClassName1',
            //                      '\\MyProject\\ClassName2' ),
                 
            //Wenn leer, wird pb-standard-action.tpl verwendet.
                 
            //  'tpl_file' => 'make_job.tpl',
            // 'tpl_name' => 'content2'
            ))
);

