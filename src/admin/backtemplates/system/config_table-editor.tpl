[main]
<?php
return array(
    'PAGE_ID' => {ID},
    'outer_tpl_file' => 'bs_dashboard1.tpl',
    'css_files' => array(
                         '/css/pb-table.css',
                         '/3rd/toastr/build/toastr.min.css',
                         '/admin/css/edituser.css'),
        'js_files' => array(
        '/3rd/bootstrap-show-modal/src/bootstrap-show-modal.js',
        '/3rd/toastr/build/toastr.min.js',
        '/js/pbtoast.js',
        '/js/table-base.js'),
    'se_re' =>
    array('pagetitle' => 'Table-Editor',
        'mainheader' => 'Table-Editor'),
    
    
    
    'start' => array('tpl_file' => 'content-tableeditor-{ID}.tpl'
    )  
    
    
);

