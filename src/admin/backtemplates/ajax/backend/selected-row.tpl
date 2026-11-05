[content]

<div class="container-fluid">

   

        <h2>ID: {ID} - {LABEL}</h2>




        #   Hide 	NoPage
        <div class="control-group form-group mb-3">
            <div class="controls">
                <label>Sichtbarkeit:</label>
                <button type="button" class="btn {HIDE_CLASS} pb-switch-btn switch-hide" value="{HIDE_VALUE}" data-fname="hide"><span class="{HIDE_GLYPH}"></span></button>

                <label>Typ:</label>
                <button type="button" class="btn {NOPAGE_CLASS} pb-switch-btn switch-nopage" value="{NOPAGE_VALUE}" data-fname="nopage"><span class="{NOPAGE_GLYPH}"></span></button>


                <label>Zugriffsstufe</label>
                <select class="pb-select-menu" data-type="accesslevel">
                    <option value="0"{SELECTED_0}>0 - Seite nicht gesperrt</option>
                    <option value="1"{SELECTED_1}>1 - Sperrung - Level 1</option>
                    <option value="2"{SELECTED_2}>2 - Sperrung - Level 2</option>
                    <option value="3"{SELECTED_3}>3 - Sperrung - Level 3 (Admin)</option>

                </select>



            </div>
        </div>
                    
                    
                    
         <form id="backend-tree-form" data-id="{ID}" style="margin:20px 0 50px 0;padding:30px;border:1px solid silver;">            

        <div class="d-flex align-items-center gap-3 mb-3">
            <label for="url-input" class="form-label mb-0">URL:</label>
            <input type="text"
                   class="form-control"
                   id="url-input"
                   data-oldval="{URL}"
                   required
                   value="{URL}"
                   style="max-width: 300px;">
            {SUBMIT_BUTTON}
        </div>

        # Template URL-Vorschlag:
        {URL_SUGGESTION}

        # Template für Konfigurationsdatei (anlegen oder anzeigen)

        {PAGE_CONFIG}
        ########
    </form>
    <div class="pageconfig-accessblock">    
        {ACCESS_BLOCK}    
    </div>

</div>

    
########
[submit_button_entry]
<button type="submit" id="submbutton" class="btn btn-primary">URL eintragen</button>
[submit_button_update]
<button type="submit" id="submbutton" class="btn btn-primary">Aktualisieren</button>

[access_block]
<h5 class="mt-5">Gruppen mit Zugriffsberechtigung:</h5>
<div>{ACC_GROUPS}</div>
<div><button type="button" class="btn btn-secondary btn-small" id="add-remove-page2groups">Gruppe +/-</button></div>




[access_group_items]

<strong class="accessgroup-item" title="{GLABEL}">{GID} - {GKEY}</strong>



######## URL-Vorschlag wird eingeblendet, wenn noch keine URL vorhanden ist
[url_suggestion]
<div class="control-group form-group">
    <div class="controls">
        <label>Vorschlag:</label>
        <button type="button" class="btn btn-primary" id="url-suggestion">{BTN_URL_SUGGESTION}</button>
    </div>
</div>


[page_config_found]
<div>Konfiguration gefunden: {CONFIG_PATH}<br>
    <button type="button" class="btn btn-secondary pb-btn-showcode  mt-2" data-codetype="config" data-path="{CONFIG_PATH}">Quellcode anzeigen</button></div>

###############
[page_config_selection]
<div style="margin-top:20px;margin-bottom:20px;">
    <p>Konfiguration generieren:</p>
    <select id="generate-conf-selection">
        <option value="standard">Standard-Konfiguration</option>
        <option value="table-editor">Tabellen-Editor</option>
        <option value="docu-view">Dokumentation</option>
        <option value="docu-admin">Doku-Admin</option>
        <option value="">Keine Konfiguration erstellen</option>
    </select>
    <div id="additional-selections">
        ### Einblenden weiterer Auswahlmenüs, z.B. verfügbare Tabelleneditoren oder Module
    </div>
    
     <button type="submit" id="submbutton" class="btn btn-primary">Generieren</button>

</div>


