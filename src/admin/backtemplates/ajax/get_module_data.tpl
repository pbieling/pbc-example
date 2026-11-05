[mod_table]
<table>
<tr><th>MODUL:</th><th>{MOD_ID}</th><th>{PARENT_MOD}</th></tr>
<tr>
<th>ID</th>
<th>Groups</th>
<th>Pages</th>
<th>TplID</th>
<th>TplType</th>
<th>DataSource</th>
<th>Fields</th>
<th>SourceName</th>
<th>Param</th>
<th>Ord</th>
</tr>
{MOD_ROWS}


</table>
<div id="content_block"> </div>

########################
[mod_rows]
</tr>
<tr>
<td>{ID}</td>
<td>{GROUPS}</td>
<td>{PAGES}</td>
<td>{TPLID}</td>
<td>{TPLTYPE}</td>
<td>{DATASOURCE}</td>
<td>{FIELDS}</td>
<td>{SOURCENAME}</td>
<td>{PARAM}</td>
<td>{ORD}</td>

</tr>

[mod_link]
Modul: <b class="mod_link">{SOURCENAME}</b>

[parent_mod]
Elternmodul: <b class="parent_link">{LAST_MOD}</b>

[parent_mod_start]
<b>STARTMODUL</b>

[fields]
<b class="entry_link" id="s{ID}">{FIELDS}</b>

[row_tpltype]
<b class="contentrow_link" id="cr{MOD_ID}">Reihe hinzufügen</b>
