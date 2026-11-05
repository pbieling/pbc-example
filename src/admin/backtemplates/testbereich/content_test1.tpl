[content]
<h1>{MAINHEADER}</h1>

<h2>AJAX-Formular</h2>
<p class="text-primary">Die Daten werden im Hintergrund hochgeladen und vom Server zurückgeschickt.
Das serverseitige Script wird mit {AJAX_TESTFORM_URL} angegeben und dann automatisch auf die entsprechende Klasse im
Verzeichnis <b>classes</b> geleitet</p>.
<h3>Antwort vom Server</h3>
<pre style="min-height:50px; height:auto; border:2px solid blue; color:blue;" id="serverresponse"> 
Hier soll die Serverantwort nach Absenden des Formulars erscheinen
</pre>

<h3>Dateneingabe</h3>
<form  id="testform" data-url="{AJAX_TESTFORM_URL}">
    <div class="control-group form-group">
        <div class="controls">
            <label>Feld 1:</label>
            <input type="text" class="form-control" id="feld1" name="feld1">
        </div>
    </div>
    <div class="control-group form-group">
        <div class="controls">
            <label>Feld 2:</label>
            <input type="text" class="form-control" id="feld2" name="feld2">
        </div>
    </div>    
    
    <button type="submit" id="submbutton" class="btn btn-primary">Daten senden</button>
</form>



