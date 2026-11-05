[content]
<div id="main">
    <form method="post" action="{SELF}" target="_self" name="f-pdf" class="needs-validation" id="f-pdf">

        <div class="form-group">
            <label for="sorte">Marmeladensorte</label>
            <select class="form-control" id="sorte" name="pdf_sere[user][sorte]">
                <option value="Erdbeer-marmelade">Erdbeermarmelade</option>
                <option value="Himbeer-marmelade">Himbeermarmelade</option>
                <option value="Orangen-marmelade">Orangenmarmelade</option>
                <option value="Aprikosen-marmelade">Aprikosenmarmelade</option>
                <option value="">-Texteingabe-</option>
            </select>
            <input name="sorte_eingabe" style="display:none;" class="form-control" id="sorte_eingabe" type="text" value="" size="30" placeholder="Bitte geben Sie die Sorte ein.">
        </div>
        <div class="form-group">
            <label for="datum">Datum</label>
            <input type="date" class="form-control" name="pdf_sere[user][datum]" required="" id="datum" value="{DATE_NOW}">
        </div>
        <div class="form-group">
            <label for="datum">Anzahl</label>
            <input type="range" class="form-control" value="18" min="1" max="36" id="number_range">
            <input type="text" class="form-control" name="number_of_items" required="" value="18" id="number_of_items">

              
        </div>
        <input type="hidden" name="mod_action" value="make_preview">  
        <button  id="pdfsbm" type="submit" class="btn btn-primary">PDF generieren</button>
    </form>     
</div>    



