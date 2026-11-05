[content]
<!-- Modal -->
<div class="modal fade" id="codeModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xlg">
        <!-- Modal content-->
        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Code-Element</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
               # <pre id="editor"></pre>
               <div class="editor" data-manual data-gramm="false"></div>
            </div>  
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="pbbtn-codeentry">Einfügen</button>
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
            </div>
        </div>
    </div>
</div>


<!-- Modal -->
<div class="modal fade" id="imageEntryModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-xlg">

        <!-- Modal content-->
        <div class="modal-content" draggable="true">

            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">Bildauswahl</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>


            <div class="modal-body">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_standard"> Bild - standard</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_author_floatleft"> Bild (links) - mit Autor</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_author_description_floatleft"> Bild (links) - mit Autor und Beschr.</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_description_floatleft"> Bild (links) - mit Beschr.</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_author_floatright"> Bild (rechts) - mit Autor</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_author_description_floatright"> Bild (rechts) - mit Autor und Beschr.</label><br>
                            <label class="radio-inline"><input type="radio" name="pbmodal-imagetype" value="image_description_floatright"> Bild (rechts) - mit Beschr.</label>
                        </div>
                    </div>
                    <div class="col">
                        <div id="selected-image-thumbview">Bitte wählen Sie zunächst ein Bild aus der Bildtabelle aus.</div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="pbbtn-imgcodeentry">Einfügen</button>
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
            </div>
        </div>

    </div>
</div> 

########################## Modal Links ################

<div class="modal fade" id="urlEntryModal" tabindex="-2" role="dialog">
    <div class="modal-dialog modal-md">

        <!-- Modal content-->
        <div class="modal-content" draggable="true">
            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">URL einfügen</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="form-group"> 
                    <input type="text" class="form-control" id="url-entry-modal-url" value="" maxlength="255">
                    <input type="checkbox" value="" id="url-entry-modal-chck-external"> externer Link in neuem Tab
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="pbbtn-urlentry">Einfügen</button>
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
            </div>
        </div>

    </div>
</div> 


########################## Modal PDF ################
<div class="modal fade" id="pdfEntryModal" tabindex="-2" role="dialog">
    <div class="modal-dialog modal-md">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header" style="cursor: move;">
                <h5 class="modal-title">PDF-Link einfügen</h5>
                <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <div class="form-group">
                    <label for="pdf-link-selection">Vorhandenes PDF auswählen</label>
                    <select class="form-control" id="pdf-link-selection">

                        #Beim Öffnen aktuelle Liste per Ajax holen und hier einfügen
                    </select>
                </div>   
                <div class="form-group"> 
                    <input type="text" class="form-control" id="pdf-entry-modal-url" value="" maxlength="255">
                    <input type="checkbox" value="" id="pdf-entry-modal-chck-external"> PDF als externes Dokument markieren
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="pbbtn-pdfentry">Einfügen</button>
                <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
            </div>
        </div>

    </div>
</div> 


########### Bild-Modal ####################

<div class="modal fade" id="imageModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-lg">

        <!-- Modal content-->
        <div class="modal-content" draggable="true">
                <div class="modal-header" style="cursor: move;">
                    <h5 class="modal-title">Bild registrieren</h5>
                    <button type="button" class="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>


                    <div id="movethumb">Bild wird geladen ...</div>
                </div>
                <div class="modal-body">
                    <div class="form-group">

                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="pbbtn-codeentry">Einfügen</button>
                    <button type="button" class="btn btn-default" data-bs-dismiss="modal">Schließen</button>
                </div>
            </div>

        </div>
    </div> 


    #### Sichtbarer Teil mit Tab-Steuerung für Eingabe von Texten und Upload
    <nav class="navbar navbar-expand-lg">
        <ul class="nav nav-tabs" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" href="#tabs-1" role="tab" data-bs-toggle="tab">Texte</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#bildupload" role="tab" data-bs-toggle="tab">Bild-Upload</a>
            </li>
        </ul> 
    </nav>
    <!-- Tab panes -->

    <div class="tab-content"  id="modulcontainer-commondoc" data-commondocmodule='{MODULE_DATA}'>
        <div role="tabpanel" class="tab-pane active container-fluid" id="tabs-1">

            <h4 class="mt-1">{MAINHEADER}</h4>
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
        </div>
        <div role="tabpanel" class="tab-pane" id="bildupload">
            <h2>Bilder hochladen</h2>
            <div id="thumbnailbar">Hier die Bilder</div>

            <div id="dropBox" class="uploadenabled">
                <p>Bitte klicken oder tippen Sie auf dieses Feld und wählen Sie ein oder mehrere Foto aus.</p>
            </div>
            ## multiple aktiviert den Mehrfachupload!
            <input type="file" name="fileInput" id="fileInput" multiple />


            <div class="autoload-table" data-tabid="{TABLE_KEYNAME}">
                Die Tabelle wird geladen ...
            </div>
        </div>

    </div>





