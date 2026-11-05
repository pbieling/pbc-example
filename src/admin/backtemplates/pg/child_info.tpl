[main]
<div id="module-info">
#####a.TplID, a.TplType as StructureTemplateType, b.FileName, b.TplName, b.TplType as TplTplType, b.Label
    <table id="module-info-table">
        <thead><tr><th colspan="5" id="module-info-table-label">{LABEL}</th></tr></thead>
        <tbody><tr><th>TplID</th><th>Typ</th><th>TplDatei</th><th>TplName</th><th>TplTyp</th></tr>
        
            
            
        <tr><td>{TPLID}</td><td>{STRUCTURETEMPLATETYPE}</td>
        #### Template über ID finden und nicht über den Namen. Eventuell gibt es später auch andere Quellen (DB).    
        <td id="tpl-filename" data-tplid="{TPLID}">{FILENAME}</td><td style="font-weight: bold;color:darkgreen;">{TPLNAME}</td><td>{TPLTPLTYPE}</td></tr>
        
        
        {IF_MOD_ROW}
        
        <tr><td id="edit-fields-link" data-strid="{STRUCTURE_ID}" data-src="{DATASOURCE}">Felder:</td>
            <td colspan="4" id="fields-td">{FIELDS_LINK}</td></tr>
        <tr><td>Quelle:</td><td colspan="4">{DATASOURCE}</td></tr>
        <tr><td>&nbsp;</td><td colspan="4">{SOURCENAME_LINK}</td></tr>
        <tr><td id="edit-structure-group" data-strid="{STRUCTURE_ID}" data-src="{DATASOURCE}" data-value="{GROUPS}">Gruppen:</td><td colspan="4">{GROUPS}</td></tr>
        <tr><td id="edit-structure-page" data-strid="{STRUCTURE_ID}" data-src="{DATASOURCE}" data-value="{PAGES}">Seiten:</td><td colspan="4">{PAGES}</td></tr>
        </tbody>
    </table>   
    
</div>
        
#############
# Tenplateinfos des aktuellen Moduls. (Angezeigt unterhalb des Elternmoduls
[if_mod_row]
        <tr><td>{TPLID}</td><td>{STRUCTURETEMPLATETYPE}</td>
        <td id="tpl-filename" data-tplid="{TPLID}">{FILENAME}</td><td style="font-weight: bold;color:darkgreen;">{TPLNAME}</td><td>{TPLTPLTYPE}</td></tr>
        
        
[sourcename_link]
<span id="include_sourcename">{SOURCENAME}</span>


[sourcename_projectclass]
Klasse: <span id="projectclass_sourcename">{SOURCENAME}</span><br>
Parameter: <span id="projectclass_param">{PARAM}</span><br>
<button id="edit_projectclass_entry" class="btn-info pg-update-action" type="button" data-strid="{STRUCTID}">Bearbeiten</button>



#[img_sourcename_link]
#<span id="img_sourcename_link">{SOURCENAME}</span>
[img_table]
<table>
    {TABLE_ROWS}
</table>
[table_rows]
<tr>
    <td><img src="{THUMB_LINK}" class="structure_image_element" alt=""></td>
    <td>{IMGDESCR}</td>
    <td>{IMGFILE}</td>
    <td>{IMAGENR}</td>
    <td>{ROW}</td>
    
    
[table_rows_empty]
<button type="button" class="btn btn-primary structure_image_element">Bild einfügen</button>
        
        
        

    
[fields_link]
<span data-strid="{STRUCTURE_ID}" id="fields_link">{FIELDS}</span>