[table]
<div class="container-fluid outer-panel-container ">
    <div class="row pb-panel-heading {TABID}-filters form-inline">
        <div class="col-md-2"><h4>{DISPLAY_TABLENAME}</h4></div>
        <div id="{TABID}-filter1" data-filtername="filter1" class="col-md-3 d-flex align-items-center gap-2">
            <i class="filteronoff {TOGGLEOFF}"></i>
            <label for="{TABID}_filter1_param1" class="form-label mb-0">{LABEL_FIND}:</label>
            <input 
                id="{TABID}_filter1_param1" 
                type="text" class="form-control form-control-sm filterparam" value="" autocomplete="off"  autocorrect="off"  autocapitalize="off" spellcheck="false">
        </div>


        <div id="{TABID}-filter2" data-filtername="filter2" class="col-md-2 d-flex align-items-center justify-content-center">
            <input id="{TABID}_filter2_param1" class="catchbuttonselection"  type="hidden" value="">
            <div class="btn-group btn-group-sm"  role="group" aria-label="{ARIA_FILTERSELECTION}">
                <button class="btn btn-primary sendbuttonselection switchfilteroffselection" value="">{BTN_ALL}</button>
                <button class="btn btn-default sendbuttonselection" value="0">{BTN_ACTIVE}</button>
                <button class="btn btn-default sendbuttonselection" value="1">{BTN_PASSIVE}</button>
            </div>
        </div>  

        #<div class="col-md-2">{INSERT_BUTTON}</div>
    </div>    
    <div class="row">
        <div class="col-md-12 pb-table-container">
            <table class="table">
                <thead>
                    <tr>{TH_ELEMENTS}<td>{HEADER_BUTTON_AREA}</td></tr>
                </thead>    
                <tbody class="pbstandard_tbody">
                    ### Template see below
                    {BODY_ROWS}
                </tbody>
                <tfoot><td colspan="8" class="text-right">{INSERT_BUTTON}</td></tfoot>
            </table>
        </div>
    </div>
    <div class="row pbtable-edit-tools pb-panel-footer">
        <div class="col-3 total-found-info">
            <b class="tablebody-start-nr"></b> - <b class="tablebody-end-nr"></b> {TEXT_OF} <b class="filtered-totalnumber"></b> &nbsp; ({TEXT_INTOTAL} <b class="totalnumber">{TOTALNUMBER}</b>)
        </div>
        <div class="col-4 amount-selection">
            <div class="form-group row">
                <label class="col-auto">{LABEL_SHOW}: </label>
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
#[td_GID]
[td_GroupMembers]
<td class="{CLASSES}"{ATTRIBUTES} data-fn="{FIELDNAME}" data-gid="{PRIMARY_KEY_VAL}">{ENTRY} - <button type="button" value="{PRIMARY_KEY_VAL}" class="btn btn-small btn-primary user-in-group">User +/-</button></td>






[td_Hide]
<td class="switchvalue" data-fn="{FIELDNAME}" data-switchvalue="{ENTRY}"><button class="btn btn-sm pbtbl-upd-target">{SWITCH_LABEL}</button></td>


########## wird angefügt, wenn changeable true ist.
[change_button]
<button type="button" class="change-row btn btn-default" data-btntype="change" data-change-id="{PRIMARY_KEY_VAL}"><i class="{PENCIL}"></i></button>

########## wird angefügt, wenn deletable true ist.
[delete_button]
<button type="button" class="remove-row btn btn-default" data-btntype="delete" data-id="{PRIMARY_KEY_VAL}"><i class="{TRASH}"></i></button>

[insert_button]
<button type="button" class="insert-row btn btn-primary btn-sm" data-btntype="insert">{BTN_NEW_ENTRY}</button>

[header_button_area]
&nbsp;

[standard_option]
<option value="{OPTION_VALUE}">{OPTION_LABEL}</option>