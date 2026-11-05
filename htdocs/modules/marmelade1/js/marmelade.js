$(document).ready(function () {
    var popupw;
    $('#f-pdf').submit(function () {
        popupw = window.open('', 'formpopup', 'width=1400,height=700,resizeable,scrollbars');
        popupw.focus();
        this.target = 'formpopup';
        return true;
    });

    $('#sorte').change(function () {
        if ($(this).val() === '') {
            $(this).hide();
            $('#sorte_eingabe')
                    .attr('required', '')
                    .show().focus();
            
            
        }
    });
    
    $('#sorte_eingabe').keyup(function () {
        if ($(this).val() === '') {
            $(this).removeAttr('required')
                    .hide();
             $('#sorte').val('Erdbeer-marmelade');
            $('#sorte').show().focus;
        }
    });
    

    $('#number_range').on('input', function () {
        $('#number_of_items').val($(this).val());
    });
});


