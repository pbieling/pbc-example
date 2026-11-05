$(document).ready(function () {
    const default_modalreplacement_class = 'PbClasses/Table/Ajax/ModalReplacement.php';
    var option_cache = {};

    
    //Wenn die Sortierung in einer Definitionstabelle gelöscht wurde, wird ein Event ausgelöst.
    //Als Parameter wird der Sortkey zurückgegeben
    $(document).on("pbtable_modaltable_sorted", function(e, prm) {
       if (option_cache[prm.conf_sortkey]) {
            delete option_cache[prm.conf_sortkey];
       }
    });
    
    
    //Beim Öffnen des Modals zum Update eines Werts oder einer Zeile oder beim Insert
    //wird zunächst geprüft, ob bereits gecachete Menüs (oder sonstiges HTML)  vorhanden sind.
    //Wenn ja, werden diese verweendet. Ansonsten werden die Menüs per Ajax geladen und eingefügt.
    
    $(document).on("bsmodal-shown", function (e, params) {
        params.element.find('[data-pbmodalreplace]').each(function () {
            var el = $(this);
            var key = $(this).data('pbmodalreplace');
            var params = {'key': key};

            add_conf_params(params);
            
            //Falls das Menü schon abgefragt wurde
            if (option_cache[key]) {
                var old_value = el.data('oldvalue');
                el.html(option_cache[key]);
                el.find('option[value="' + old_value + '"]').prop('selected', true);
                return true; //Nächster Loop
            }


            // load data from defined url or default url
            //Eine eigene Ajax-URL kann im body data-pbcondata hinterlegt werden.
            //Wird dies nicht getan, wird die Sta
            
            
            var ajax_url = params.pbconfdata[key] || default_modalreplacement_class;

            $.post(ajax_url, params, "json").done(function (d) {
                if (d.succ !== 'OK') {
                    pbtoast('error', d.errortext || 'Technischer Fehler beim Einbinden der Daten.');
                } else {
                    el.html(d.html);
                    //select current value    
                    var old_value = el.data('oldvalue');
                    el.find('option[value="' + old_value + '"]').prop('selected', true);
                    option_cache[key] = d.html;
               }
            }).fail(function () {
                pbtoast('error', 'Technisches Problem beim Einbinden der Daten.');
            });

        });

        params.element.find('[data-pbmodalmarkoption]').each(function () {
            var old_value = $(this).data('oldvalue');
            $(this).find('option[value="' + old_value + '"]').prop('selected', true);

        });

    });

    function add_conf_params(params) {
        if ($('body').data('pbconfdata')) {
            params.pbconfdata = $('body').data('pbconfdata');
        }
    }

});


