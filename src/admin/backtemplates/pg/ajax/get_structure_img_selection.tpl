[main]
<form id="f-edit-structure" name="f-edit-structure" method="post" action="#">
    <fieldset>
        <label for="f-edit-structure_fields">Feld / Felder</label>
        <table id="f-edit-structure_img_selection">
        {IMG_SELECTION_ROWS}     
            
            
        </table>

        
    
    
        
        <div><label for="f-edit-structure_range">Zuordnung</label>
    <input id="f-edit-structure_range_all" type="radio"  value="all" name="f-edit-structure_range" checked>alle Seiten<br>
    <input id="f-edit-structure_range_group" type="radio"  value="g{GRID}" name="f-edit-structure_range">nur diese Gruppe<br>
    <input id="f-edit-structure_range_page" type="radio"  value="p{PAGEID}" name="f-edit-structure_range">nur diese Seite</div>
    
    
    </fieldset>
    
     <input type="hidden" id="f-edit-structure_pid" name="f-edit-structure-pid" value="{PAGEID}">
    <input type="hidden" id="f-edit-structure_type" name="f-edit-structure_type" value="img">
    <input type="hidden" id="f-edit-structure_id" name="f-edit-structure_id" value="{ID}">
</form> 

# todo: Auswahl aus Tabelle. Es müssen mehrere Bilder ausgewählt werden können
[img_selection_rows]
<tr>
    <td><input type="checkbox" name="f-edit-check-img[]" id="ch-{ID}" value="{ID}"></td>
    
        
    <td><img src="{THUMBNAIL}" alt="{IMGDESCR}"></td>
    <td>{IMGDESCR}</td>
    <td>{CRDATE}</td>

</tr>





