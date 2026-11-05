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
<tr>
<td>{ID}</td>
<td>{ROW}</td>
<td>{PLACEHOLDER}</td>
<td class="content_row_entry" id="cre_{ID}">{ENTRY}</td>
<td>{FILTER}</td>
</tr>

###############