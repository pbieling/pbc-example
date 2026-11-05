[content_table]
<table>
<tr><th>MODUL:</th><th>{MOD_ID}</th><th colspan="2">PageID {PAGE_ID}</th></tr>
<tr>
<th>ID</th>
<th>Row</th>
<th>Platzhalter</th>
<th>Inhalt</th>
<th>Filter</th>
</tr>
{CONTENT_ROWS}


</table>
<div id="content_block"> </div>

########################
[content_rows]
#Placeholder 	Entry 	Filter
</tr>
<tr id="cre-{ID}-{MODID}-{PAGEID}-{PLACEHOLDER}-{ROW}" class="contentrow">
<td>{ID}</td>
<td class="content_row_row">{ROW}</td>
<td class="content_row_placeholder">{PLACEHOLDER}</td>
<td class="content_row_entry">{ENTRY}</td>
<td class="content_row_filter">{FILTER}</td>
</tr>

###############