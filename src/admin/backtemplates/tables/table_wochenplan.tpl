[table]
<div class="container-fluid outer-panel-container">
    <div class="row pb-panel-heading {TABID}-filters">
        <div class="col-md-3"><h4>{DISPLAY_TABLENAME}</h4></div>
        <div id="{TABID}-filter1" data-filtername="filter1" class="col-md-3"><i class="filteronoff {TOGGLEOFF}"></i></i>
            Suche: <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" id="{TABID}_filter1_param1" class="filterparam" type="text" value="">
        </div>
        <div class="col-md-2">{INSERT_BUTTON}</div>
    </div>    
    <div class="row">
        <div class="col-md-12 pb-table-container">
            <table class="table">
                <thead>
                    <tr>{TH_ELEMENTS}<td>{HEADER_BUTTON_AREA}</td></tr>
                </thead>    
                <tbody class="pbstandard_tbody">
                    ### Template siehe unten
                    {BODY_ROWS}
                </tbody>

            </table>
        </div>
    </div>
    <div class="row pbtable-edit-tools pb-panel-footer">
        <div class="col-3 total-found-info">
            <b class="tablebody-start-nr"></b> - <b class="tablebody-end-nr"></b> von <b class="filtered-totalnumber"></b> &nbsp; insgesamt <b class="totalnumber">{TOTALNUMBER}</b>
        </div>
        <div class="col-4 amount-selection">
            <div class="form-group row">
                <label class="col-auto">Zeige: </label>
                <div class="col-auto">
                    <select class="table-limit-of-rows form-control">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-2 pagination-container">
            <ul class="pagination pagination-sm mt-3 justify-content-end">
                <li class="back page-item"><a href="#" class="page-wind page-link page-back"><span class="{CHEVRONLEFT}"></span></a></li>
                <li class="next page-item"><a href="#" class="page-wind page-link page-next"><span class="{CHEVRONRIGHT}"></span></a></li>
            </ul>
        </div>
    </div>   

</div>
#############################################################################################################

[th]
<th{ATTRIBUTES} data-fn="{FIELDNAME}">{ENTRY}</th>

[th_OrgIndex]
<th{ATTRIBUTES} class="editable_deftable" data-fn="{FIELDNAME}">{ENTRY} <i class="{PENCIL}"></i></th>

[th_EventIndex]
<th{ATTRIBUTES}  class="editable_deftable" data-fn="{FIELDNAME}">{ENTRY} <i class="{PENCIL}"></i></th>

[body_rows]
#row-identifier wird gebraucht, um das row-Element zu identifizieren, z.B. beim Löschen mit dem Deletebutton
#Denkbar wären auch andere (nicht-tr-Elemente)
<tr class="row-identifier {ROW_CLASSES}">{TD_ELEMENTS}<td class="text-nowrap">{BUTTON_AREA}</td></tr>


# Standard-td
[td]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}">{ENTRY}</td>

[td_Raum1]
<td class="switchvalue" data-fn="{FIELDNAME}" data-switchvalue="{ENTRY}"><button class="btn btn-sm pbtbl-upd-target">{SWITCH_LABEL}</button></td>
[td_Raum2]
<td class="switchvalue" data-fn="{FIELDNAME}" data-switchvalue="{ENTRY}"><button class="btn btn-sm pbtbl-upd-target">{SWITCH_LABEL}</button></td>






[td_WdIndex]
<td class="{CLASSES} rlentry"{ATTRIBUTES} data-fn="{FIELDNAME}" data-rlentry="{ENTRY}">{GERMAN_WEEKDAY}</td>
[td_OrgIndex]
<td class="{CLASSES} rlentry"{ATTRIBUTES} data-fn="{FIELDNAME}" data-rlentry="{ENTRY}">{ORGANISATION_LABEL}</td>
[td_EventIndex]
<td class="{CLASSES} rlentry"{ATTRIBUTES} data-fn="{FIELDNAME}" data-rlentry="{ENTRY}">{EVENT_LABEL}</td>

[td_DatumVon]
<td class="{CLASSES} rlentry"{ATTRIBUTES} data-fn="{FIELDNAME}" data-rlentry="{ENTRY}">{FIELDVALUE_DATEFROMSHOW}</td>
[td_DatumBis]
<td class="{CLASSES} rlentry"{ATTRIBUTES} data-fn="{FIELDNAME}" data-rlentry="{ENTRY}">{FIELDVALUE_DATETOSHOW}</td>




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


[body_message_onempty_start]
<tr><td>
        Es sind keine Termine vorhanden. Mit dem Button <i>Termin eintragen</i> können Sie einen neuen Eintrag machen.
    </td>
</tr>