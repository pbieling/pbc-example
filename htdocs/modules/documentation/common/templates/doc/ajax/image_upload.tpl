[thumb_bar_item]
<div class="thumb_bar_item" data-filename="{FILENAME}"><img src="{THUMBNAIL_PATH}" class="notregistered_image"><br>
{DATE}
</div>

[image_register_form]
<div id="register_image_form">
	<p class="validateTips">Bitte ausfüllen.</p>    
	<form id="imgdata" name="imgdata">
            ##### see: blogadmin/js/imguploader.js
         <fieldset>
		<label for="imgdata_imgname">Bildname</label>
		<input type="text" name="imgdata_imgname" id="imgdata_imgname" value="{NEW_IMAGE_NAME}" class="form-control"> <br>


		<label for="imgdata_beschreibung">Beschreibung</label>
		<input type="text" name="imgdata_description" id="imgdata_description" value="" class="form-control"><br>

		<label for="author">Fotograf</label>
		<input type="text" name="imgdata_author" id="imgdata_author" value="" class="form-control"><br>

		<label for="imgdata_ort">Ort</label>
		<input type="text" name="imgdata_location" id="imgdata_location" value="" class="form-control"><br>

		<label for="imgdata_crdate">Datum der Aufnahme</label>
		<input type="date" name="imgdata_crdate" id="imgdata_crdate" value="" class="form-control"><br>

		<label for="imgdata_comment">Kommentar</label>
		<input type="text" name="imgdata_comment" id="imgdata_comment" value="" class="form-control"><br>
                <input type="hidden" name="imgdata_oldimage" id="imgdata_oldimage" value="{UPLOAD_IMAGE_NAME}">
	</fieldset>
	</form>
</div>
