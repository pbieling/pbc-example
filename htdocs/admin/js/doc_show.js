$(document).ready(function () {
    var ajax_url = {'doc_content': 'PbClasses/Doc/Ajax/GetDocument.php',
        'doc_search': 'PbClasses/Doc/Ajax/GetSearchResult.php'};

    var external_hash = get_external_hash();

    $.jstree.defaults.state.key = 'jstreedocpublic';
    var pb_jstree_conf = {'tree_name': 'dokutree',
        'id_prefix': 'phtml_',
        'pbcnf': 'doc'};
    $("#dokutree").jstree({
        "core": {
            "animation": 0,
            "multiple": false,

            'themes': {
                'responsive': true,
                'name': 'default',
                'variant': 'large'
                        //   'stripes': true
            }
        },
        //"plugins": ["state", "types"],
        "plugins": ["state", "types"],
        'types': {
                'default': {
                    'icon': 'bi bi-pencil red'
                },
                'file-unlocked': {
                    'icon': 'bi bi-file-text'
                },
                'file-locked': {
                    'icon': 'bi bi-file red'
                },

                'dir-unlocked': {
                    'icon': 'bi bi-folder2'
                },
                'dir-locked': {
                    'icon': 'bi bi-folder2 red'
                }
        }
    }).on('select_node.jstree', function (e, data) {
        if (external_hash) {
            //activate_external();
 
            var id = external_hash.split('_')[1];
            external_hash = null; //reset
            data.instance.activate_node('phtml_' + id);
        } else {
            data.instance.open_node(data.node);
            var id = data.node.id.split('_')[1];
            window.location.hash = '#doc_' + id;
            get_article(id);
        }


    });


    var last_loaded_id = null;
    function get_article(id) {
        if (id === last_loaded_id) {
            return;
        }
        $.post(ajax_url['doc_content'], {id: id}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#doc_content').html(d.content);
                last_loaded_id = id;
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            alert('Technischer Fehler');
        });
    }


    $(document).on("click", ".doclink", function (e) {
        e.preventDefault();
        var id = $(this).attr('href').split('_')[1];
        //var tree = $("#dokutree").jstree(true);
        // tree.activate_node('phtml_' + id);
        window.location.hash = '#doc_' + id;

    });


    $(document).on("submit", "#f-doc_searchform", function (e) {
        e.preventDefault();
        $.post(ajax_url['doc_search'], {search: $('#doc_searchinput').val(), pbcnf: pb_jstree_conf.pbcnf}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#doc_content').html(d.content);
                last_loaded_id = null;
                window.location.hash = '';
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            alert('Technischer Fehler');
        });

    });

    //Ausführen beim Laden: prüfen, ob Hash vorhanden ist:

    window.onhashchange = function () {
        var hash = window.location.hash;
        if (hash.substr(0, 5) === '#doc_') {
            var id = hash.split('_')[1];
            var tree = $("#dokutree").jstree(true);
            var selected_arr = tree.get_selected(false);
            //Wenn die Seite direkt im Baum ausgewählt wird, darf sie nicht noch einmal aktiviert werden,
            //sonst wird sie erneut geladen.
            if (selected_arr.length && selected_arr[0] === 'phtml_' + id) {
                return;
            }
            tree.activate_node('phtml_' + id);
        }
    };

    function get_external_hash() {
        var hash = window.location.hash;
        console.log(hash);
        return (hash) ? hash : null;
    }
    /*
    function activate_external() {
        var tree = $("#dokutree").jstree(true);    
        var id = external_hash.split('_')[1];
        external_hash = null; //reset
        
            tree.activate_node('phtml_' + id);
            
    }
    */

});


