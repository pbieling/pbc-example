# Version 2020-11-10

[upd_input_standard]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <input type="{TYPE}" class="form-control inp-standard{CLASSES}" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" {ATTRIBUTES} maxlength="{FIELD_MAXLENGTH}">
</div>

[upd_input_int]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <input type="{TYPE}" class="form-control{CLASSES}" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}"{ATTRIBUTES} maxlength="{FIELD_MAXLENGTH}">
</div>

[upd_input_date]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <input type="date" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" maxlength="{FIELD_MAXLENGTH}">
</div>

[upd_input_time]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <input type="time" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" maxlength="{FIELD_MAXLENGTH}">
</div>


[upd_input_tinytext]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <textarea type="text" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" cols="50" rows="2" name="{FIELD_NAME}" maxlength="{FIELD_MAXLENGTH}">{FIELD_VALUE}</textarea>
</div>

[upd_input_text]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <textarea type="text" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" cols="100" rows="5" maxlength="{FIELD_MAXLENGTH}">{FIELD_VALUE}</textarea></p>
</div>

[upd_input_enum]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <p><select class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}">{OPTIONS}</select></p>
</div>

[upd_input_datetime]
<div class="form-group"><label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <input type="hidden" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}"><br>
    <input type="date" class="pbtable-datetime" id="{FIELD_NAME}_PARTDATE" value="{FIELD_VALUE_PARTDATE}" data-inpid="{FIELD_NAME}" required>
    <input type="time" class="pbtable-datetime" id="{FIELD_NAME}_PARTTIME" value="{FIELD_VALUE_PARTTIME}" data-inpid="{FIELD_NAME}" required></div>


############ Einfügen ##########
[ins_input_standard]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <p id="{FIELD_NAME}-oldvalue" class="oldvalue">{FIELD_VALUE}</p>
    <input type="{TYPE}" class="form-control inp-standard {CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" {ATTRIBUTES} maxlength="{FIELD_MAXLENGTH}">
</div>


[ins_input_int]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <input type="{TYPE}" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" maxlength="{FIELD_MAXLENGTH}">
</div>

[ins_input_tinytext]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <textarea type="text" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" cols="50" rows="2" name="{FIELD_NAME}" maxlength="{FIELD_MAXLENGTH}">{FIELD_VALUE}</textarea>
</div>

[ins_input_text]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <textarea type="text" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" cols="100" rows="5" maxlength="{FIELD_MAXLENGTH}">{FIELD_VALUE}</textarea></p>
</div>

[ins_input_enum]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <select class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}">{OPTIONS}</select>
</div>

[ins_input_date]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <input type="date" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" maxlength="{FIELD_MAXLENGTH}">
</div>

[ins_input_time]
<div class="form-group">
    <label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <input type="time" class="form-control{CLASSES}"{ATTRIBUTES} id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}" maxlength="{FIELD_MAXLENGTH}">
</div>

[ins_input_datetime]
<div class="form-group"><label for="{FIELD_NAME}">{FIELD_LABEL}</label>
    <input type="hidden" id="{FIELD_NAME}" name="{FIELD_NAME}" value="{FIELD_VALUE}"><br>
    <input type="date" class="pbtable-datetime" id="{FIELD_NAME}_PARTDATE" value="{FIELD_VALUE_PARTDATE}" data-inpid="{FIELD_NAME}" required>
    <input type="time" class="pbtable-datetime" id="{FIELD_NAME}_PARTTIME" value="{FIELD_VALUE_PARTTIME}" data-inpid="{FIELD_NAME}" required>
</div>




########## Für alle Selects
[option]
<option value="{FIELD_OPTION}"{SELECTED}>{FIELD_OPTION}</option>


[tpl_null]
<span class="ml-3"><input type="checkbox" value="1" class="pbchk-nullable" data-id="" /> Nicht verwenden (NULL)</span>

########## Für später eingebaute Selects, z.B. als Ersatz für id
[option_with_label]
<option value="{OPTION_VALUE}"{SELECTED}>{OPTION_LABEL}</option>


