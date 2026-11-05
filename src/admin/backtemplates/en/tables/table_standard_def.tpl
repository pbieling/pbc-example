[table]
<div class="container-fluid outer-panel-container ">
    <div class="row pb-panel-heading {TABID}-filters form-inline">
        <div class="col-md-2">{INSERT_BUTTON}</div>
    </div>    
    <div class="row">
        <div class="col-md-12 pb-table-container">
            <table class="table">
                # Klasse pbstandard_thead ermöglicht sortable
                <thead class="pbstandard_thead"> 
                    <tr>{TH_ELEMENTS}<td>{HEADER_BUTTON_AREA}</td></tr>
                </thead>   

                <tbody class="pbstandard_tbody pbtbl-sortable-rows" data-pbtblsort="{PBTBL_SORTKEY}">
                    ### Template siehe unten
                    {BODY_ROWS}
                </tbody>

            </table>
        </div>
    </div>
 

</div>

#############################################################################################################


[th]
<th{ATTRIBUTES} data-fn="{FIELDNAME}">{ENTRY}</th>


[body_rows]
<tr class="row-identifier {ROW_CLASSES}">{TD_ELEMENTS}<td class="text-nowrap">{BUTTON_AREA}</td></tr>


# Standard-td
[td]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}">{ENTRY}</td>

[td_Hide]
<td class="switchvalue" data-fn="{FIELDNAME}" data-switchvalue="{ENTRY}"><button class="btn btn-sm pbtbl-upd-target">{SWITCH_LABEL}</button></td>

[td_Ord]
<td class="pbtbl-movehandle {CLASSES}"{ATTRIBUTES} data-id="{ID}" data-fn="{FIELDNAME}"><i class="{TABLESORTUPDOWN}" title="Umsortieren"></i></td>


########## wird angefügt, wenn changeable true ist.
[change_button]
<button type="button" class="change-row btn btn-default" data-btntype="change" data-change-id="{PRIMARY_KEY_VAL}"><i class="{PENCIL}"></i></button>

########## wird angefügt, wenn deletable true ist.
[delete_button]
<button type="button" class="remove-row btn btn-default" data-btntype="delete" data-id="{PRIMARY_KEY_VAL}"><i class="{TRASH}"></i></button>

[insert_button]
<button type="button" class="insert-row btn btn-primary btn-sm" data-btntype="insert">Neuer Eintrag</button>


[header_button_area]
&nbsp;

[standard_option]
<option value="{OPTION_VALUE}">{OPTION_LABEL}</option>