$(document).ready(function () {


    //Setzt den Event-Handler für das th-Tabllenelement, erzeugt
    var ajaxUrls = {
        'weekly_dates': 'Ajax/WeeklyDates.php',
        'update_weekly_table' : 'Ajax/WeeklyTableUpdate.php'
    };

    $(document).on("click", '[data-tabid="demos-7-demo-wochenplan"] th[data-fn="OrgIndex"]', function () {
        var autolad_element = '<div class="autoload-table"  data-tabid="demos-7-editorganisation"></div>';
        pb_show_modal('Organisationen bearbeiten', autolad_element, 1200, null, '');
    });

    $(document).on("click", '[data-tabid="demos-7-demo-wochenplan"] th[data-fn="EventIndex"]', function () {
        var autolad_element = '<div class="autoload-table"  data-tabid="demos-7-editevents"></div>';
        pb_show_modal('Veranstaltungen bearbeiten', autolad_element, 1200, null, '');
    });

    function add_conf_params(params) {
        if ($('body').data('pbconfdata')) {
            params.pbconfdata = $('body').data('pbconfdata');
        }
    }

});
