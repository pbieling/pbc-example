[content]
#<div id="message-container"><h3 id="action-message" style="display:none"></h3></div>
<nav class="navbar navbar-expand-lg">
    <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item">
            <a class="nav-link active" href="#tabs-1" role="tab" data-bs-toggle="tab">Website</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tabs-2" role="tab" data-bs-toggle="tab">Templates</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#tabs-3" role="tab" data-bs-toggle="tab">Upload</a>
        </li>



    </ul> 
    <button class=" btn btn-secondary ms-5" id="generate-website">Website generieren</button>
</nav>
<!-- Tab panes -->
<div class="tab-content">
    <div role="tabpanel" class="tab-pane active container-fluid" id="tabs-1" data-conf="{DATA_CONF}">
        <div class="row">
            <div id="pg_navi" class="col-md-3">
                Bitte warten ...
            </div>
            <div id="pg_tools" class="col-md-9">
                Bitte wählen Sie (links) die gewünschte Seite.
            </div>
        </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="tabs-2">
        <div class="autoload-table" data-tabid="module_{DATA_CONF}_pg_templates">
            Die Tabelle wird geladen ...
        </div>
    </div>
    <div role="tabpanel" class="tab-pane" id="tabs-3">

        <h2>Bilder</h2>
        <div id="thumbnailbar">Hier die Bilder</div>

        <div id="dropBox" class="uploadenabled">
            <p>Bitte klicken oder tippen Sie auf dieses Feld und wählen Sie ein oder mehrere Fotos aus.</p>
        </div>
        ## multiple aktiviert den Mehrfachupload!
        <input type="file" name="fileInput" id="fileInput" multiple />


        <div class="autoload-table" data-tabid="module_{DATA_CONF}_table_images">
            Die Tabelle wird geladen ...
        </div>

    </div>
</div>


############### Modals ###########################

<div class="modal" id="template-editor-form" tabindex="-1" role="dialog">
    <div class="modal-dialog pbmodal-lg">
        <div class="modal-content">

            <!-- Modal Header -->
            #<div class="modal-header">
            #    <h4 class="modal-title">Template-Editor</h4>
            #    <button type="button" class="close" data-bs-dismiss="modal">&times;</button>
            #</div>
            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">Template-Editor</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <form action="#" method="post" id="f-template-editor-form">
                    <input type="hidden" id="template-editor-form-filetype" value=""> 

                    <div class="form-row">
                        <div class="form-group col-md-3">
                            <label for="template-editor-form-tplname">Template-Dateiname:</label>
                            <input type="text" class="form-control" name="tplname" id="template-editor-form-tplname" size="40" value="">
                        </div>
                        <div class="col-md-9">
                            <div class="form-row" id="template-editor-form-reg" style="display:none;">
                                <div class="form-group col-md-4">
                                    <label for="template-editor-form-tplkey">Template-Key:</label>
                                    <input type="text" class="form-control" id="template-editor-form-tplkey" value="">
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="template-editor-form-tpltype">Template-Typ:</label>
                                    <input type="text" class="form-control" id="template-editor-form-tpltype" value=""> 
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="template-editor-form-tpllabel">Template-Label:</label>
                                    <input type="text" class="form-control" id="template-editor-form-tpllabel" value="">
                                </div>                        
                            </div>                           
                        </div>
                    </div>
                </form>
                <div id="template-editor-form-sourcecode-container">
                    <div id="template-editor-form-sourcecode"> ----</div>
                </div>

                <p id="template-editor-form-link"> </p>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">

                <button type="button" class="btn btn-default" data-pbmodalevent="save">Speichern</button>
                <button type="button" class="btn btn-default" data-pbmodalevent="save_close">Speichern und schließen</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Abbrechen</button>
            </div>

        </div>
    </div>
</div>


####### Code Modal ##########
<div class="modal" id="codeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xlg">

        <!-- Modal content-->
        <div class="modal-content">

            <!-- Modal Header -->
           
            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">Quellcode-Editor</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="form-group form-row">   
                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input p-2" type="radio" name="pbmodal-codetype" value="code_php" checked="checked">
                        <label class="form-check-label p-1">PHP</label>
                    </div>
                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input" type="radio" name="pbmodal-codetype" value="code_javascript">
                        <label class="form-check-label">JavaScript</label>
                    </div>
                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input" type="radio" name="pbmodal-codetype" value="code_pbtpl">
                        <label class="form-check-label">PbTpl</label>
                    </div>    
                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input" type="radio" name="pbmodal-codetype" value="code_html">
                        <label class="form-check-label">HTML</label>
                    </div>  

                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input" type="radio" name="pbmodal-codetype" value="code_css">
                        <label class="form-check-label">CSS</label>
                    </div>
                    <div class="form-check form-check-inline p-2">
                        <input  class="form-check-input" type="radio" name="pbmodal-codetype" value="code_sql">
                        <label class="form-check-label">SQL</label>
                    </div>
                </div>
                #<div style="border:5px solid black;overflow:hidden;">
                    <pre id="editor"></pre>
                    #</div>
            </div>   
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
                <button type="button" class="btn btn-primary" id="pbbtn-codeentry">Einfügen</button>

            </div>
        </div>
    </div>
</div> 




