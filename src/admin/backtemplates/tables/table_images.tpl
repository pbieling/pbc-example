[table]
<div class="container-fluid outer-panel-container">
    <div class="row pb-panel-heading {TABID}-filters form-inline">
        <div class="col-md-2"><h4>{DISPLAY_TABLENAME}</h4></div>

        <div id="{TABID}-filter1" data-filtername="filter1" class="col-md-3 d-flex align-items-center gap-2">
            <i class="filteronoff {TOGGLEOFF}"></i>
            <label for="{TABID}_filter1_param1" class="form-label mb-0">Suche:</label>
            <input 
                id="{TABID}_filter1_param1" 
                type="text" class="form-control form-control-sm filterparam" value="" autocomplete="off"  autocorrect="off"  autocapitalize="off" spellcheck="false">
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
                <tfoot><td colspan="8" class="text-right">{INSERT_BUTTON}</td></tfoot>
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
                #Wird per JavaScript eingefügt
                # <li class="active"><a href="#">1</a></li>
                <li class="next page-item"><a href="#" class="page-wind page-link page-next"><span class="{CHEVRONRIGHT}"></span></a></li>
            </ul>
        </div>
    </div>   

</div>
#############################################################################################################

[th]
<th{ATTRIBUTES} data-fn="{FIELDNAME}" class="pbtable-sort-container sortable"><i class="{TABLESORT}"></i>{ENTRY}</th>


[body_rows]
<tr class="row-identifier {ROW_CLASSES}">{TD_ELEMENTS}<td class="text-nowrap">{BUTTON_AREA}</td></tr>


# Standard-td
[td]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}">{ENTRY}</td>


[td_ID]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}"><input type="radio" name="image_entry_selection" value="{ENTRY}"> {ENTRY}</td>

[td_UploadFileName]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}" data-id="{ID}">
<img id="thumb-registered-{ID}" style="max-width: 250px" title="{ENTRY}" alt="" src="/modules/%%PG_MODUL%%/projectdata/uploads/files/registered/thumb_{ENTRY}"></td>



[td_ON_OFF]
<td class="switchvalue" data-fn="{FIELDNAME}" data-switchvalue="{ENTRY}">{SWITCH_LABEL}</td>

########## wird angefügt, wenn changeable true ist.
[change_button]
<button type="button" class="change-row btn btn-default" data-btntype="change" data-change-id="{PRIMARY_KEY_VAL}"><i class="bi bi-pencil"></i></button>

########## wird angefügt, wenn deletable true ist.
[delete_button]
<button type="button" class="remove-row btn btn-default" data-btntype="delete" data-id="{PRIMARY_KEY_VAL}"><i class="bi bi-trash"></i></button>

[insert_button]
<button type="button" class="insert-row btn btn-primary btn-sm" data-btntype="insert">Neuer Eintrag</button>


[header_button_area]
&nbsp;


[standard_option]
<option value="{OPTION_VALUE}">{OPTION_LABEL}</option>