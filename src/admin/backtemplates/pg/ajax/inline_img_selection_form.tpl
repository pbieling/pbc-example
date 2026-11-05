[main]
<form id="f-inline-structure" name="f-inline-structure" method="post" action="#">
    <div class="d-flex flex-row" style="overflow:auto;">
        {TPL__IMG_SELECTION_BLOCK} 
    </div>

    <div class="row">
        <div class="col-md-6">
            <select class="form-control" id="pbpg-inline-image-tpl-selection" name="pbpg-inline-image-tpl-selection">
             <option value=""><i>bitte wählen</i></option>
                {TPL__TPL_OPTION}
            </select>
            
            
         #Zugehörige Formularfelder werden per Ajax geladen:
        <div id="pbpg-inline-input-fields">
            
        </div>             
            
            
            
        </div>
        
      
    </div>
</form> 

[img_selection_block]

<div class="p-2">
    <input type="radio" name="inline-image-sel" id="rd-image-sel-{ID}" value="{ID}"><img src="{THUMBNAIL}" alt="{IMGDESCR}"><br>
    {IMGDESCR}<br>
    Cr: <i>{CRDATE}</i><br>
    Updated: {UPDATED}
</div>
    
    
[tpl_option]
<option value="{ID}">{OPTION_LABEL}</option>




