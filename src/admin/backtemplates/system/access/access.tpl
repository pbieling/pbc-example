[group2user_table]
<table class="table" id="table-group2user">
    {TABLE_ROWS}
</table>

 
#[UID] => 1
#[Uname] => peter
#[RealName] => Peter Bieling
#[Chk] => 1

    
[table_rows]
<tr><td><input type="checkbox" data-oldval="{CHK}" value="{UID}" {CHECKED}></td>
    <td>{UNAME}</td>
    <td>{REALNAME}</td></tr>



##########Gruppenmitglieder in Acces-Groups-Tabelle
[group_member]
<strong class="groupmember-item" title="{REALNAME}">{UID} - {UNAME}</strong>

[page2groups_table]
<table class="table" id="table-page2groups">
    {PAGE2GROUPS_ROWS}
</table>

[page2groups_rows]
<tr><td><input type="checkbox" data-oldval="{CHK}" value="{GID}" {CHECKED}></td>
    <td>{GKEY}</td>
    <td>{GLABEL}</td></tr>



