<?php
namespace MyProject\Tables\Def;

/**
 * 
 *
 * @author Bieling Peter
 */
class GermanWeekday {
    protected $germanWeekdayArr = [
        0 => '',
        1 => 'MO',
        2 => 'DI',
        3 => 'MI',
        4 => 'DO',
        5 => 'FR',
        6 => 'SA',
        7 => 'SO'
        
    ];
    
    
    
    public function __construct($placeholder, & $sr, & $tdArr, & $conf) {
        $sr[$placeholder] = $this->germanWeekdayArr[$tdArr['WdIndex']];
    }
}
