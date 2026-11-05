$(document).ready(function () {
     var ajaxUrls = {
        'user_in_group': 'PbClasses/Access/Ajax/UserInGroup.php',
        'update_user_in_group': 'PbClasses/Access/Ajax/UpdateUserInGroup.php'
        
    };  
    
    var modify_group2user = function(modal, params) {
        let postparams = {
            'gid' : params.gid,
            'add' : [],
            'remove' : []
        };
        $('#table-group2user input').each(function() {
            if ($(this).prop('checked') && ! $(this).data('oldval')) {
                postparams.add.push($(this).val());
            } else if (! $(this).prop('checked') && $(this).data('oldval')) {
                postparams.remove.push($(this).val());
            }
            
            
        });
        
        //todo: Prüfen, ob etwas geändert wurde.
        
        
               // add_conf_params(params);
        $.post(ajaxUrls.update_user_in_group, postparams).done(function (d) {
            if (d.succ === 'OK') {
               pbtoast('success', 'Das Update wurde durchgführt.');
                                       $(document).trigger("table_refresh_rows", {
                            "tabid": 'editaccessgroups'
                        });
               
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technisches Problem');
        });   
        
        
        
        
        
        
        //console.log(postparams);
        //alert(params.gid);
        modal.hide();
    };
    
    
    $(document).on('click' , '.user-in-group', function() {
        var params = {'gid' : $(this).val()};

       // add_conf_params(params);
        $.post(ajaxUrls.user_in_group, params).done(function (d) {
            if (d.succ === 'OK') {
                pb_show_modal('User zur Gruppe ' + params.gid + ' hinzufügen', d.html, 1200, modify_group2user, 'Eintragen', params);

            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technisches Problem');
        });        
    });
    
    
    
    
});


