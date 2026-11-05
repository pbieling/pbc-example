[main]
<form id="f-edit-structure" name="f-edit-structure" method="post" action="#">
    <fieldset>


        {INPUT_FIELDS}

    </fieldset>
    <fieldset>
        <div><label for="f-edit-structure_range">Zuordnung</label><br>
            <input id="f-edit-structure_range_all" type="radio"  value="all" name="f-edit-structure_range" checked> alle Seiten<br>
            <input id="f-edit-structure_range_group" type="radio"  value="g{GRID}" name="f-edit-structure_range"> nur diese Gruppe<br>
            <input id="f-edit-structure_range_page" type="radio"  value="p{PAGEID}" name="f-edit-structure_range"> nur diese Seite</div>
    </fieldset>




    <input type="hidden" id="f-edit-structure_type" name="f-edit-structure_type" value="{TYPE}">
    <input type="hidden" id="f-edit-structure_id" name="f-edit-structure_id" value="{ID}">
</form> 

[input_fields_entries]
<label for="f-edit-structure_fields">Feld / Felder</label>
<input id="f-edit-structure_fields" type="text" class="db-firstfield" value="" name="f-edit-structure_fields" size="120">

[input_fields_project_class]
<label for="f-edit-structure_fields">Feld / Felder</label>
<input id="f-edit-structure_fields" type="text" class="db-firstfield" value="" name="f-edit-structure_fields" size="120">
#SourceName 	Param
<label for="f-edit-structure_sourcename">Klasse</label>
<input id="f-edit-structure_sourcename" type="text" value="" name="f-edit-structure_sourcename" size="120">
<label for="f-edit-structure_param">Parameter</label>
<input id="f-edit-structure_param" type="text" value="" name="f-edit-structure_param" size="120">

[input_fields_mod]
<label for="f-edit-structure_fields">Feld / Felder</label>
<input id="f-edit-structure_fields" type="text" class="db-firstfield" value="" name="f-edit-structure_fields" size="120">
<label for="f-edit-structure_module">Modul</label>
<select id="f-edit-structure_module" name="f-edit-structure_module">
    <option value="">-- bitte auswählen --</option>
    {MODULE_OPTIONS}
</select>

[input_fields_include]
<label for="f-edit-structure_fields">Feld / Felder</label>
<input id="f-edit-structure_fields" type="text" class="db-firstfield" value="" name="f-edit-structure_fields" size="120">
<label for="f-edit-structure_include">Include</label>
<select id="f-edit-structure_include" name="f-edit-structure_include">
    <option value="">-- bitte auswählen --</option>
    {MODULE_OPTIONS}
</select>



[input_fields_navi]
<label for="f-edit-structure_navi">Navigation</label>
<select id="f-edit-structure_navi" name="f-edit-structure_navi">
    <option value="">-- bitte auswählen --</option>
    {MODULE_OPTIONS}
</select>


[module_options]
<option value="{VALUE}">{LABEL}</option>




