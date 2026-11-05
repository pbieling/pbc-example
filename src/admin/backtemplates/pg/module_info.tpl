[main]
<div id="module-info">
#####a.TplID, a.TplType as StructureTemplateType, b.FileName, b.TplName, b.TplType as TplTplType, b.Label
    <table id="module-info-table">
        <thead><tr><th colspan="5" id="module-info-table-label">{LABEL}</th></tr></thead>
        <tbody><tr><th>TplID</th><th>Typ</th><th>TplDatei</th><th>TplName</th><th>TplTyp</th></tr>
        <tr><td>{TPLID}</td><td>{STRUCTURETEMPLATETYPE}</td>
        #### Template über ID finden und nicht über den Namen. Eventuell gibt es später auch andere Quellen (DB).    
        <td id="tpl-filename" data-tplid="{TPLID}">{FILENAME}</td><td style="font-weight: bold;color:darkgreen;">{TPLNAME}</td><td>{TPLTPLTYPE}</td></tr></tbody>
    </table>   
    
</div>
    
