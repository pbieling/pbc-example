/*
 * Bei ein- und ausglappbaren Gruppenlinks soll ein Pfeil nach recht 
 * (collapsed) oder nach untern (expanded) gezeigt werden.
 */

$(document).ready(function () {
    const subroot = $('body').data('subroot') || '';
    const ajaxUrls = {
        'languageselection': subroot + '/PbClasses/Tpl/Ajax/LanguageSetting.php'

    };


    $("a[data-bs-toggle='collapse']").click(function () {
        var el = $(this).find('.pbnavicn');
        if (el.hasClass('bi-folder-fill')) {
            el.removeClass('bi-folder-fill').addClass('bi-folder2-open');
        } else if (el.hasClass('bi-folder2-open')) {
            el.removeClass('bi-folder2-open').addClass('bi-folder-fill');
        }
    });



    /* Klassen open und withsidebar  sind standardmäßig gesetzt */



    //Einmalig prüfen:
    if ($('.sidebar').hasClass('open') && $('button.navbar2-toggler').is(':visible')) {
        // $('button.navbar2-toggler').hide(); //
        $('.sidebar').removeClass("open");
        $('.main').removeClass("withsidebar");
    }



    $(window).resize(function () {
        if ($('.sidebar').hasClass('open') && $('button.navbar2-toggler').is(':visible')) {
            // $('button.navbar2-toggler').hide();//
            $('.sidebar').removeClass("open");
            $('.main').removeClass("withsidebar");
        } else if ($('.sidebar').hasClass('open') === false && $('button.navbar2-toggler').is(':hidden')) {
            $('button.navbar2-toggler').show();
        }
    });






    $(document).on("click", "button.pbclose", function () {
        $('.sidebar').removeClass("open");
        $('.main').removeClass("withsidebar");
        $('button.navbar2-toggler').show();

    });
    $(document).on("click", "button.navbar2-toggler", function () {
        $('.sidebar').addClass("open");
        $('.main').addClass("withsidebar");
        $('button.navbar2-toggler').hide();
    });

    $(document).on("change", "#f-language-selection", function (event) {
        event.preventDefault();
        $.post(ajaxUrls.languageselection, {'languageselection': $('#languageselection').val()}, "json").done(function (d) {
            if (d.succ === 'OK') {
                window.location.assign(window.location.href);
            }
        }).fail(function () {
            alert('Problem with the language setting.');
        });
    });


});


