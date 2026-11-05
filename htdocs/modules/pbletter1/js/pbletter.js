
$(document).ready(function() {
    var popupw;
    $('#f-pdf').submit(function() {
        popupw = window.open('', 'formpopup', 'width=1400,height=700,resizeable,scrollbars');
        popupw.focus();
        this.target = 'formpopup';
        return true;
    });
    
    

    $('#save_checkbox').change(function() {
        if ($('#save_checkbox').prop('checked')) {
            $('#pdfsbm').val('PDF erzeugen und speichern');
        } else {
            $('#pdfsbm').val('Vorschau anzeigen');
        }
    });
});


