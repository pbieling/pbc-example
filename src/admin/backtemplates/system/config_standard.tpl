[main]
<?php
return [
    'PAGE_ID' => {ID},
    //'outer_tpl_file' => 'my_own_outer.tpl',
    //'tpl_file' => 'my-content.tpl', // Default: pb-standard-start.tpl
    //'js_files' => ['/js/test1.js'],
    //'css_files' => ['/css/test1.css'],
    'se_re' => //Placeholders
    [
        'pagetitle' => 'New page',
        'mainheader' => 'New page'
    ],
    /*
      'start' => [
      'classes' => ['\\MyProject\\ClassName1',
      '\\MyProject\\ClassName2'],
      ],
     */
    'action' =>  //If you need a classical post request without Ajax you have to configure it here.
    [
        'make_job' => [
            // 'classes'    => ['\\MyProject\\ClassName1',
            //                      '\\MyProject\\ClassName2'],
            //  'tpl_file' => 'make_job.tpl',  //Default: pb-standard-action.tpl
            // 'tpl_name' => 'content2'
        ]
    ]
];
