<?php
namespace MyProject;
use PbClasses\Conf;
class ApprovalSelection {
    public function __construct(& $sr, $t) {
        $db = Conf::get('db');
        $what = "Frg as option_value, Frg as option_label";
        $condition = "GROUP BY Frg order by option_value";
        $res = $db->selectAssoc($sr['tablename'], $what, '', '', $condition);
        $sr['frg_option_rows'] = (! $res) ? '' : $t->fillRowTpl('standard_option', $res);
    }
}
