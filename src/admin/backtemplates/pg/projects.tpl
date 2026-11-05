[content]
<h1>{MAINHEADER}</h1>

<pre style="min-height:50px; height:auto; border:2px solid blue; color:blue;" id="serverresponse"> 
</pre>

<h3>Dateneingabe</h3>
<form  id="dataform" data-url="{AJAX_FORM_URL}">
    <div class="control-group form-group">
        <div class="controls">
            <label for="pgmodule">Modulname</label>
            <input type="text" class="form-control" placeholder="pg-example" id="pgmodule" name="pgmodule" required>
        </div>   

        <div class="controls">
            <label>Datenbankname</label>
            <input type="text" class="form-control" id="dbname" name="dbname" required>
        </div>

        <div class="controls">
            <label for="dbprefix">Tabellen-Präfix</label>
            <input type="text" class="form-control" placeholder="example__" id="dbprefix" name="dbprefix" required>
        </div>
        <div class="controls">
            <label for="frontend_root">Frontend-Wurzelverzeichnis</label>
            /Projekte/<input type="text" class="form-control" placeholder="exampledir/subdir/" id="frontend_root" name="frontend_root" required>
        </div>        
        <div class="controls">
            <label for="frontend_domain">Frontend-Domain</label>
            <input type="text" class="form-control" placeholder="http://example.loc" id="frontend_domain" name="frontend_domain" required>
        </div>     
        
        
                ####Seitenvorlage
        <div class="form-group">
            <label for="site_pattern">Website-Vorlage:</label>
            <select class="form-control" id="site_pattern" name="site_pattern"> 
                {SITE_PATTERN_OPTIONS}
            </select>
        </div>
            
            
            

        
    </div>


    <button type="submit" id="submbutton" class="btn btn-primary">Einrichten</button>
</form>
            
[pattern_options]
<option value="{VALUE}">{LABEL}</option>



