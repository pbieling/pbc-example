import { CodeJar } from '/3rd/node_modules/codejar/dist/codejar.js';
import {withLineNumbers} from "/3rd/node_modules/codejar-linenumbers/es/index.js";

$(document).ready(function () {
    var module_data = $('#modulcontainer-commondoc').data('commondocmodule');

    var ajax_url = {
        'doc_content': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/GetDocument.php',
        'doc_tools': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/GetTools.php',
        'doc_update_entry': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/UpdateEntry.php',
        'ajf': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/Action.php',
        'urlupd': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/UrlUpdate.php',
        'switchupd': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/SwitchUpdate.php',
        'code_entry': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/InlineContentCodeEntry.php',
        'img_entry': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/InlineImageEntry.php',
        'pdf_list': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/PdfModalFileList.php'};
    var pb_jstree_conf = {'tree_name': 'docadmin_tree',
        'id_prefix': 'ahtml_',
        'pbcnf': 'doc'};
    const pageTreeIcons = $('body').data('pbconfdata').pg_iconset.page_tree;

    /*
     var editor = ace.edit("editor");
     editor.setTheme("ace/theme/tomorrow");
     editor.session.setMode("ace/mode/php");
     editor.setAutoScrollEditorIntoView(true);
     editor.setOption("minLines", 5);
     editor.setOption("maxLines", 100);
     */

    const editor = document.querySelector('.editor');
    const highlight = editor => {
        // editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.javascript, 'javascript');
        editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages.php, 'php');
    };
    const jar = CodeJar(editor, withLineNumbers(highlight), {tab: '\t'});



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
    }).on('delete_node.jstree', function (e, data) {
        $.get(ajax_url.ajf + '?operation=delete_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'parent': data.parent})

                .done(function () {
                    data.instance.activate_node(data.node.parent);
                })

                .fail(function () {
                    pbtoast('error', 'Fehler beim Löschen');
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

                            pbtoast('error', 'Fehler beim Erzeugen des Elements.');
                        });
            })

            .on('rename_node.jstree', function (e, data) {
                $.get(ajax_url.ajf + '?operation=rename_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'text': data.text})
                        .fail(function () {
                            pbtoast('error', 'Fehler beim Umbenennen');
                        });
            })

            .on('move_node.jstree', function (e, data) {

                $.get(ajax_url.ajf + '?operation=move_node', {'pbcnf': pb_jstree_conf.pbcnf, 'id': data.node.id, 'parent': data.parent, 'position': data.position})
                        .fail(function () {
                            pbtoast('error', 'Technischer Fehler');
                        });

            })

            .on('select_node.jstree', function (e, data) {
                var id = data.node.id.split('_')[1];
                data.instance.open_node(data.node);
                get_doctools(id);
            }).on('after_close.jstree ', function (e, data) {
        if (data.instance.get_type(data.node) === 'dir-locked') {
            data.instance.set_type(data.node, 'dir-closed-locked');
        } else if (data.instance.get_type(data.node) === 'dir-unlocked') {
            data.instance.set_type(data.node, 'dir-closed-unlocked');
        }
    }).on('after_open.jstree ', function (e, data) {
        if (data.instance.get_type(data.node) === 'dir-closed-locked') {
            data.instance.set_type(data.node, 'dir-locked');
        } else if (data.instance.get_type(data.node) === 'dir-closed-unlocked') {
            data.instance.set_type(data.node, 'dir-unlocked');
        }
    }).on('ready.jstree', function (e, data) {
        //If nothing was selected before there is no key in local storage. Then activate the forst page.
        const key = "jstreedocadmin";

        if (localStorage.getItem(key) === null) {
            data.instance.activate_node('adminl1');
            data.instance.open_node('adminl');
            console.log('key existiert nicht!!!');
        }
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
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
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
            pbtoast('error', 'Es wurde nichts geändert.');
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
                pbtoast('error', d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_doctools(row_id);
            }
        }).fail(function () {

            pbtoast('error', 'Technischer Fehler');
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
            pbtoast('error', 'Technischer Fehler');

        });
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
                pbtoast('error', d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_doctools(row_id);
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
            get_doctools(row_id);
        });

    });

    //Icon-Type wird nach einem Select des Münüpunkts neu gesetzt, sofern etwas geändert wurde
    function change_icon(id, ictype) {
        var tree = $("#" + pb_jstree_conf.tree_name).jstree(true);
        tree.set_type(tree.get_node(pb_jstree_conf.id_prefix + id), ictype);
    }

    //URL 
    $(document).on("click", ".pbbtnbar-inline-content button.pb-btn-url", function (e) {
        e.preventDefault();
        var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#urlEntryModal").data('docpositon', position);
            $("#urlEntryModal").data('endpositon', input_el[0].selectionEnd);
            $("#urlEntryModal").data('input_el', input_el); //ganzes Objekt in data speichern!
            $("#pbbtn-urlentry").prop('disabled', false);
            $("#urlEntryModal").modal("show");
        } else {
            pbtoast('error', 'Es ist ein Fehler aufgetreten.');
        }
    });
    $(document).on("click", "#pbbtn-urlentry", function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);
        var link = $('#url-entry-modal-url').val();
        var start = '[';

        if ($('#url-entry-modal-chck-external').prop('checked')) {
            var end = '](' + link + '){target=_blank rel=external}';
            //  end += '{target=_blank rel=external}';
            //  
            // var end = ' <i class="fas fa-external-link-alt"></i>](' + link + '){target=_blank}';
        } else {
            var end = '](' + link + ')';
        }
        insert($("#urlEntryModal").data('input_el'), $("#urlEntryModal").data('docpositon'), start, end, $("#urlEntryModal").data('endpositon'));

        $("#urlEntryModal").modal("hide");
    });


