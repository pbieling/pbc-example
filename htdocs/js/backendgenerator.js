//import "../../3rd/node_modules/bootstrap-show-modal/src/ShowModal.js";
import { CodeJar } from '../../3rd/node_modules/codejar/dist/codejar.js';
import {withLineNumbers} from "../../3rd/node_modules/codejar-linenumbers/es/index.js";



//Todo:deselect_node und  select_node auswechseln gegen activate_nocde!
$(document).ready(function () {

    var id_prefix = 'phtml_';
    var ajf = 'PbClasses/Backend/Ajax/Action.php';
    var ajr = 'PbClasses/Backend/Ajax/SelectedRow.php';
    var urlupd = 'PbClasses/Backend/Ajax/UrlUpdate.php';
    var switchupd = 'PbClasses/Backend/Ajax/SwitchUpdate.php';
    var singlevalupd = 'PbClasses/Backend/Ajax/UpdateSgValue.php';
    var agc = 'PbClasses/Backend/Ajax/GetSrcCode.php';
    var aupd = 'PbClasses/Backend/Ajax/UpdateSrcCode.php';

    const editor = document.querySelector('.editor');

    const highlight = editor => {
        editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.php, 'php');
    };

    const jar = CodeJar(editor, withLineNumbers(highlight), {tab: '\t'});
    var ajax_url = {'table-editor-list': 'PbClasses/Backend/Ajax/TableEditorList.php',
        'docu-list': 'PbClasses/Backend/Ajax/DocumentationList.php',
        'groups_for_page': 'PbClasses/Access/Ajax/GroupsForPage.php',
        'update_groups_for_page': 'PbClasses/Access/Ajax/UpdateGroupsForPage.php'};


    const pageTreeIcons = $('body').data('pbconfdata').tree_iconset;

    $.jstree.defaults.state.key = 'jstreebackendgenerator';
    $("#tree").jstree({
        "core": {
            "animation": 0,
            "multiple": false,

            'check_callback': function (o, n, p, i, m) {
                if (o === "delete_node") {
                    if (n.id === id_prefix + 1) {
                        alert('Löschen der Startseite ist nicht möglich.');
                    } else {
                        return confirm('Möchten Sie diesen Eintrag wirklich entfernen?');
                    }
                    return false;
                }
                return true;
            },

            'themes': {
                'responsive': true,
                'name': 'default',
                'variant': 'large'
                        // 'stripes': true
            }


        },
        "contextmenu": {
            "items": function (node) {
                var tree = $("#tree").jstree(true);
                return {
                    "Create_above": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Neu oben",
                        "action": function (obj) {
                            node = tree.create_node(node, '', "before");
                            tree.edit(node, 'Neues Element', function (node, status) {
                                tree.deselect_node(node);
                                tree.select_node(node)
                            });
                        }
                    },
                    "Create": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Neu (Kind)",
                        "action": function (obj) {
                            node = tree.create_node(node);
                            tree.edit(node, 'Neues Element', function (node, status) {
                                tree.deselect_node(node);
                                tree.select_node(node)
                            });
                        }
                    },
                    "Create_after": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Neu unten",
                        "action": function (obj) {
                            node = tree.create_node(node, '', "after");
                            tree.edit(node, 'Neues Element', function (node, status) {
                                tree.deselect_node(node);
                                tree.select_node(node)
                            });
                        }
                    },
                    "Rename": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Umbenennen",
                        "action": function (obj) {
                            tree.edit(node, null, function (node, status) {
                                tree.deselect_node(node);
                                tree.select_node(node)
                            });
                        }
                    },
                    "Remove": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Entfernen",
                        "action": function (obj) {
                            tree.delete_node(node);
                        }
                    }
                };
            }
        },
        "plugins": ['dnd', 'contextmenu', "state", "types"],
        'types': {

            'default': {
                'icon': pageTreeIcons.default//'bi bi-pencil red'
            },
            'file-unlocked': {
                'icon': pageTreeIcons['file-unlocked'] //'bi bi-file-text'
            },
            'file-locked': {
                'icon': pageTreeIcons['file-locked']  //'bi bi-file red'
            },

            'dir-unlocked': {
                'icon': pageTreeIcons['dir-open']
            },
            'dir-locked': {
                'icon': pageTreeIcons['dir-open-locked']//'bi bi-folder2'
            },
            'dir-closed-locked': {
                'icon': pageTreeIcons['dir-closed-locked']//'bi bi-folder2'
            },
            'dir-closed-unlocked': {
                'icon': pageTreeIcons['dir-closed'] //'bi bi-folder2 red'
            }


        }
    })


            .on('delete_node.jstree', function (e, data) {
                $.get(ajf + '?operation=delete_node', {'id': data.node.id, 'parent': data.parent})

                        .done(function () {
                            data.instance.select_node(data.node.parent);
                        })

                        .fail(function () {
                            alert('Fehler beim Löschen');
                        });
            })


            .on('create_node.jstree', function (e, data) {
                $.get(ajf + '?operation=create_node', {'id': data.node.parent, 'position': data.position, 'text': data.node.text})
                        .done(function (d) {
                            //Auswahl entfernen
                            // data.instance.deselect_node(data.node.parent);
                            //Geht das eleganter???
                            //data.instance.deselect_node($('#tree').jstree(true).get_selected());
                            data.instance.deselect_node(data.instance.get_selected());
                            data.instance.set_id(data.node, d.id);
                            //data.instance.set_icon(data.node, d.icn);
                            data.instance.set_type(data.node, 'default');
                            data.instance.select_node(data.node);
                            //data.instance.refresh();
                            //Refresh

                            //TEST
                            // data.instance.refresh();
                        })
                        .fail(function () {
                            //  data.instance.refresh();
                            alert('Fehler beim Erzeugen des Elements.');
                        });
            })

            .on('rename_node.jstree', function (e, data) {
                $.get(ajf + '?operation=rename_node', {'id': data.node.id, 'text': data.text})
                        .done(function () {
                            // data.instance.select_node(data.node.id, false);
                            //     data.instance.refresh();
                            // data.instance.select_node(data.node);
                        })
                        .fail(function () {
                            alert('Fehler beim Umbenennen');
                        });
            })

            .on('move_node.jstree', function (e, data) {

                $.get(ajf + '?operation=move_node', {'id': data.node.id, 'parent': data.parent, 'position': data.position})
                        .fail(function () {
                            alert('Fehler');
                        });

            })
            .on('select_node.jstree', function (e, data) {
                data.instance.open_node(data.node);
                get_dbtable_row(data.node.id.substr(6));
            })
            //Check if the folder is locked (red) or not
            .on('after_close.jstree ', function (e, data) {
                if (data.instance.get_type(data.node) === 'dir-locked') {
                    data.instance.set_type(data.node, 'dir-closed-locked');
                } else {
                    data.instance.set_type(data.node, 'dir-closed-unlocked');
                }



            })
            .on('after_open.jstree ', function (e, data) {
                if (data.instance.get_type(data.node) === 'dir-closed-locked') {
                    data.instance.set_type(data.node, 'dir-locked');
                } else {
                    data.instance.set_type(data.node, 'dir-unlocked');
                }
            });

    function get_dbtable_row(row_id, get_icon = false) {
        //alert(row_id);
        $.post(ajr, {id: row_id, get_icon: get_icon}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#pageform').html(d.response);
                if (d.node_icon) {
                    change_icon(row_id, d.node_icon);
                }
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            alert('Technischer Fehler');
        });
    }

    //Formular - URL-Eintrag
    $(document).on("submit", "#backend-tree-form", function (e) {
        e.preventDefault();

        var row_id = $(this).data('id');
        var url = $('#url-input').val();
        var old_url = $('#url-input').data('oldval');

        var conf_selection_val = ($('#generate-conf-selection').length) ? $('#generate-conf-selection').val() : false;

        if (url === old_url && !conf_selection_val) {
            alert('Es wurde nichts geändert.');
            return false;
        }

        var posted_url = (url === old_url) ? '' : url;
        var params = {id: row_id, url: posted_url, original_url: url, old_url: old_url, conf_selection_val: conf_selection_val};
        if ($('#tableconfig-selection').length) {
            params.tableconfigselection = $('#tableconfig-selection').val();
        } else if ($('#docu-module-selection').length) {
            params.documoduleselection = $('#docu-module-selection').val();
        }
        //Formular entfernen
        $('#pageform').html('... wird aktualisiert ...');
        $.post(urlupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                get_dbtable_row(row_id, true);
            } else {
                alert(d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_dbtable_row(row_id, true);
            }
        }).fail(function () {
            alert('Technischer Fehler');
            get_dbtable_row(row_id, true);
        });
    });

    $(document).on("change", "#generate-conf-selection", function (e) {
        const sel = ($(this).val());
        let url = '';
        switch (sel) {
            case 'table-editor':
                url = 'table-editor-list';
                break;
            case 'docu-view':
            case 'docu-admin':
                url = 'docu-list';
                break;
            default:

                break;
        }

        if (url === '') { //Keine Daten hinzufügen
            $('#additional-selections').html('');
            return;
        }
        const params = {};
        $.post(ajax_url[url], params, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#additional-selections').html(d.html);
            } else {
                alert(d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');

            }
        }).fail(function () {
            alert('Technischer Fehler');

        });
    });




    $(document).on("click", "#url-suggestion", function (e) {
        $('#url-input').val($(this).text()).focus();
        e.preventDefault();
    });

    $(document).on("click", ".pb-switch-btn", function (e) {
        e.preventDefault();
        var row_id = $('#backend-tree-form').data('id');
        var value = $(this).val();
        var fname = $(this).data('fname');
        var params = {id: row_id, value: value, fname: fname};
        $.post(switchupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                get_dbtable_row(row_id, true);
            } else {
                alert(d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_dbtable_row(row_id, true);
            }
        }).fail(function () {
            alert('Technischer Fehler');
            get_dbtable_row(row_id, true);
        });

    });

    //pb-select-menu
    $(document).on("change", ".pb-select-menu", function (e) {
        var row_id = $('#backend-tree-form').data('id');
        var value = $(this).val();
        var type = $(this).data('type');
        var params = {id: row_id, value: value, type: type};
        $.post(singlevalupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                get_dbtable_row(row_id, true);
            } else {
                alert(d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_dbtable_row(row_id, true);
            }
        }).fail(function () {
            alert('Technischer Fehler');
            get_dbtable_row(row_id, true);
        });

    });



    //Icon-Type wird nach einem Select des Münüpunkts neu gesetzt, sofern etwas geändert wurde
    function change_icon(id, ictype) {
        var tree = $("#tree").jstree(true);
        tree.set_type(tree.get_node('phtml_' + id), ictype);
    }

    //Code anzeigen:
    $(document).on("click", ".pb-btn-showcode", function (e) {
        e.preventDefault();
        $('#pb-codeupdate-btn').prop('disabled', true);
        var src_file = $(this).data('path');
        $("#pb-codeupdate-btn").data('src_file', src_file);

        $('#pbmodal-src_code_url').html(src_file);
        var params = {src_file: src_file};
        $.post(agc, params, "json").done(function (d) {
            if (d.succ === 'OK') {

                $("#codeModal").modal("show");
                $('#pb-codeupdate-btn').prop('disabled', false);
                // editor.setValue(d.code);

                // $('.editor').html(d.code);





                jar.updateCode(d.code);



            } else {
                alert(d.errortext || 'Unbekannter Fehler. Daten können nicht geladen werden.');
            }
        }).fail(function () {
            alert('Technischer Fehler');
        });
    });


    //Code aktualisieren:
    $(document).on("click", "#pb-codeupdate-btn", function (e) {
        $('#pb-codeupdate-btn').prop('disabled', true);
        e.preventDefault();
        var src_file = $(this).data('src_file');
        // var src_code = editor.getValue();
        var src_code = editor.textContent;

        var params = {src_file: src_file, src_code: src_code};
        $.post(aupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                $("#codeModal").modal("hide");
            } else {
                alert(d.errortext || 'Unbekannter Fehler. Daten können nicht aktualisiert werden.');
            }
        }).fail(function () {
            alert('Technischer Fehler');
        });
    });


    //ACCESS

    var modify_page2groups = function (modal, params) {


        let postparams = {
            'pid': params.pid,
            'add': [],
            'remove': []
        };
        $('#table-page2groups input').each(function () {
            if ($(this).prop('checked') && !$(this).data('oldval')) {
                postparams.add.push($(this).val());
            } else if (!$(this).prop('checked') && $(this).data('oldval')) {
                postparams.remove.push($(this).val());
            }


        });

        $.post(ajax_url.update_groups_for_page, postparams).done(function (d) {
            if (d.succ === 'OK') {
                pbtoast('success', 'Das Update wurde durchgführt.');
                //$(document).trigger("table_refresh_rows", {
                //"tabid": 'editaccessgroups'
                //});
                get_dbtable_row(params.pid); //Neu landen

            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technisches Problem');
        });


        modal.hide();
    };

    $(document).on('click', '#add-remove-page2groups', function () {
        var params = {'pid': $('form').data('id')};
        // alert('hier');
        // add_conf_params(params);
        $.post(ajax_url.groups_for_page, params).done(function (d) {
            if (d.succ === 'OK') {
                // 'pbShowDialog': function (title, content, width, fnc, button_label, param_obj) {
                pb_show_modal('Gruppen für Seite ' + params.pid + ' zuordnen', d.html, 800, modify_page2groups, 'Eintragen', params);

            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technisches Problem');
        });
    });


});

