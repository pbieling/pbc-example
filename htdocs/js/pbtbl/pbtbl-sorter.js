$(document).ready(function () {
     var ajax_files = {
        'pbtbl_order': 'PbClasses/Table/Ajax/SortOrder.php'
    };

    var pbtbl_tablerows_order = {}; //Speichert nach Änderungen der Kategorientabelle die Reihenfolge der IDs zwischen.

    $(document).on("bsmodal-hide", function (e, prm) {
        var element = $(prm.element);
        if (element.find('.pbtbl-sortable-rows').length) {
            var conf_sortkey = element.find('.pbtbl-sortable-rows').data('pbtblsort');
            console.log('Sortkey: ' + conf_sortkey);
            
            if (pbtbl_tablerows_order[conf_sortkey] && pbtbl_tablerows_order[conf_sortkey].length) {
                var params = {'sort_arr': pbtbl_tablerows_order[conf_sortkey],
                              'conf_sortkey' : conf_sortkey};
                add_conf_params(params);
                $.post(ajax_files.pbtbl_order, params, "json").done(function (d) {
                    if (d.succ !== 'OK') {
                        pbtoast('error', d.errortext || 'Problem beim Speichern der Sortierung.');
                    } else {
                         $(document).trigger("pbtable_modaltable_sorted", {
                             'conf_sortkey' : conf_sortkey
                         });
                    }
                  
                }).fail(function () {
                    pbtoast('error', 'Technisches Problem beim Speichern der Sortierung.');
            
                });
            } 
        }
    });

    $(document).on("pbtable_firstload", function (e, params) {
        if (params.tabid) {
            var tabid = params.tabid;
        } else {
            
            return false;
        }

        if (! $('[data-tabid=' + tabid + '] .pbtbl-sortable-rows').length) {
           
            return false;
        }
        
        
        /*
         * var el = document.getElementById('items');
var sortable = Sortable.create(el);
         */
        
        
        var tbody_el = $('[data-tabid=' + tabid + '] .pbtbl-sortable-rows');
        var conf_sortkey = tbody_el.data('pbtblsort');
        if (! conf_sortkey) {
            return false;
        }
        
        
        var el = document.querySelector('[data-tabid=' + tabid + '] .pbtbl-sortable-rows');
        var sortable = new Sortable(el, {
            handle: '.pbtbl-movehandle',
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd: function () {
                pbtbl_tablerows_order[conf_sortkey] = [];
                tbody_el.find('.pbtbl-movehandle').each(function () {
                    pbtbl_tablerows_order[conf_sortkey].push($(this).data('id'));
                    

                });
                // console.log(pbtbl_tablerows_order);
            }
        });
        
        
        
        /*
        tbody_el[0].sortable({
            handle: '.pbtbl-movehandle',
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd: function () {
                pbtbl_tablerows_order[conf_sortkey] = [];
                tbody_el.find('.pbtbl-movehandle').each(function () {
                    pbtbl_tablerows_order[conf_sortkey].push($(this).data('id'));
                    

                });
                // console.log(pbtbl_tablerows_order);
            }
        });
         * 
         */
    });



    function add_conf_params(params) {
        if ($('body').data('pbconfdata')) {
            params.pbconfdata = $('body').data('pbconfdata');
        }
    }



});