//PDF-Button
    $(document).on("click", ".pbbtnbar-inline-content button.pb-btn-pdf", function (e) {
        e.preventDefault();
        var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#pdfEntryModal").data('docpositon', position);
            $("#pdfEntryModal").data('endpositon', input_el[0].selectionEnd);
            $("#pdfEntryModal").data('input_el', input_el); //ganzes Objekt in data speichern!
            $("#pbbtn-pdfentry").prop('disabled', false);
            load_modal_pdf_file_list();

            // console.log($("#pdfEntryModal").data('docpositon') + ' : ' + $("#pdfEntryModal").data('endpositon'));

            $("#pdfEntryModal").modal("show");
        } else {
            pbtoast('error', 'Es ist ein Fehler aufgetreten.');
        }
    });
    $(document).on("click", "#pbbtn-pdfentry", function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);
        var link = $('#pdf-entry-modal-url').val();
        // var start = '[<i class="fas fa-file-pdf"></i> ';
        var start = '[';

        //Wenn nichts markiert wurde das gewählte Option-Label einfügen:
        if ($("#pdfEntryModal").data('docpositon') === $("#pdfEntryModal").data('endpositon')) {
            start += $('#pdf-link-selection option:selected').text();
        }


        if ($('#pdf-entry-modal-chck-external').prop('checked')) {

            var end = '](' + link + '){target=_blank rel=external data-filetype=pdf}';
            //var end = ' <i class="fas fa-external-link-alt"></i>](' + link + '){target=_blank}';
        } else {
            //var end = '](' + link + ')';
            var end = '](' + link + '){target=_blank data-filetype=pdf}';
        }


        insert($("#pdfEntryModal").data('input_el'), $("#pdfEntryModal").data('docpositon'), start, end, $("#pdfEntryModal").data('endpositon'));

        $("#pdfEntryModal").modal("hide");
        //Speichern
        $('#f-maintext').submit();
    });

    $("#pdfEntryModal").on('hide.bs.modal', function () {
        //Text entfernen:
        $('#pdf-entry-modal-url').val('');
        //Radio-Button-Check entfernen
        $("#pdf-entry-modal-chck-external").prop('checked', false);
    });

    function load_modal_pdf_file_list() {
        //pdf-link-selection
        var params = {
            pbcnf: pb_jstree_conf.pbcnf
        };
        $.post(ajax_url.pdf_list, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#pdf-link-selection').html(d.html);
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler.');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
        });
    }

    //Ausgewähltes PDF in Linkliste eintragen
    $(document).on('change', '#pdf-link-selection', function () {
        $('#pdf-entry-modal-url').val($(this).val());
    });

    $(document).on("click", ".pbbtnbar-inline-content button.pb-btn-code", function (e) {
        //e.preventDefault();



        var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        //input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            jar.updateCode(''); //Vorherigen Eintrag löschen
            //Bezieht sich auf die Position im Textfeld, in die die Nummer für das Element eingetragen wird.
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#codeModal").data('docpositon', position);
            $("#codeModal").data('input_el', input_el); //TEST ganzes Objekt speichern

            $('#codeModal').one('shown.bs.modal', function () {
                $('.editor').focus();
            });

            $('#codeModal').modal('show');



        } else {
            pbtoast('error', 'Technischer Fehler');
        }

    });

    $(document).on("click", "#pbbtn-codeentry", function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);
        var btn_el = $(this);

        //var src_code = editor.getValue();
        var src_code = editor.textContent;
        var params = {id: $("#f-maintext").data('id'),
            src_code: src_code,
            pbcnf: pb_jstree_conf.pbcnf,
            code_type: $("input[name=pbmodal-codetype]").val()
        };

        $.post(ajax_url.code_entry, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Code-Identifier einfügen
                insert($("#codeModal").data('input_el'), $("#codeModal").data('docpositon'), d.inline_id);
                // editor.setValue('');
                jar.updateCode('');
                btn_el.prop('disabled', false);
                $('#update-doc-formdata').click(); //Direkt aktualisieren,
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler. Daten können nicht aktualisiert werden.');
                // editor.setValue('');
                jar.updateCode('');
                btn_el.prop('disabled', false);
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
            //editor.setValue('');
            jar.updateCode('');
            btn_el.prop('disabled', false);
        }).always(function () {
            $("#codeModal").modal("hide");
        });
    });

    $(document).on("click", ".pbbtnbar-inline-content button.pb-btn-image", function (e) {
        e.preventDefault();
        var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#imageEntryModal").data('docpositon', position);
            $("#imageEntryModal").data('input_el', input_el); //ganzes Objekt in data speichern!
            $("#pbbtn-imgcodeentry").prop('disabled', false);

            var img_id = $('#pbblog-imagetable').find('input[name=image_entry_selection]:checked').val();
            if (!img_id) {
                alert('Bitte wählen Sie zunächst ein Bild aus der Tabelle');
                $('a[href="#bildupload"]').click();
                return;
            }

            var imghtml = '<img src="' + $('#thumb-registered-' + img_id).attr('src') + '">';
            $('#selected-image-thumbview').html(imghtml);
            $('#selected-image-thumbview').data('img_id', img_id);
            $("#imageEntryModal").modal("show");

        } else {
            alert('Technischer Fehler');
        }
    });

    $(document).on("click", "#pbbtn-imgcodeentry", function (e) {
        e.preventDefault();
        var image_type = $("input[name=pbmodal-imagetype]:checked").val();
        if (!image_type) {
            pbtoast('error', 'Bitte wählen Sie ein Bildformat aus.');
            return;
        }

        $(this).prop('disabled', true);

        var params = {
            id: $("#f-maintext").data('id'),
            img_id: $('#selected-image-thumbview').data('img_id'),
            // src_code: src_code,
            pbcnf: pb_jstree_conf.pbcnf,
            image_type: image_type
        };

        $.post(ajax_url.img_entry, params, "json").done(function (d) {
            if (d.succ === 'OK') {

                //Doce einfügen
                insert($("#imageEntryModal").data('input_el'), $("#imageEntryModal").data('docpositon'), d.inline_id);
                $("#imageEntryModal").modal("hide");
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler. Daten können nicht aktualisiert werden.');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
        });
    });

    //Beim Schließen des Fensters Auswahl zurücksetzen
    $("#imageEntryModal").on('hide.bs.modal', function () {
        //Bild entfernen
        $('#selected-image-thumbview').html('');
        //Radio-Button-Check entfernen
        $("input[name=pbmodal-imagetype]:checked").prop('checked', false);
    });

    function insert(el, last_insert_position, aTag, eTag = '', last_end_position = null) {
        var input = el[0];
        el.focus();
        if (typeof input.selectionStart === 'undefined') {
            pbtoast('error', 'Technischer Fehler beim Einfügen.');
            return false;
        }
        var start, end;
        if (last_insert_position) {
            start = last_insert_position;
            end = (last_end_position) ? last_end_position : last_insert_position;
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
        //editor.session.setMode("ace/mode/" + ctype);
        editor.innerHTML = Prism.highlight(editor.textContent, Prism.languages[ctype], ctype);



    });


});


