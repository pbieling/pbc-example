
/* Peter Bieling - 2026-04-21
 * Umgesetzt wird diese Form der Validierung:
 * https://getbootstrap.com/docs/4.0/components/forms/#custom-styles
 * 
 * Die erforderlichen Divs mit der Klasse "invalid-feedback\" werden bei Bedarf
 * automatisch eingefügt. Sollte es Problem  mit der Darstellung geben, können Sie im 
 * entsprechenden Formular aber auch  vorab manuell gesetzt werden.* 
 * 
 * Elemente mit Attribut data-ownval werden in eigener Datei gesondert behandelt:
 * if (!$(this).is('[data-ownval]')) {

 * 
 */

$(document).ready(function () {
    const errMsg = {
        valueMissing: 'Fehlender Wert.',
        typeMismatch: 'Falscher Datentyp.',
        patternMismatch: 'Falsches Eingabemuster.',
        tooLong: 'Eingabe zu lang.',
        tooShort: 'Eingabe zu kurz',
        rangeUnderflow: 'Wert unterhalb des erlaubten Bereichs.',
        rangeOverflow: 'Wert oberhalb des erlaubten Bereichs.',
        stepMismatch: 'Stufe nicht passend',
        badInput: 'Falsche Zeichen in der Eingabe',
        customError: 'Falsche Eingabe (CustomError)'

    };
    const validationObj = {

        standard: function (el) {
            const validityState = el.get(0).validity;
            if (validityState.valid) {
                el.get(0).setCustomValidity("");
                return true;
            }

            let errBuffer = '';
            for (var key in validityState) {
                if (validityState[key] === true) {
                    //add_error_message(el, 'Fehler: ' . key);
                    //return false;    
                    errBuffer += ' ' + errMsg[key];
                }
            }
            if (errBuffer !== '') {
                add_error_message(el, errBuffer);
                return false;
            }

            el.get(0).setCustomValidity("");
        }



        //Hier können weitere Validierungsblöcke gesetzt werden

    };
    function add_error_message(el, err) {
        //Die Meldung selbst spielt für die setCustomValidity keine Rolle,
        //weil die Standardbrowsermeldungen nicht greifen
        //es darf nur kein Leersring sein. 
        el.get(0).setCustomValidity(err);
        //Hier kommt die eigentlich Ausgabe:
        //Fehlerausgabe "invalid-feedback" bereits gesetzt?
        var message_div = el.closest('div').find('.invalid-feedback');
        if (message_div.length) { //Schon vorhanden:
            // Fehlerausgabe "invalid-feedback" bereits gesetzt. Nur Text aktualisieren
            //für den Fall, dass neue Meldungen kommen.
            message_div.html(err);
        } else {
            //Element noch nicht vorhanden: anlegen
            el.closest('div').append("<div class=\"invalid-feedback\">" + err + "</div>");
        }
        //Klasse im Formular setzen, die die Fehler sichtbar macht:
        el.closest('form').addClass('was-validated');
    }

    $(document).on("change", 'form input, form select, form textarea', function () {
        if (!$(this).is('[data-ownval]')) {
            $(this).get(0).setCustomValidity("");
            validationObj.standard($(this));
        }
    });
});







