[content]
#PBLETTER_subject 	PBLETTER_lastName 	PBLETTER_firstName 	PBLETTER_salutation 	PBLETTER_zipCode 	PBLETTER_city 	PBLETTER_streetName
#PBLETTER_houseNumber 	PBLETTER_company 	PBLETTER_addressAddOn 	PBLETTER_title 	
<form method="post" action="{SELF}" target="_self" name="f-pdf" id="f-pdf">

<div id="main">
    <div id="leftcolumn">
	
    <table>
        <tr><td colspan="2"><h4>Absenderdaten</h4></td></th>
		
        <tr><td>Mitarbeiter:</td><td><input name="pdf_sere[header][mitarbeiter_name]" value="Harry Webmaster" size="40"></td></tr>
        <tr><td>Telefon:</td><td><input name="pdf_sere[header][mitarbeiter_telefon]" value="+49 12345678-01" size="40"></td></tr>
        <tr><td>E-Mail:</td><td><input name="pdf_sere[header][mitarbeiter_email]" value="harry@webmaster.it" size="40"></td></tr>
        <tr><td>Vorgangsnummer:</td><td><input name="pdf_sere[header][vorgangsnummer]" value="0001" size="40"></td></tr>
        <tr><td>Abteilung:</td><td><input name="pdf_sere[header][abteilung]" value="001" size="40"></td></tr>
 
    
    
        <tr><td colspan="2"><h4>Empfängerdaten</h4></td></th>
        <tr><td>Nachname:</td><td><input name="pbletter_entry[PBLETTER_lastName]" value="Testmann" size="40"></td></tr>
        <tr><td>Vorname:</td><td><input name="pbletter_entry[PBLETTER_firstName]" value="Horst" size="40"></td></tr>
        <tr><td>Anrede:</td><td><input name="pbletter_entry[PBLETTER_salutation]" value="Herrn" size="40"></td></tr>
        <tr><td>Titel:</td><td><input name="pbletter_entry[PBLETTER_title]" value="Dr." size="40"></td></tr>
        <tr><td>Firma:</td><td><input name="pbletter_entry[PBLETTER_company]" value="Holz und mehr GmbH" size="40"></td></tr>
        <tr><td>PLZ:</td><td><input name="pbletter_entry[PBLETTER_zipCode]" value="12345" size="12"></td></tr>
        <tr><td>Ort:</td><td><input name="pbletter_entry[PBLETTER_city]" value="Teststadt" size="40"></td></tr>
		
        <tr><td>Straße:</td><td><input name="pbletter_entry[PBLETTER_streetName]" value="Teststraße" size="40"></td></tr>
		<tr><td>Hausnummer:</td><td><input name="pbletter_entry[PBLETTER_houseNumber]" value="12" size="9"></td></tr>
		
		<tr><td>Adresszusatz:</td><td><input name="pbletter_entry[PBLETTER_addressAddOn]" value="Seiteneingang rechts" size="40"></td></tr>
		
        

    
    </table>
    </div>
	
	<div id="rightcolumn">
	
    <h4>BRIEF-ERSTELLUNG</h4>
<table>
     <tr><td>Briefdatum:</td><td><input name="pdf_sere[header][briefdatum]" value="{BRIEFDATUM}" size="20"></td></tr>
       
    <tr><td>Betreff:</td><td><input name="pdf_sere[user][betreff]" value="Webbasierte Programmierung für Internet, Intranet und Office" size="40"></td></tr>
        <tr><td>Anrede:</td><td><input name="pdf_sere[user][anrede]" value="Sehr geehrte Damen und Herren," size="40"></td></tr>
        <tr><td></td><td>Sie können für das folgende Feld <b>Markdown</b> verwenden, um eine formatierte Ausgabe zu erhalten:</td></tr>
        <tr><td>Brieftext:</td><td><textarea name="pdf_sere[user][brieftext]" cols="80" rows="10">Ihre Anfrage ist bei uns eingegangen.
!
__Herzlichen Dank!__  
!
Wir werden uns in Kürze telefonisch bei Ihnen melden.
!
Bitte beachten Sie auch unser Angebot des Monats:
\###Rundum-Sorglos-Paket für nur 33,- € pro Monat!
</textarea></td></tr>
<tr><td>Unterschrift:</td><td><input name="pdf_sere[user][unterschrift]" value="Harry Webmaster" size="40"></td></tr>    
    </table>        
    <input type="hidden" name="mod_action" value="make_preview">
    #<br><input type="checkbox" name="save_checkbox" id="save_checkbox" value="save"> Jetzt speichern</b>
    <button type="submit" id="pdfsbm" class="btn btn-primary">Vorschau anzeigen</button>
  #  <input type="submit" value="Vorschau anzeigen" id="pdfsbm">
  </div>
</div>

</form>


