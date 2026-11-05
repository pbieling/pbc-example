$(document).ready(function () {
    var ajax_url = {
        'doc_content': 'PbClasses/Doc/Ajax/GetDocument.php',
        'doc_tools': 'PbClasses/Doc/Ajax/GetTools.php',
        'doc_update_entry': 'PbClasses/Doc/Ajax/UpdateEntry.php',
        'ajf': 'PbClasses/Doc/Ajax/Action.php',
        'urlupd': 'PbClasses/Doc/Ajax/UrlUpdate.php',
        'switchupd': 'PbClasses/Doc/Ajax/SwitchUpdate.php',
        'code_entry': 'PbClasses/Doc/Ajax/InlineContentCodeEntry.php'};
    var pb_jstree_conf = {'tree_name': 'docadmin_tree',
        'id_prefix': 'ahtml_',
        'pbcnf': 'doc'};


    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/tomorrow");
    editor.session.setMode("ace/mode/php");
    editor.setAutoScrollEditorIntoView(true);
    editor.setOption("minLines", 5);
    editor.setOption("maxLines", 100);

    $.jstree.defaults.state.key = 'jstreedocadmin';
    $("#" + pb_jstree_conf.tree_name).jstree({
        "core": {
            "animation": 0,
            "multiple": false,

            'check_callback': function (o, n, p, i, m) {
                /*
                 if (o === "delete_node") {
                 if (n.id === id_prefix + 1) { 
                 alert('Löschen der Startseite ist nicht möglich.');
                 } else {
                 return confirm('Möchten Sie diesen Eintrag wirklich entfernen?');
                 }
                 return false;
                 }
                 */
                return true;
            },

            'themes': {
                'responsive': true,
                'name': 'default',
                'variant': 'large'
                        //   'stripes': true
            }
        },
        "contextmenu": {
            "items": function (node) {
                var tree = $("#" + pb_jstree_conf.tree_name).jstree(true);
                return {
                    "Create_above": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Neu oben",
                        "action": function (obj) {
                            node = tree.create_node(node, '', "before");
                            tree.edit(node, 'Neues Element', function (node, status) {
                                tree.deselect_node(node);
                                //tree.select_node(node)
                                tree.activate_node(node);
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
                                //tree.select_node(node)
                                tree.activate_node(node);
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
                                //tree.select_node(node)
                                tree.activate_node(node);
                            });
                        }
                    },
                    "Rename": {
                        "separator_before": false,
                        "separator_after": false,
                        "label": "Umbenennen",
                        "action": function (obj) {
                            tree.edit(node, null, function (node, status) {
                                //tree.deselect_node(node);
                                tree.activate_node(node)
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
    })
            .on('delete_node.jstree', function (e, data) {
                $.get(ajax_url.ajf + '?operation=delete_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'parent': data.parent})

                        .done(function () {
                            data.instance.activate_node(data.node.parent);
                        })

                        .fail(function () {
                            pbtoast('error' ,'Fehler beim Löschen');
                        });
            })


            .on('create_node.jstree', function (e, data) {
                $.get(ajax_url.ajf + '?operation=create_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.parent, 'position': data.position, 'text': data.node.text})
                        .done(function (d) {
                            data.instance.set_id(data.node, pb_jstree_conf.id_prefix + d.id);
                            data.instance.set_type(data.node, 'default');
                            data.instance.activate_node(data.node);
                        })
                        .fail(function () {

                     pbtoast('error' ,'Fehler beim Erzeugen des Elements.');
                        });
            })

            .on('rename_node.jstree', function (e, data) {
                $.get(ajax_url.ajf + '?operation=rename_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'text': data.text})
                        .fail(function () {
                     pbtoast('error' ,'Fehler beim Umbenennen');
                        });
            })

            .on('move_node.jstree', function (e, data) {

                $.get(ajax_url.ajf + '?operation=move_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'parent': data.parent, 'position': data.position})
                        .fail(function () {
                     pbtoast('error' ,'Technischer Fehler');
                        });

            })

            .on('select_node.jstree', function (e, data) {
                var id = data.node.id.split('_')[1];
                data.instance.open_node(data.node);
                get_doctools(id);
            });


    function get_doctools(id) {
        $.post(ajax_url['doc_tools'], {id: id, 'pbcnf': pb_jstree_conf.pbcnf}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#doc_content_meta').html(d.content_meta);
                $('#doc_maintext_form').html(d.maintext_form);
                if (d.node_icon) {
                    change_icon(id, d.node_icon);
                }

                //update_prevnext_navigation(id); 


            } else {
                 pbtoast('error' , d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
             pbtoast('error' ,'Technischer Fehler');
        });
    }


    $(document).on("click", ".doclink", function (e) {
        e.preventDefault();
        var id = $(this).attr('href').split('_')[1];
        var tree = $("#dokutree").jstree(true);
        tree.activate_node('phtml_' + id);

    });
    $(document).on("submit", "#f-overview-head", function (e) {
        e.preventDefault();
        var row_id = $(this).data('id');
        var url = $('#url-input').val();
        var old_url = $('#url-input').data('oldval');

        var conf_selection_val = ($('#generate-conf-selection').length) ? $('#generate-conf-selection').val() : false;

        if (url === old_url && !conf_selection_val) {
             pbtoast('error' ,'Es wurde nichts geändert.');
            return false;
        }
        $('#doc_content_meta').html('... wird aktualisiert ...');
        var posted_url = (url === old_url) ? '' : url;
        var params = {id: row_id,
            url: posted_url,
            original_url: url,
            old_url: old_url,
            conf_selection_val: conf_selection_val,
            pbcnf: pb_jstree_conf.pbcnf};
        $.post(ajax_url.urlupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                get_doctools(row_id);
            } else {
                pbtoast('error' , d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_doctools(row_id);
            }
        }).fail(function () {

            pbtoast('error' ,'Technischer Fehler');
            get_doctools(row_id);
        });
    });

    $(document).on("submit", "#f-maintext", function (e) {
        e.preventDefault();
        var entries = {};
        $('.pb-content-values').each(function () {
            entries[$(this).data('placeholder')] = [$(this).val(), $(this).data('updid')];
        });

        var params = {id: $("#f-maintext").data('id'),
            modid: $(this).data('modid'),
            // updid: $(this).data('updid'),
            pbcnf: pb_jstree_conf.pbcnf,
            entry: entries
        };

        $.post(ajax_url['doc_update_entry'], params, "json").done(function (d) {
            if (d.succ === 'OK') {
                pbtoast('success', 'Update erfolgreich');
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');

            }
        }).fail(function () {
             pbtoast('error' ,'Technischer Fehler');
            
        });
                //.always(function () {
           // get_doctools(params.id); 
           //Seite lieber nicht neu laden.
       // });
    });

    $(document).on("click", "#url-suggestion", function (e) {
        $('#url-input').val($(this).text()).focus();
        e.preventDefault();
    });

    $(document).on("click", ".pb-switch-btn", function (e) {
        e.preventDefault();
        var row_id = $('#f-overview-head').data('id');


        var value = $(this).val();
        var fname = $(this).data('fname');
        var params = {id: row_id, value: value, fname: fname, pbcnf: pb_jstree_conf.pbcnf};
        $.post(ajax_url.switchupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                get_doctools(row_id);
            } else {
                 pbtoast('error' , d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_doctools(row_id);
            }
        }).fail(function () {
             pbtoast('error' ,'Technischer Fehler');
            get_doctools(row_id);
        });

    });

    //Icon-Type wird nach einem Select des Münüpunkts neu gesetzt, sofern etwas geändert wurde
    function change_icon(id, ictype) {
        var tree = $("#" + pb_jstree_conf.tree_name).jstree(true);
        tree.set_type(tree.get_node(pb_jstree_conf.id_prefix + id), ictype);
    }

    function show_message(message, succ) {
        $('#pb-action-message').html(message).show().slideUp(2000);
    }

    $(document).on("click", ".pbbtnbar-inline-content button", function (e) {
        e.preventDefault();
        var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#codeModal").data('docpositon', position);
            $("#codeModal").data('input_el', input_el); //TEST ganzes Objekt speichern
            $("#codeModal").modal("show");

        } else {
             pbtoast('error' ,'Technischer Fehler');
        }
    });


    $(document).on("click", "#pbbtn-codeentry", function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);
        var btn_el = $(this);
        //var src_file = $(this).data('src_file');
        var src_code = editor.getValue();
        var params = {id: $("#f-maintext").data('id'),
            src_code: src_code,
            pbcnf: pb_jstree_conf.pbcnf,
            code_type: $("input[name=pbmodal-codetype]").val()
        };


        $.post(ajax_url.code_entry, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Code-Identifier einfügen
                insert($("#codeModal").data('input_el'), $("#codeModal").data('docpositon'), d.inline_id);
                editor.setValue('');
                btn_el.prop('disabled', false);
                $('#update-doc-formdata').click(); //Direkt aktualisieren,
            } else {
                pbtoast('error' , d.errortext || 'Unbekannter Fehler. Daten können nicht aktualisiert werden.');
                editor.setValue('');
                btn_el.prop('disabled', false);
            }
        }).fail(function () {
             pbtoast('error' ,'Technischer Fehler');
            editor.setValue('');
            btn_el.prop('disabled', false);
        }).always(function() {
            $("#codeModal").modal("hide");
        });


    });

    function insert(el, last_insert_position, aTag, eTag = '') {
        var input = el[0];
        el.focus();
        if (typeof input.selectionStart === 'undefined') {
             pbtoast('error' ,'Technischer Fehler beim Einfügen.');
            return false;
        }
        var start, end;
        if (last_insert_position) {
            start = last_insert_position;
            end = last_insert_position;
        } else {
            start = input.selectionStart;
            end = input.selectionEnd;
        }
        var insText = input.value.substring(start, end);
        input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
        /* Anpassen der Cursorposition */
        var pos;
        if (insText.length === 0) {
            pos = start + aTag.length;
        } else {
            pos = start + aTag.length + insText.length + eTag.length;
        }
        input.selectionStart = pos;
        input.selectionEnd = pos;
    }

    //Beim Umschalten des Codetyps soll auch der Ace-Editor die Sprache wechseln
    $(document).on("click", "input[name=pbmodal-codetype]", function (e) {
        var codetype = $(this).val().split('_')[1];
        var ctype = (codetype === 'pbtpl') ? 'smarty' : codetype;
        editor.session.setMode("ace/mode/" + ctype);
    });

});


