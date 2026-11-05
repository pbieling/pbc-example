<?php

namespace MyProject\Tables\Def;

use PbClasses\Conf;

/**
 * 
 *
 * @author Bieling Peter
 */
class OrganisationLabel {

    const TABLE_DEF = 'pbcdemo_organisation';

    public function __construct($placeholder, & $sr, & $tdArr, & $conf) {
        $sr[$placeholder] = Conf::get('db')->selectSingleVal(self::TABLE_DEF, 'OrgName', ['OrgIndex' => $tdArr['OrgIndex']], '-');
    }

}



