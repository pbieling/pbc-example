//Version 2025-11-27
$(document).ready(function () {
    const generalIcons = $('body').data('pbconfdata').general_iconset;
    const pageTreeIcons = $('body').data('pbconfdata').pg_iconset.page_tree;
    const structTreeIcons = $('body').data('pbconfdata').pg_iconset.struct_tree;

    var subroot = $('body').data('subroot') || '';
    var form_templates = {
        'edit-fields': '<form id="f-edit-fields" name="f-edit-fields">'
                + '<fieldset><label for="f-edit-fields_entry">Feld / Felder</label>'
                + '<input id="f-edit-fields_entry" type="text" value="{ENTRY}" name="f-edit-fields_entry" size="120">'
                + '<input id="f-edit-fields_strid" name="f-edit-fields_strid" type="hidden" value="{STRID}">'
                + '<input id="f-edit-fields_src" name="f-edit-fields_src" type="hidden" value="{SRC}"></fieldset</form>',
        'edit-structure': '<div id="edit-structure-ajax">{AJAX_CONTENT}</div>',
        'entry-editor-form-single': '<form id="f-entry-editor-form-single" name="f-entry-editor-form-single" method="post" action="#">'
                + '<fieldset><label for="entry-editor-form-single-entry">Eintrag</label>'
                + '<textarea id="entry-editor-form-single-entry" rows="15" cols="80" name="entry-editor-form-single-entry">{ENTRY}</textarea>'
                + '<input id="entry-editor-form-single-id" type="hidden" value="{ID}"><br><label for="entry-editor-form-single-filter">Filter</label>'
                + '<input id="entry-editor-form-single-filter" type="text" value="{FILTER}" name="entry-editor-form-single-filter" size="10">\n\n'
                + '<button class="btn btn-primary" id="inline_image_button" type="button">Bild</button> <button type="button" id="inline_code_button" class="btn btn-secondary">Code</button></fieldset></form>',
        'update-projectclass': '<form id="f-entry-edit-projectclass-name" name="f-entry-edit-projectclass-name" method="post" action="#">'
                + '<div class="form-group"><label for="entry-projectclass-name">Projekt-Klasse</label>'
                + '<input id="entry-projectclass-name"  class="form-control" type="text" value="{PROJECT_CLASS}" name="entry-projectclass-name"></div>'
                + '<div class="form-group"><label for="entry-projectclass-param">Parameter</label>'
                + '<input id="entry-projectclass-param" class="form-control" type="text" value="{PARAM}" name="entry-projectclass-param"></div>'
                + '<input id="projectclass_structid" name="projectclass_structid" type="hidden" value="{STRID}"></form>',
        'sg-structure-val': '<form id="f-entry-sg-structure-entry" name="f-entry-sg-structure-entry" method="post" action="#">'
                + '<div class="form-group"><label for="sg-structure-val-value">Eintrag {ENTRY_TYPE}</label>'
                + '<input id="sg-structure-val-value"  class="form-control" type="text" value="{VALUE}" name="sg-structure-val-value"></div>'

                + '<input id="sg-structure-val-fieldid" name="sg-structure-val-fieldid" type="hidden" value="{FIELDID}">'
                + '<input id="sg-structure-val_structid" name="sg-structure-val_structid" type="hidden" value="{STRID}"></form>'

    };


    var pbTpl = {
        fillTpl: function (tpl, srObj) {
            $.each(srObj, function (key, value) {
                var regex = new RegExp('\{' + key.toUpperCase() + '\}', "g");
                tpl = tpl.replace(regex, value);
            });
            return tpl;
        }
    };

    var conf_name = $('#tabs-1').data('conf');

    var ajf = subroot + '/PbClasses/PG/Ajax/MAction.php?conf_name=' + conf_name;
    var asf = subroot + '/PbClasses/PG/Ajax/MStructureAction.php?conf_name=' + conf_name;

    var ajaxfiles = {'generator': subroot + '/PbClasses/PG/Ajax/MGenerate.php',
        'switchupd': subroot + '/PbClasses/PG/Ajax/MSwitchUpdate.php',
        'doc_tools': subroot + '/PbClasses/PG/Ajax/MGetTools.php',
        'code_entry': subroot + '/PbClasses/PG/Ajax/MInlineContentCodeEntry.php'};


    var pb_jstree_conf = {'tree_name': 'tree',
        'id_prefix': 'phtml_'};


    $.post(subroot + '/PbClasses/PG/Ajax/MSiteTree.php', {'type': 'start', 'conf_name': conf_name}, function (data) {
        $("#pg_navi").html(data);
        initialize_tree();
    });

    //===============
    var editor = ace.edit("template-editor-form-sourcecode");
    editor.setTheme("ace/theme/tomorrow_night_blue");
    editor.getSession().setMode("ace/mode/html");

    //Code-Editor
    var editor2 = ace.edit("editor");
    editor2.setTheme("ace/theme/tomorrow");
    editor2.session.setMode("ace/mode/php");
    editor2.setAutoScrollEditorIntoView(true);
    editor2.setOption("minLines", 5);
    editor2.setOption("maxLines", 100);

    function  initialize_tree() {
        $("#tree").jstree({
            "core": {
                "animation": 0,
                "multiple": false,
                'check_callback': function (o, n, p, i, m) {
                    if (o === "delete_node") {
                        if (this.is_parent(n)) {
                            pbtoast('error', 'Löschen nicht möglich.');
                        } else {
                            return confirm('Möchten Sie diesen Eintrag wirklich entfernen?');
                        }
                        return false;
                    }
                    return true;
                },
                'themes': {
                    'responsive': true,
                    'variant': 'large'
                            // 'stripes': true
                }
            },
            "contextmenu": {
                "items": function ($node) {
                    var tree = $("#tree").jstree(true);

                    return {
                        "Create_above": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Neu oben",
                            "action": function (obj) {
                                $node = tree.create_node($node, '', "before");
                                tree.edit($node);

                            }
                        },
                        "Create": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Neu (Kind)",
                            "action": function (obj) {
                                $node = tree.create_node($node);
                                tree.edit($node);

                            }
                        },
                        "Create_after": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Neu unten",
                            "action": function (obj) {
                                $node = tree.create_node($node, '', "after");
                                tree.edit($node);

                            }
                        },
                        "Rename": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Umbenennen",
                            "action": function (obj) {
                                tree.edit($node);
                            }
                        },
                        "Remove": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Entfernen",
                            "action": function (obj) {
                                tree.delete_node($node);
                            }
                        }
                    };
                }
            },
            "plugins": ["state", 'dnd', 'contextmenu', 'wholerow', "types"],
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
                    $.get(ajf + '&operation=delete_node', {'id': data.node.id, 'parent': data.parent})

                            .done(function () {
                                data.instance.select_node(data.node.parent);
                            })

                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('create_node.jstree', function (e, data) {
                    $.get(ajf + '&operation=create_node', {'id': data.node.parent, 'position': data.position, 'text': data.node.text})
                            .done(function (d) {
                                data.instance.set_id(data.node, d.id);
                                data.instance.set_icon(data.node, d.icn);
                                data.instance.deselect_all();
                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('rename_node.jstree', function (e, data) {
                    $.get(ajf + '&operation=rename_node', {'id': data.node.id, 'text': data.text})
                            .done(function () {
                                data.instance.select_node(data.node);

                            })
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('move_node.jstree', function (e, data) {
                    $.get(ajf + '&operation=move_node', {'id': data.node.id, 'parent': data.parent, 'position': data.position})
                            .fail(function () {
                                data.instance.refresh();
                            });
                })
                .on('copy_node.jstree', function (e, data) {
                    $.get(ajf + '&operation=copy_node', {'id': data.original.id, 'parent': data.parent, 'position': data.position})
                            .always(function () {
                                data.instance.refresh();
                            });
                })
                .on('select_node.jstree', function (e, data) {
                    data.instance.open_node(data.node);
                })
                .on('changed.jstree', function (e, data) {
                    if (data && data.selected && data.selected.length) {
                        $.get(ajf + '&operation=get_content&id=' + data.selected.join(':'), function (d) {


                            if (d.icn) {
                                data.instance.set_icon(data.node, d.icn);
                            }
                            $('#pg_tools').html(d.content).show();
                            load_structure_tree(d.modul, data.node.id);


                        });
                    } else {
                        // $('#data .content').hide();
                        // $('#data .default').html('Select a file from the tree.').show();
                    }
                })
                //Check if the folder is locked (red) or not
                .on('after_close.jstree ', function (e, data) {
                    if (data.instance.get_type(data.node) === 'dir-locked') {
                        data.instance.set_type(data.node, 'dir-closed-locked');
                    } else if (data.instance.get_type(data.node) === 'dir-unlocked') {
                        data.instance.set_type(data.node, 'dir-closed-unlocked');
                    }



                })
                .on('after_open.jstree ', function (e, data) {
                    if (data.instance.get_type(data.node) === 'dir-closed-locked') {
                        data.instance.set_type(data.node, 'dir-locked');
                    } else if (data.instance.get_type(data.node) === 'dir-closed-unlocked') {
                        data.instance.set_type(data.node, 'dir-unlocked');
                    }
                });
    }
    function load_structure_tree(modul, page_id) {
        $.post(subroot + '/PbClasses/PG/Ajax/MStructureTree.php', {'modul': modul, 'page_id': page_id, 'conf_name': conf_name}, function (data) {
            $("#overview-left").html(data).ready(function () {
                pagegenerator_structure(); //Ehelmals eigenes Script
            });
        });
    }

    $(document).on("submit", "#f-overview-head", function (event) {
        event.preventDefault();
        var updObj = {};
        $("input[data-fieldname]")
                .each(function () {

                    if (!$(this).hasClass('pb-switch-btn')) {
                        var key = $(this).data('fieldname');
                        var value = $(this).val();
                        updObj[key] = value;
                        //console.log(key);
                    }
                });

        var id = $('#f-overview-head').data('id');
        var param = {
            conf_name: conf_name,
            upd_table_name: 'PAGE_INDEX',
            upd_where_key: 'ID',
            upd_where_value: id,
            upd_arr: updObj};
        $.post(subroot + "/PbClasses/PG/Ajax/MAjaxUpdater.php", param, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Es muss das node-Objekt übergeben werden, nicht die ID des Knotens!
                var ref = $('#tree').jstree(true);

                var sel = ref.get_selected();
                $('#tree').jstree(true).set_icon(sel, d.icn);
                $('#pg_tools').html(d.content).load(load_structure_tree(d.modul, 'id_' + id));
            } else {
                pbtoast('error', d.errortext || 'Unerwarteter Update-Fehler.');
            }
        }).fail(function () {
            pbtoast('error', 'Unerwarteter Fehler.');
        });
    });

    $("#template-editor-form button[data-pbmodalevent='save']").click(function (event) {
        event.preventDefault();
        save_template_updates(false);
        generateCurrentPage();
    });
    $("#template-editor-form button[data-pbmodalevent='save_close']").click(function (event) {
        event.preventDefault();
        save_template_updates(true);
        generateCurrentPage();
    });

    $(document).on("click", "#tpl-filename, .editable_template_file", function () {
        var el = $(this);

        var params = {'conf_name': conf_name,
            tplname: el.text(),
            tpl_id: el.data('tplid')};
        $('#template-editor-form-reg').show();
        $("#template-editor-form").modal("show");
        //$('#template-editor-form-sourcecode').html('... bitte warten ...');
        editor.setValue(" ... bitte warten ...");
        //Modal zurücksetzen
        $('#template-editor-form-tplname').val(' ? ? ? ');
        $('#template-editor-form-tplkey').val('');
        $('#template-editor-form-tpltype').val('');
        $('#template-editor-form-tpllabel').val('');

        $.post(subroot + '/PbClasses/PG/Ajax/MGetTemplatefileSrc.php', params, "json").done(function (d) {
            editor.setValue(d.src);
            if (d.succ === 'OK') {
                $('#template-editor-form-tplname').val(d.filename);
            }
        }).fail(function () {
            pbtoast('error', 'Problem beim Laden des Template-Files');
            $("#template-editor-form").modal("hide");
        });
    });

    $(document).on("submit", "#f-template-editor-form", function (event) {
        event.preventDefault();
    });

    function save_template_updates(close) {
        //z.B. für include
        var filetype = $('#template-editor-form-filetype').val();
        var params = {
            conf_name: conf_name,
            tplname: $('#template-editor-form-tplname').val(),
            filecontent: editor.getValue(),
            filetype: filetype};
        if ($('#template-editor-form-tplkey').val()) {
            params.tplkey = $('#template-editor-form-tplkey').val();
            params.tpltype = $('#template-editor-form-tpltype').val();
            params.tpllabel = $('#template-editor-form-tpllabel').val();
        }

        $.post(subroot + '/PbClasses/PG/Ajax/MUpdateTemplatefile.php', params, "json").done(function (d) {
            if (d.succ === 'OK') {
                pbtoast('success', 'Update erfolgreich');
            }
            if (close) {
                $("#template-editor-form").modal("hide");
            }
        }).fail(function () {
            pbtoast('error', 'Problem beim Speichern der Datei');
            $("#template-editor-form").modal("hide");
        }).always(function () {
            //$('#show_template_table').click();
            $('button.tablerow-refresh-button').click();
            
        });
    }

    $(document).on("click", ".show_table-editor", function () {
        var tablename = $(this).data('tablename');
        $.post(subroot + '/PbClasses/PG/Ajax/ShowTableEditor.php', {tablename: tablename}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#table-editor-' + tablename).html(d.html).ready(function () {
                    if (tablename === 'page_templates') {
                        add_templatetable_data();
                    }
                });
            } else {
                pbtoast('error', 'Tabelle ' + tablename + ' konnte nicht geladen werden.');
            }
        }).fail(function () {
            pbtoast('error', 'Problem beim Laden der Tabelle');
        });
    });


    function add_templatetable_data() {
        $.post(subroot + '/PbClasses/PG/Ajax/GetModuleData.php', {dummy: '1'}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $.each(d.module_arr, function (key, value) {
                    $('#tplmod-' + key).html(value);
                });
            } else if (d.succ === 'EMPTY') {
                return;
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler in Moduldaten.');
        });
    }

    $(document).on("click", ".tpl-module", function (event) {
        if (!confirm('Neues Modul für dieses Template anlegen?')) {
            return false;
        }
        var tpl_id = $(this).attr('id').substr(7); //tplmod-

        $.post(subroot + '/PbClasses/PG/Ajax/MMakeModule.php', {tpl_id: tpl_id, 'conf_name': conf_name}, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('.tablerow-refresh-button').click();
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler beim Modul-Eintrag.');
        });
        return true;
    });

    //incude_sourcename
    $(document).on("click", "#include_sourcename", function () {
        $('#template-editor-form-reg').hide();
        var el = $(this);
        $("#template-editor-form").modal("show");
        editor.setValue(" ... bitte warten ...");
        $('#template-editor-form-tplname').val(' ? ? ? ');
        $('#template-editor-form-filetype').val('include');

        $.post(subroot + '/PbClasses/PG/Ajax/MGetFileSrc.php', {filename: el.text(), 'conf_name': conf_name}, "json").done(function (d) {

            editor.setValue(d.src);
            if (d.succ === 'OK') {
                $('#template-editor-form-tplname').val(d.filename);
            }
        }).fail(function () {
            pbtoast('error', 'Problem beim Laden des Dateiinhalts');
            $("#template-editor-form").modal("hide");
        });
    });

    $(document).on("click", "#fields_link", function () {
        var el = $(this);
        $.post(subroot + '/PbClasses/PG/Ajax/MGetContentData.php', {
            struct_id: el.data('strid'),
            page_id: $('#f-overview-head').data('id'),
            conf_name: conf_name

        }, "json").done(function (d) {
            if (d.succ === 'OK') {
                pb_show_modal('Einträge', d.content, 1000, null, '');
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }

        }).fail(function () {
            pbtoast('error', 'Problem beim Laden der Eintragsdaten');
        });
    });

    var update_entries = function (modal, params) {
        var param = {};
        param.entry = $('#entry-editor-form-single-entry').val().trim();
        param.filter = $('#entry-editor-form-single-filter').val().trim();
        param.id = $('#entry-editor-form-single-id').val();
        param.conf_name = conf_name;

        $.post(subroot + '/PbClasses/PG/Ajax/MUpdateContentData.php', param, "json")
                .done(function (d) {
                    if (d.succ === 'OK') {

                        //
                        if (params.pbmodal_close) {
                            //$("#fields_link").click();
                            modal.hide();
                        } else {
                            //modal.buttonsDisabled(false);
                            modal.footerElement.querySelectorAll('button').forEach(button => {
                                button.disabled = false;
                            });
                        }
                        //Diese Seite neu generieren
                        generateCurrentPage();

                    } else {
                        pbtoast('error', d.errortext || 'Unbekannter Update-Fehler.');
                        modal.hide();
                    }

                })
                .fail(function () {
                    pbtoast('error', 'Problem beim Update/Eintrag');
                    modal.hide();
                });
    };

    $(document).on("click", ".contentrow", function () {
        var el = $(this);

        //Modal schließen, weil es später neu geöffnet wird.
        //Änderung .close auf .btn-close (Bootstrap5)
        el.closest('div.modal').find('button.btn-close').click();

        var id = el.attr('id');
        var id_arr = id.split(/-/);
        var entry = '';
        var filter = '';
        if (id_arr[1] !== '0') {
            entry = el.find('.content_row_entry').html().trim();
            filter = el.find('.content_row_filter').text().trim();
        }

        var sr = {'id': id,
            'entry': entry,
            'filter': filter};

        var form_html = pbTpl.fillTpl(form_templates['entry-editor-form-single'], sr);
        pb_show_modal('Eintrag einfügen / ändern', form_html, 1200, update_entries, 'Aktualisieren', {'pbmodal_close': false, 'close_fnc': function () {
                $("#fields_link").click();
            }});
    });

    var update_field_entries = function (modal) {
        var serialized_data = $("#f-edit-fields").serialize() + '&conf_name=' + conf_name;
        $.post(subroot + '/PbClasses/PG/Ajax/MUpdateFieldsData.php', serialized_data, "json")
                .done(function (d) {
                    if (d.succ === 'OK') {
                        if (d.src === 'entries') {
                            $('#fields_link').html(d.upd_entries);
                        } else {
                            $('#fields-td').html(d.upd_entries);
                        }
                        $('#structuretree').jstree('refresh');
                        modal.hide();
                    } else {
                        pbtoast('error', d.errortext || 'Unbekannter Fehler');
                        modal.hide();
                    }
                }).fail(function () {
            pbtoast('error', 'Problem beim Update!');
            modal.hide();
        });
    };

    $(document).on("click", "#edit-fields-link", function () {
        var el = $(this);
        var sr = {
            'entry': $('#fields-td').text().trim(),
            'strid': el.data('strid'),
            'src': el.data('src')};
        var form_html = pbTpl.fillTpl(form_templates['edit-fields'], sr);
        pb_show_modal('Felder bearbeiten', form_html, 1200, update_field_entries, 'Aktualisieren');
    });



    var update_projectclass_entries = function (modal) {
        var serialized_data = $("#f-entry-edit-projectclass-name").serialize() + '&conf_name=' + conf_name;
        $.post(subroot + '/PbClasses/PG/Ajax/MUpdateTableData.php', serialized_data, "json")
                .done(function (d) {
                    if (d.succ === 'OK') {
                        $('#structuretree').jstree('refresh');
                        modal.hide();
                    } else {
                        pbtoast('error', d.errortext || 'Unbekannter Fehler');
                        modal.hide();
                    }
                }).fail(function () {
            pbtoast('error', 'Problem beim Update!');
            modal.hide();
        });
    };

    //Projektklassennamen und -option umbenennen
    $(document).on("click", "#edit_projectclass_entry", function () {
        var el = $(this);
        var sr = {
            'project_class': $('#projectclass_sourcename').text().trim(),
            'param': $('#projectclass_param').text().trim(),

            'strid': el.data('strid')};
        var form_html = pbTpl.fillTpl(form_templates['update-projectclass'], sr);
        pb_show_modal('Klassennamen und Parameter bearbeiten', form_html, 1200, update_projectclass_entries, 'Aktualisieren');
    });




    //Projektklassennamen und -option umbenennen
    var update_sg_struct_entry = function (modal) {
        var serialized_data = $("#f-entry-sg-structure-entry").serialize() + '&conf_name=' + conf_name;
        $.post(subroot + '/PbClasses/PG/Ajax/MUpdateTableData.php', serialized_data, "json")
                .done(function (d) {
                    if (d.succ === 'OK') {
                        $('#structuretree').jstree('refresh');
                        modal.hide();
                    } else {
                        pbtoast('error', d.errortext || 'Unbekannter Fehler');
                        modal.hide();
                    }
                }).fail(function () {
            pbtoast('error', 'Problem beim Update!');
            modal.hide();
        });
    };


    $(document).on("click", "#edit-structure-group, #edit-structure-page", function () {
        var el = $(this);
        //id="edit-structure-page" data-strid="{STRUCTURE_ID}" data-src="{DATASOURCE}" data-value="{PAGES}"
        var sr = {
            'fieldid': el.attr('id'),
            'value': el.data('value'),

            'strid': el.data('strid'),
            'entry_type': (el.attr('id') === 'edit-structure-group') ? 'Gruppe(n)' : 'Seite(n)'

        };
        var form_html = pbTpl.fillTpl(form_templates['sg-structure-val'], sr);
        pb_show_modal('Gruppen- oder Seiteneintrag in Strukturelement ändern', form_html, 1200, update_sg_struct_entry, 'Aktualisieren');

    });



    $(document).on("submit", "#f-edit-fields", function (event) {
        //update_field_entries();
        event.preventDefault();
    });

    $(document).on("click", "#pageupdate", function () {
        generateCurrentPage();
    });

    function generateCurrentPage() {
        const id = $('#structuretree').data('pid');
        //Noch keine Daten ausgewählt
        if (!id) {
            return;
        }

        var param = {pageid: id,
            conf_name: conf_name};
        $.post(subroot + '/PbClasses/PG/Ajax/MGenerateSinglePage.php', param, "json")
                .done(function (d) {
                    if (d.succ !== 'OK') {
                        pbtoast('error', d.errortext || 'Unbekannter Fehler bei Neugenerierung der Seite.');
                    } else {
                        pbtoast('success', 'Seite wurde neu generiert');
                    }
                }).fail(function () {
            pbtoast('error', 'Problem beim Update!');
        });
    }

    //==================================================================================

    var delete_structure_element = function (modal, param_obj) {
        var params = {
            conf_name: conf_name,
            id_string: param_obj.node.id,
            page_id: param_obj.pageid,
            gr_id: param_obj.grid};

        $.post(subroot + '/PbClasses/PG/Ajax/MDeleteStructureElement.php', params, "json")
                .done(function (d) {
                    if (d.succ !== 'OK') {
                        pbtoast('error', d.errortext || 'unbekannter Fehler bei Neugenerierung der Seite');
                    } else {
                        param_obj.tree.delete_node(param_obj.node);
                        modal.hide();
                    }
                }).fail(function () {
            modal.hide();
            pbtoast('error', 'Problem beim Löschen!');
        });
    };

    function pagegenerator_structure() {
        var modul = $('#structuretree').data('mod');
        var page_id = $('#structuretree').data('pid');
        var gr_id = $('#structuretree').data('grid');
        $("#structuretree").jstree({
            "core": {
                "animation": 0,
                "multiple": false,
                'data': {
                    'url': asf + '&operation=get_node&modul=' + modul + '&gr_id=' + gr_id + '&page_id=' + page_id,

                    'data': function (node) {
                        return {'id': node.id};
                    }
                },
                'check_callback': true,
                'themes': {
                    'responsive': true,
                    'variant': 'large',
                    'dots': true
                }
            },
            "contextmenu": {
                items:
                        function (node) {
                            var tree = $("#structuretree").jstree(true);
                            //wird bei den Löschaktionen benötigt
                            var param_obj = {'tree': tree,
                                'node': node,
                                'pageid': page_id,
                                'grid': gr_id};

                            if (node.id.substr(0, 1) === 'm') {
                                return {// Could be a function that should return an object like this one
                                    "create": {
                                        "separator_before": true,
                                        "separator_after": true,
                                        "label": "Neu",
                                        "action": false,
                                        "submenu": {
                                            "create_module": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Modul",
                                                action: function (obj) {
                                                    get_structure_dialog(node.id, 'mod', page_id, gr_id);
                                                }

                                            },
                                            "create_include": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Include",
                                                action: function (obj) {
                                                    get_structure_dialog(node.id, 'include', page_id, gr_id);
                                                }
                                            },
                                            "create_text": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Einträge",
                                                action: function (obj) {
                                                    //this.create(obj);
                                                    get_structure_dialog(node.id, 'entries', page_id, gr_id);
                                                }
                                            },
                                            "create_img": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Bild",
                                                action: function (obj) {
                                                    get_img_dialog(node.id, page_id, gr_id);
                                                }
                                            },
                                            "create_navi": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Navigation",
                                                action: function (obj) {
                                                    get_structure_dialog(node.id, 'navi', page_id, gr_id);
                                                }
                                            },
                                            "create_class": {
                                                "separator_before": true,
                                                "separator_after": true,
                                                "label": "Projekt-Klasse",
                                                action: function (obj) {
                                                    get_structure_dialog(node.id, 'project_class', page_id, gr_id);
                                                }
                                            }
                                        }
                                    },
                                    "Remove": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Entfernen",
                                        "action": function (obj) {
                                            pb_show_modal('Löschen bestätigen', 'Möchten Sie das Element wirklich löschen? ' + node.id, 800, delete_structure_element, 'Löschen', param_obj);
                                        }
                                    }
                                };
                            } else {
                                return {
                                    "Remove": {
                                        "separator_before": false,
                                        "separator_after": false,
                                        "label": "Entfernen",
                                        "action": function (obj) {
                                            pb_show_modal('Löschen bestätigen', 'Möchten Sie das Element wirklich löschen? ' + node.id, 800, delete_structure_element, 'Löschen', param_obj);
                                        }
                                    }
                                };
                            }
                            return false;

                        }
            },
            "plugins": ['state', 'contextmenu', 'types'],
            'types': {
                'default': {
                    'icon': structTreeIcons['default']  // 'fas fa-folder'
                },
                'module-close': {
                    'icon': structTreeIcons['module-close']
                },
                'module-open': {
                    'icon': structTreeIcons['module-open']// 'fas fa-folder-open blue'
                },
                'entries': {
                    'icon': structTreeIcons['entries']//'fas fa-pencil-alt'
                },
                'navi': {
                    'icon': structTreeIcons['navi']//'fas fa-bars'
                },
                'include': {
                    'icon': structTreeIcons['include'] //'fas fa-arrow-circle-left'
                },
                'project_func': {
                    'icon': structTreeIcons['project_func']//'fas fa-cog'
                },
                'project_class': {
                    'icon': structTreeIcons['project_class']//'fas fa-cogs'
                },
                'img': {
                    'icon': structTreeIcons['img']//'fas fa-image'
                }

            }

        }).on('changed.jstree', function (e, data) {

            if (data && data.selected && data.selected.length) {
                $.get(asf + '&operation=get_content&page_id=' + page_id + '&id=' + data.selected.join(':'), function (d) {
                    $('#overview-right').html(d.overviewright);
                });
            }
        }).on('after_close.jstree', function (e, data) {
            data.instance.set_type(data.node, 'module-close');
        }).on('after_open.jstree', function (e, data) {
            data.instance.set_type(data.node, 'module-open');
        }).on('select_node.jstree', function (e, data) {
            data.instance.open_node(data.node);
        });
    }


    //Wird nach Klick des Aktualisieren-Buttons der beiden folgenden Modals ausgeführt
    var update_structure = function (modal) {
        var param = $('#f-edit-structure').serialize() + '&conf_name=' + conf_name;
        $.post(subroot + "/PbClasses/PG/Ajax/MAddChild.php", param, "json").done(function (d) {
            if (d.succ === 'OK') {
                pbtoast('success', 'Eintrag erfolgreich');

                var obj = $('#structuretree').jstree(true).get_selected(true);
                var id = $('#structuretree').jstree(true).get_selected()[0];
                $('#structuretree').jstree("refresh_node", id);
                if (!$('#structuretree').jstree("is_open", id)) {
                    $('#structuretree').jstree(true).activate_node(obj);
                } else {
                    $(id).click();
                }
                modal.hide();
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
                modal.hide();
            }
        }).fail(function () {
            pbtoast('error', 'Technisches Problem beim Update');
            modal.hide();
        });
    };

    $(document).on("click", ".structure_image_element", function () {
        //Gebraucht wird das Elternelement, des Image-Nodes!
        var id = $('#structuretree').jstree(true).get_selected()[0];
        var parent_id = $('#structuretree').jstree(true).get_parent(id);
        // var modul = $('#structuretree').data('mod');
        var page_id = $('#structuretree').data('pid');
        var gr_id = $('#structuretree').data('grid');

        // console.log(parent_id + ' : ' + modul + ' : ' + page_id + ' : ' + gr_id  )
        get_img_dialog(parent_id, page_id, gr_id);

    });



    function get_img_dialog(id, page_id, gr_id) {
        // console.log(id + ' - ' + page_id + ' ' + gr_id);


        $.post(subroot + '/PbClasses/PG/Ajax/MGetStructureImgSelection.php', {
            'conf_name': conf_name,
            id: id,
            pageid: page_id,
            grid: gr_id
        }, "json").done(function (d) {
            if (d.succ === 'OK') {

                var sr = {
                    'ajax_content': d.html
                };
                var form_html = pbTpl.fillTpl(form_templates['edit-structure'], sr);
                pb_show_modal('Felder bearbeiten', form_html, 800, update_structure, 'Aktualisieren');
            } else {
                pbtoast('error', 'Fehler beim Aufruf von GetStructureInputfields() - 1' + d.errortext);
            }
        }).fail(function () {
            pbtoast('error', 'Fehler beim Aufruf von GetStructureInputfields() - 2');

        });
    }

    function get_structure_dialog(id, type, page_id, gr_id) {
        $.post(subroot + '/PbClasses/PG/Ajax/MGetStructureInputfields.php', {
            id: id,
            conf_name: conf_name,
            type: type,
            pageid: page_id,
            grid: gr_id}, "json").done(function (d) {
            if (d.succ === 'OK') {
                pb_show_modal('Struktur_bearbeiten', d.html, 800, update_structure, 'Aktualisieren');
            } else {
                pbtoast('error', 'Fehler beim Aufruf von GetStructureInputfields() - 1' + d.errortext);
            }
        }).fail(function () {
            pbtoast('error', 'Fehler beim Aufruf von GetStructureInputfields() - 2');
        });
    }

    $(document).on("click", "#generate-website", function () {
        $.post(ajaxfiles.generator, {
            conf_name: conf_name
        }, "json").done(function (d) {
            if (d.succ === 'OK') {
                pbtoast('success', 'Website wurde generiert.');
            } else {
                var err = d.errortext || 'unbekannter Fehler';
                pbtoast('error', 'Fehler bei der Generierung: ' + err);
            }
        }).fail(function () {
            pbtoast('error', 'Fehler eim Aufruf der Website-Generierung');
        });
    });

    $(document).on("click", ".pb-switch-btn", function (e) {
        e.preventDefault();
        var row_id = $('#f-overview-head').data('id');
        var value = $(this).val();
        var fname = $(this).data('fname');
        var params = {id: row_id, value: value, fname: fname, conf_name: conf_name};
        $.post(ajaxfiles.switchupd, params, "json").done(function (d) {
            if (d.succ === 'OK') {
                if (fname === 'protected') {
                    change_protected_button(d.updated_value);
                } else {
                    get_doctools(row_id, fname);
                }
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler - Daten werden neu geladen');
                get_doctools(row_id, fname);
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
            get_doctools(row_id, fname);
        });
    });

    function get_doctools(id, fname) {
        $.post(ajaxfiles['doc_tools'], {id: id, conf_name: conf_name}, "json").done(function (d) {
            if (d.succ === 'OK') {
                if (d.node_icon) {
                    change_icon(id, d.node_icon);
                    change_button(fname, d.node_icon);
                }
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
        });
    }

    //Icon-Type wird nach einem Select des Münüpunkts neu gesetzt, sofern etwas geändert wurde
    function change_icon(id, ictype) {
        var tree = $("#" + pb_jstree_conf.tree_name).jstree(true);
        tree.set_type(tree.get_node(pb_jstree_conf.id_prefix + id), ictype);
    }

    function change_button(fname, ictype) {
        var classname = get_button_classname(ictype, fname);
        $('button.switch-' + fname).find('span').removeClass().addClass(classname);
    }

    function get_button_classname(ictype, fname) {
        if (fname === 'hide') {
            if (ictype === 'dir-unlocked' || ictype === 'file-unlocked') {
                $('button.switch-' + fname).removeClass('btn-danger').addClass('btn-primary');
                return  generalIcons.visual_yes; //'fas fa-eye';
            }
            $('button.switch-' + fname).removeClass('btn-primary').addClass('btn-danger');
            return generalIcons.visual_no; //'fas fa-eye-slash';
        }
        if (ictype === 'dir-unlocked' || ictype === 'dir-locked') {
            $('button.switch-' + fname).removeClass('btn-primary').addClass('btn-info');
            return  generalIcons.folder_open;//'fas fa-folder-open';
        }
        $('button.switch-' + fname).removeClass('btn-info').addClass('btn-primary');
        return generalIcons.file; // 'fas fa-file-alt';

    }

    function change_protected_button(upd_val) {
        if (parseInt(upd_val)) {
            $('button.switch-protected').removeClass('btn-success').addClass('btn-danger');
            $('button.switch-protected').find('span, i').removeClass().addClass(pageTreeIcons.protected);
            return;
        }

        $('button.switch-protected').removeClass('btn-danger').addClass('btn-success');
        $('button.switch-protected').find('span, i').removeClass().addClass(pageTreeIcons.unprotected);
    }

    $(document).on("click", "#inline_image_button", function (e) {
        var input_el = $('#entry-editor-form-single-entry');

        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            input_el.data('docpositon', position);
            get_inline_img_dialog();

        } else {
            pbtoast('error', 'Technischer Fehler');
        }
    });

    $(document).on("click", "#inline_code_button", function (e) {
        e.preventDefault();
        //var input_el = $(this).closest('.pbgroup-inline-content').find('.pb-inline-content');
        var input_el = $('#entry-editor-form-single-entry');
        input_el.focus();
        if (typeof input_el[0].selectionStart !== 'undefined') {
            var position = input_el[0].selectionStart;
            //Position im Modal speichern
            $("#codeModal").data('docpositon', position);
            $("#codeModal").data('input_el', input_el); //TEST ganzes Objekt speichern

            // insert(input_el, position, '!!!!XXXX!!!!');
            $("#codeModal").modal("show");
            $('.modal-backdrop').last().css('z-index', 9999);
            editor2.setValue('', -1); // moves cursor to the start
        } else {
            pbtoast('error', 'Technisher Fehler');
        }
    });

    //Beim Umschalten des Codetyps soll auch der Ace-Editor die Sprache wechseln
    $(document).on("click", "input[name=pbmodal-codetype]", function (e) {
        var codetype = $(this).val().split('_')[1];
        var ctype = (codetype === 'pbtpl') ? 'smarty' : codetype;
        editor2.session.setMode("ace/mode/" + ctype);
    });


    var get_inline_id = function (modal) {
        var param = $('#f-inline-structure').serialize() + '&conf_name=' + conf_name;
        $.post(subroot + "/PbClasses/PG/Ajax/MInlineDialogInputfieldsEntry.php", param, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Inline-ID einfügen
                var textarea_el = $('#entry-editor-form-single-entry');
                insert(textarea_el, textarea_el.data('docpositon'), d.inline_id);
                modal.hide();
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler');
                modal.hide();
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
            modal.hide();
        });
    };



    function get_inline_img_dialog() {
        $.post(subroot + '/PbClasses/PG/Ajax/MGetInlineImgForm.php', {
            'conf_name': conf_name
        }, "json").done(function (d) {
            if (d.succ === 'OK') {

                pb_show_modal('Felder bearbeiten', d.form_html, 1600, get_inline_id, 'Aktualisieren');
                $('.modal').last().css('z-index', 10000);
                $('.modal-backdrop').last().css('z-index', 9999);
            } else {
                pbtoast('error', 'Fehler beim Aufruf von MGetInlineImgForm - 1' + d.errortext);
            }
        }).fail(function () {
            pbtoast('error', 'Fehler beim Aufruf von MGetInlineImgForm() - 2');

        });
    }


    $(document).on("change", "#pbpg-inline-image-tpl-selection", function (e) {
        var tpl_id = $(this).val();

        $.post(subroot + '/PbClasses/PG/Ajax/MGetInlineDialogInputfields.php', {
            'conf_name': conf_name,
            'tpl_id': tpl_id
        }, "json").done(function (d) {
            if (d.succ === 'OK') {
                $('#pbpg-inline-input-fields').html(d.form_html);
            } else {
                pbtoast('error', 'Fehler beim Aufruf von MGetInlineDialogInputfields - 1' + d.errortext);
            }
        }).fail(function () {
            pbtoast('error', 'Fehler beim Aufruf von MGetInlineDialogInputfields - 2');

        });
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
        //el.focus();
    }

    $(document).on("click", "#pbbtn-codeentry", function (e) {
        e.preventDefault();
        $(this).prop('disabled', true);

        var el = $(this);
        //var src_file = $(this).data('src_file');
        var src_code = editor2.getValue();

        var params = {
            src_code: src_code,
            pbcnf: pb_jstree_conf.pbcnf,
            'conf_name': conf_name,
            code_type: $("input[name=pbmodal-codetype]").val()
        };

        //Modal-Daten vorher abfragen, ehe das Modal geschlossen wird
        var data_input_el = $("#codeModal").data('input_el');
        var data_docposition = $("#codeModal").data('docpositon');


        $.post(ajaxfiles.code_entry, params, "json").done(function (d) {
            if (d.succ === 'OK') {

                //Doce einfügen
                insert(data_input_el, data_docposition, d.inline_id);
                $("#codeModal").modal("hide");
            } else {
                pbtoast('error', d.errortext || 'Unbekannter Fehler. Daten können nicht aktualisiert werden.');
            }
        }).fail(function () {
            pbtoast('error', 'Technischer Fehler');
        }).always(function () {
            el.prop('disabled', false);
        });
    });
});

