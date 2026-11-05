[table]
<h4>Templates-Tabelle</h4>
#<h4>{TABLENAME}</h4>
<div style="display:none;" class="pbtable-edit-tools"></div>
<table class="pbstandard_table">
    <thead class="pbstandard_thead">
        <tr>{TH_ELEMENTS}</tr>
    </thead>    
    <tbody class="pbstandard_tbody">
        {BODY_ROWS}
        <tr><td class="editable_template_file" data-tplid="0">neues.tpl</td></td>
    </tbody>
    
</table>
    
    
[th]
<th{ATTRIBUTES}>{ENTRY}</th>

[th_FileName]
<th style="color:blue;">{ENTRY}</th><th>Modul</th>


[body_rows]
<tr class="pbstandard_tr">{TD_ELEMENTS}</tr>

[td]
<td>{ENTRY}</td>

[td_FileName]
<td class="editable_template_file" data-tplid="{ID}">{ENTRY}</td><td class="tpl-module" id="tplmod-{ID}"></td>