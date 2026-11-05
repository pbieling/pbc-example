
#   ID 	ParentID 	ModID 	GrID 	Label 	URL 	AltTpl 	HelpID 	Ord 	Hide 	NoPage

######################################################################################

[overview_form]
<form id="f-overview-head" data-id="{ID}">

    <h2>ID: {ID} - {LABEL}</h2>

    <div class="control-group form-group">
        <div class="btn-toolbar">
            #<label>Sichtbarkeit:</label>
            #<button class="{HIDE_CLASS} pb-switch-btn switch-hide" value="{HIDE_VALUE}" data-fname="hide"><span class="{HIDE_GLYPH}"></span></button>#
            #
            #            <label>Typ:</label>
            #            <button class="{NOPAGE_CLASS} pb-switch-btn switch-nopage" value="{NOPAGE_VALUE}" data-fname="nopage"><span class="{NOPAGE_GLYPH}"></span></button>

            <div class="btn-group m-1">
                <button  type="button" class="btn {HIDE_CLASS} pb-switch-btn switch-hide" style="{BUTTON_VISIBILITY}" title="Sichtbarkeit" value="{HIDE_VALUE}" data-fname="hide"><span class="{HIDE_GLYPH}"></span></button>
            </div>

            <div class="btn-group m-1">
                <button  type="button" class="btn {NOPAGE_CLASS} pb-switch-btn switch-nopage" style="{BUTTON_VISIBILITY}" title="Typ: Verzeichnis oder Datei" value="{NOPAGE_VALUE}" data-fname="nopage"><span class="{NOPAGE_GLYPH}"></span></button>
            </div>
        </div>
    </div>

    <div class="control-group form-group">
        <div class="controls">
            <label>Hash für Navigation:</label>
            <input type="text" class="form-control" id="url-input" data-oldval="{URL}" required value="{URL}">
        </div>
    </div>

    # Template URL-Vorschlag:
    {URL_SUGGESTION}


    <button type="submit" id="submbutton" class="btn btn-primary">Hash aktualisieren</button>





</form>

######## URL-Vorschlag wird eingeblendet, wenn noch keine URL vorhanden ist
[url_suggestion]
<div class="control-group form-group">
    <div class="controls">
        <label>Vorschlag:</label>
        <button class="btn btn-primary" id="url-suggestion">{BTN_URL_SUGGESTION}</button>
    </div>
</div>



##################################################
[maintext_form]
<form id="f-maintext" data-id="{ID}" data-modid="{MODID}">

    {INPUT_ROWS} 

    <button class="btn btn-primary" id="update-doc-formdata">Aktualisieren</button>
</form>



###################
[input_teaser]
<label>Kurztext</label>
<input type="text" class="form-control pb-content-values" data-updid="{UPDID}" data-placeholder="{PLACEHOLDER}"  data-oldval="{ENTRY}" required value="{ENTRY}"><br>

[input_maintext]
<div class="form-group pbgroup-inline-content">
    <div class="row mt-2">
        <div class="col md-8">
            <label>Langtext</label>
        </div>

        <div class="btn-group pbbtnbar-inline-content col-md-4">
            <button type="button" class="btn btn-secondary m-1 pb-btn-url">Link</button>
            <button type="button" class="btn btn-secondary m-1 pb-btn-pdf">PDF</button>
            <button type="button" class="btn btn-secondary m-1 pb-btn-code">Code</button>
            <button type="button" class="btn btn-secondary m-1 pb-btn-image">Bild</button>
        </div>
    </div> 
    <textarea class="pb-content-values pb-inline-content" id="input-maintext" data-placeholder="{PLACEHOLDER}" data-updid="{UPDID}" rows="10" cols="70">{ENTRY}</textarea><br>
</div>
<script>
    
    var mdeditor = new MarkdownEditor('#input-maintext', {
        placeholder: 'Haupttext hier eintragen..',
        toolbar: ['heading', 'bold', 'italic', 'strikethrough', 'ul', 'ol', 'checklist', 'blockquote', 'link', 'image', 'preview']
    });


</script>



[input_keywords]
<label>Keywords</label>
<input type="text" class="form-control pb-content-values" data-updid="{UPDID}" data-placeholder="{PLACEHOLDER}" data-oldval="{ENTRY}" required value="{ENTRY}">


