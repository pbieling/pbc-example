[content]
<!-- Modal -->
<div class="modal fade" id="codeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xlg">
        <!-- Modal content-->
        <div class="modal-content" draggable="true">
            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">Code für Dokumentation</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="form-group form-row">   
                    <div class="form-check form-check-inline">
                        <input  class="form-check-input " type="radio" name="pbmodal-codetype" value="code_php" checked="checked">
                        <label class="form-check-label">PHP</label>
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
                <pre id="editor"></pre>
            </div>  
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="pbbtn-codeentry">Einfügen</button>
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
            </div>
        </div>
    </div>
</div>



<div id="pb-message-container"><h3 id="pb-action-message" style="display:none"></h3></div>
<h3>{MAINHEADER}</h3>
<div class="container-fluid">

    <div class="row">
        <div class="col-md-3">

            {DOC_TREE}

        </div>
        <div class="col-md-9" id="doc_content">

            <div id="doc_content_meta">
                <p>Noch kein Dokument ausgewählt</p>
            </div>

            <div id="doc_maintext_form">

                Module
            </div>
        </div>
    </div>
</div>