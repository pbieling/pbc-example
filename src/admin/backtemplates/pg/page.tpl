[main]
<div id="overview">
    <div id="overview-header">{OV_HEADER}</div>
    <div id="overview-container" class="container-fluid">
        <div class="row">
            <div id="overview-left" class="col-md-6"></div>
            <div id="overview-right" class="col-md-6"></div>
        </div>
    </div>
</div>



[ov_header]
<form id="f-overview-head" data-id="{ID}" method="post" action="#">
    <p>ID: <b>{ID} - {LABEL} - </b> (ParentId: {PARENTID}) <small>
            Zuletzt aktualisiert: {LASTUPDATE}</small></p> 


    <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group m-1">
            <button  type="button" class="btn {HIDE_CLASS} pb-switch-btn switch-hide" style="{BUTTON_VISIBILITY}" title="Sichtbarkeit" value="{HIDE_VALUE}" data-fname="hide"><span class="{HIDE_GLYPH}"></span></button>
        </div>

        <div class="btn-group m-1">
            <button  type="button" class="btn {NOPAGE_CLASS} pb-switch-btn switch-nopage" style="{BUTTON_VISIBILITY}" title="Typ: Verzeichnis oder Datei" value="{NOPAGE_VALUE}" data-fname="nopage"><span class="{NOPAGE_GLYPH}"></span></button>
        </div>

        <div class="input-group m-1">
            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text" id="btnGroupAddon">URL: /</div>
                </div>
                <input class="form-control" type="text" value="{URL}" data-old="{URL}" data-fieldname="URL" id="f-overview-inp-url" size="50">
            </div>
        </div>

        <div class="btn-group m-1">
            <button  type="button" class="btn {PROTECTED_CLASS} pb-switch-btn switch-protected" style="{BUTTON_VISIBILITY}" title="Setzt den Schutz vor Generierung oder hebt ihn auf" value="{PROTECTED_VALUE}" data-fname="protected"><span class="{PROTECTED_GLYPH}"></span></button>
        </div>            

    </div>


    <div class="form-row">
        <div class="form-group col-md-1">
            <label for="f-overview-inp-modid">ModID</label>
            <input type="text" class="form-control" data-old="{MODID}" data-fieldname="ModID" value="{MODID}" id="f-overview-inp-modid">
        </div>
        <div class="form-group col-md-1">
            <label for="f-overview-inp-grid">GrID</label>
            <input type="text" class="form-control" value="{GRID}" id="f-overview-inp-grid" data-fieldname="GrID">
        </div>
        <div class="form-group col-md-3">
            <label for="f-overview-inp-naviname">NaviName</label>
            <input type="text" class="form-control" value="{NAVINAME}" id="f-overview-inp-naviname" data-fieldname="NaviName">
             <button type="submit" class="btn btn-primary mt-4">Formular aktualisieren</button>
        </div>        
        <div class="form-group col-md-7">
            <label for="f-overview-inp-css">CSS-Dateien</label>
            <input type="text" class="form-control" value="{CSS}" id="f-overview-inp-css" data-fieldname="CSS">
            <label for="f-overview-inp-js">JS-Dateien</label>
            <input type="text" class="form-control" value="{JS}" id="f-overview-inp-js" data-fieldname="JS">
        </div>         
    </div>
</form>
