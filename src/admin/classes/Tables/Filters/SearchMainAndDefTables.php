<?php

namespace MyProject\Tables\Filters;

class SearchMainAndDefTables extends \PbClasses\Table\Filters\AbstractQueryPart {

    protected function buildQueryPart() {
        $param1 = $this->kvArr['param1'];
        $tableOrg = 'pbcdemo_organisation';
        $tableEvents = 'pbcdemo_events';

        $this->sqlPart = "OrgIndex = ("
                . "SELECT $tableOrg.OrgIndex FROM $tableOrg  WHERE $tableOrg.OrgName LIKE  '%" . $param1 . "%'"
                . ") OR EventIndex = ( "
                . "SELECT $tableEvents.EvIndex FROM $tableEvents  WHERE $tableEvents.EvName LIKE  '%" . $param1 . "%'"
                . ")";
    }

}
