import "../3rd/node_modules/bootstrap-show-modal/src/ShowModal.js";

/* Version 2026-09-16 - I18n support
 * 
 * 
 * Version 2026-01-20 Buttonfreigabe im Footer nach "Sie haben nichts geändert"
 * 
 * 
 * Version 2026-01-07
 * Korrektur: Fehler, wenn Upd-ID == 0 ist, wurde behoben.
 * 
 * 
 * Version 2025-06-05 - 
 *  $(document).on("table_load_manually", Prüfen auf Existenz   
 *  
 *  // Confirm für Schwitchvalue möglich, nicht nur für Dojob
 *  if ($(this).data('switchconfirm')) {
 * 
 * Version 2025-02-27
 *    //if (typeof tableConf[table_id].transform_values.refresh !== 'undefined' && (tableConf[table_id].transform_values.refresh[param.fieldname] || tableConf[table_id].transform_values.refresh === true)) {
 nach Erweiterung im Allocator für config-Parameter 'modify_upd_arr'. Das sich Veränderungen auf mehrere Felder beziehen können, ist ein
 genereller Refresh sinnvoll
 für sg_val und switch_val. 
 *    Versioe 2025-02-11 - Merged Version
 * 
 *    Versioe 2024-11-01 - Merged Version
 *    Korrektur refresh_rows soll nicht immer an den Anfang springen.
 *    @todo Aktualle Einstellung: Nach insert einer Zeile springt die Tabelle zum Anfang. Das ist sinnvoll, wenn absteigend nach autocrement-ID
 *     sortiert wird.
 *    Dojob-Funktion übernommen - Ausführen von Buttun-Aktionen aus der Tabelle ohne zwingenden Einfluss auf die Tabelle selbst.
 *     
 * 
 * Version 2023-08-02 - Merged-Version
 * Version 2022-06-09 - refresh-Berücksichtigung (Konfiguration)  auch nach switch-Update
 * Version 2022-03-17 function modal_alert(message) verbessert
 * 
 *2021-03-23 - Filter für Datumseingabe (Reaktion bei change, wenn gültiges Datum eingeben wurde)
 * 
 * 2020-12-31 Highlight-Sorting-Update. Merge.
 * 
 * 2020-12-19
 * Filterkonfiguration 'active_on_start' clientseitig aktivieren, ohne Daten neu zu laden.
 * 
 * 2020-11-02
 * refresh nach Update über Konfiguration einstellbar, bei kompexeren Tabellendaten, die andere Änderungen nach sich ziehen.
 *  
 * 2020-08-26
 * rowmod-Klasse bei switch-Werten modifiziert
 * 
 * 2020-08-10
 *
 * - 2020-07-24
 * Problem bei Limit und Seitenzählung in verschachtelten Autoload-Tabellen behoben.
 * Direktes spcichern des neuen Werts in  
 * tableConf[el.data('tabid')].rowlimit
 * statt Suche im Html bei changes
 * 
 * - 2020-05-02
 * 
 * - 2020-04-22
 * Erlaubt nachladen einzelner Tabellen per Custom-Event in dynamischen Elementen, z.B. Modals
 * 
 * - 2019-02-13 - Für Bootstrap 4
 * 
 *  2019-02-01 - Null integriert
 * 
 * 2016-05-03 ------------------- Peter Bieling
 ´base functions for table engine.
 */

$(document).ready(function () {
    const defaultIcons = {
        "toggleOn": "bi-toggle-on",
        "toggleOff": "bi-toggle-off",
        "tableSort": "bi-chevron-contract",
        "tableSortUp": "bi-sort-up",
        "tableSortDown": "bi-sort-up"
    };
    // 'pbtable_iconset' => \PbClasses\Conf::get('pbtable_icons')])),
    const iconSet = $('body').data('pbconfdata').pbtable_iconset || defaultIcons;

    const  toggle_on_class = iconSet.toggleOn;// 'bi-toggle-on';
    const  toggle_off_class = iconSet.toggleOff;

    var pbTpl = {
        fillTpl: function (tpl, srObj) {
            $.each(srObj, function (key, value) {
                var regex = new RegExp('\{' + key.toUpperCase() + '\}', "g");
                tpl = tpl.replace(regex, value);
            });
            return tpl;
        }
    };

//=========================================================
//http://stackoverflow.com/questions/2644299/jquery-removeclass-wildcard    
    $.fn.removeClassStartingWith = function (filter) {
        $(this).removeClass(function (index, className) {
            return (className.match(new RegExp("\\S*" + filter + "\\S*", 'g')) || []).join(' ');
        });
        return this;
    };
    //$(".myClass").removeClassStartingWith('color');
//=======================================================================

    var tableConf = {};
    var paginationConf = {show: 5};
    var formtemplates = {'base': null};
    var fieldlabels = {}; //Alias-Names aus php-table-Konfiguration (Inhalt von table_def
    var modal_input_modifyer = {};

    var subroot = $('body').data('subroot') || '';

    /*
     * 
     * @type object 
     */
    var tableSorter = {
        sortorder: {}, //Speichert (für jede Tabelle) ein Sortierarray mit key (Tabllenname , vale = 0 oder 1) 1 = DESC 
        set: function (el) {
            var fieldname = el.data('fn');
            var tableId = el.closest('.autoload-table').data('tabid');

            var sortArr = this.sortorder[tableId];
            var findex = -1; //not found
            for (var i = 0; i < sortArr.length; i++) {
                if (fieldname in sortArr[i]) {
                    findex = i;
                    break;
                }
            }
            if (findex === -1) {
                var tmpObj = {};
                tmpObj[fieldname] = 0;
                sortArr.push(tmpObj);

            } else {
                if (sortArr[findex][fieldname] === 0) {
                    sortArr[findex][fieldname] = 1;
                } else if (sortArr[findex][fieldname] === 1) {
                    //remove:
                    sortArr.splice(findex, 1);
                }
            }
            this.sortorder[tableId] = sortArr;
            return JSON.stringify(sortArr);
        }
    };

    /*
     * Variante ohne Tabellen
     * @param {obj} el Tabellenelement
     * @returns {undefined}
     * Für den Fall, dass mehrer Tabellen auf einer Seite sind muss man vom Tabellenelement ausgehen
     */


    function highlight_sorting(el) {
        if (!el.find('.pbtable-sort-container.sortable').length) {
            return highlight_sorting_classic(el);
        }

        var sortcontainer = el.find('.pbtable-sort-container.sortable');
        // sortcontainer.find('i').removeClass('bi-sort-up bi-sort-down');
        sortcontainer.find('i, span').removeClass(iconSet.tableSortUp + ' ' + iconSet.tableSortDown);
        sortcontainer.find('i, span').addClass(iconSet.tableSort);
        var table_id = el.data('tabid');
        var sortArr = tableSorter.sortorder[table_id];
        sortcontainer.removeClass("columnsorted-asc columnsorted-desc");
        for (var i = 0; i < sortArr.length; i++) {
            $.each(sortArr[i], function (fieldname, value) {
                var classmodifyer = (value) ? 'desc' : 'asc';
                var cl = 'columnsorted-' + classmodifyer;
                var filter = el.find('.pbtable-sort-container.sortable[data-fn="' + fieldname + '"]');
                var icon = (classmodifyer === 'desc') ? iconSet.tableSortDown : iconSet.tableSortUp;
                filter.addClass(cl).find('i').removeClass(iconSet.tableSort).addClass(icon);
            });
        }
    }

    function highlight_sorting_classic(el) {
        var header_row = el.find('thead tr');
        var table_id = el.data('tabid');
        var sortArr = tableSorter.sortorder[table_id];

        header_row.find('th.sortable').removeClass("columnsorted-asc columnsorted-desc");
        header_row.find(".{iconSet.tableSortUp} .{iconSet.tableSortDown}").removeClass("{iconSet.tableSortUp} {iconSet.tableSortDown}").addClass(iconSet.tableSort);
        for (var i = 0; i < sortArr.length; i++) {
            $.each(sortArr[i], function (fieldname, value) {
                var classmodifyer = (value) ? 'desc' : 'asc';
                var cl = 'columnsorted-' + classmodifyer;
                var filter = 'th[data-fn="' + fieldname + '"]';
                var icon = (classmodifyer === 'desc') ? iconSet.tableSortDown : iconSet.tableSortUp;
                header_row.find(filter).addClass(cl).find('i').removeClass(iconSet.tableSort).addClass(icon);
            });
        }
    }

    var registered_filters = {};

    //'table_def => array( 'display_name' => array('Beschr' => 'BESCHREIBUNG',
    //                       'ID'     => 'LfdNr'),
    var allowed_insert_fields = {};
    var allowed_update_fields = {};

    //Dialogboxform nicht mit Enter abschicken!
    //Andere Formulare können mit nosubm geschützt werden
    $(document).on("submit", ".nosubm, .modal-dialog form, .form-inline", function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    });

    //Basis-Formtemplates. Gilt für mehrere Tabellen!
    $.post(subroot + '/PbClasses/Tpl/Ajax/JsTemplate.php', {jstemplate: 'table_forms'}, "json").done(function (d) {
        if (d.succ === 'OK') {
            formtemplates.base = d.jstpl;
        } else {
            modal_alert(d.errortext || 'Unbekannter Template-Fehler');
        }
    }).fail(function () {
        alert('Problem beim Anfordern der Tabelle');
    });


    //Tabellenstruktur mit DESCRIBE
    var table_structures = {};
    var ajax_url = subroot + '/PbClasses/Table/Ajax/Allocator.php';

    var dialogforms = {
        structInfo: null,
        table_id: null,
        field_label: null,
        'getFormField': function (fieldname, entry, structInfo, table_id, is_update) {
            if (!is_update) {
                entry = get_preset_value(table_id, fieldname, entry);
            }

            this.structInfo = structInfo;
            this.table_id = table_id;
            //If a different form label is defined in the php-table-config take this, else take the fieldname of the database table.
            this.field_label = (fieldlabels[this.table_id][fieldname]) ? fieldlabels[this.table_id][fieldname] : fieldname;
            this.prefix = is_update ? 'upd_' : 'ins_';
            //Wenn der Eintrag  null ist, wird er auf '' gesetzt und die Info zurück gegeben, dass er "eigentlich" null ist.
            //Das Element wird dann nachbearbeitet.
            if (entry === null) {
                entry = '';
                this.entryisnull = true;
            } else {
                this.entryisnull = false;
            }

            if (typeof entry === 'string') {
                //Msskieren, sonst wird der Eintrag hinter dem Anführungszeichen abgeschnitten
                entry = entry.toString().replace(/\"/g, '&quot;');
            }

            //Template vorbelegen, falls eigenes Template existiert
            this.template = (formtemplates[table_id][this.prefix + fieldname]) ? formtemplates[table_id][this.prefix + fieldname] : null;
            const baseTypes = ['tinyint', 'smallint', 'int', 'bigint'];
            const [base, unsigned] = structInfo.type.split(' ');
            //Mysql has 'int unsiged' and MariaDB only 'int'. Both have structInfo.unsigned (true or false)
            if (baseTypes.includes(base)) {
                return {
                    html: structInfo.unsigned === true
                            ? this.getIntUnsigned(fieldname, entry)
                            : this.getInt(fieldname, entry),
                    width: this.getWidth(structInfo.lgth),
                    entryisnull: this.entryisnull
                };
            }

            if (structInfo.type === 'char' || structInfo.type === 'varchar') {

                return {'html': this.getVarchar(fieldname, entry),
                    'width': this.getWidth(structInfo.lgth),
                    'entryisnull': this.entryisnull};
            }
            if (structInfo.type === 'datetime') {

                return {'html': this.getDateTime(fieldname, entry),
                    'width': 's',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'date') {
                return {'html': this.getDate(fieldname, entry),
                    'width': 's',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'time') {
                return {'html': this.getTime(fieldname, entry),
                    'width': 's',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'tinytext') { //255 Zeichen
                return {'html': this.getText(fieldname, entry, 255),
                    'width': 's',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'text') { //255 Zeichen
                return {'html': this.getText(fieldname, entry, 65535),
                    'width': 'l',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'mediumtext' || structInfo.type === 'longtext') { //255 Zeichen
                return {'html': this.getText(fieldname, entry, ''),
                    'width': 'xl',
                    'entryisnull': this.entryisnull};
            }

            if (structInfo.type === 'enum') { //255 Zeichen
                return {'html': this.getEnum(fieldname, entry, ''),
                    'width': 's',
                    'entryisnull': this.entryisnull};
            }
            return {'html': this.getVarchar(fieldname, entry),
                'width': 'm',
                'entryisnull': this.entryisnull};
        },
        'getEnum': function (fieldname, entry) {
            var opt_arr = this.structInfo.lgth.split(',');
            var opt_buffer = '';

            $.each(opt_arr, function (index, value) {
                var val = value.trim().slice(1, -1);
                var optsere = {'field_option': val,
                    'field_label': this.field_label,
                    'selected': (val === entry) ? ' selected' : ''}; //
                opt_buffer = opt_buffer + pbTpl.fillTpl(formtemplates.base['option'], optsere);
            });

            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_label': this.field_label,
                'options': opt_buffer};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            //alert(this.template);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_enum'], sere);
        },
        'getInt': function (fieldname, entry) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'type': 'number',
                'field_label': this.field_label,
                'field_maxlength': this.structInfo.lgth};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_int'], sere);
        },

        'getIntUnsigned': function (fieldname, entry) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'type': 'number',
                'field_label': this.field_label,
                'field_maxlength': this.structInfo.lgth};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_int_unsigned'] || formtemplates.base[this.prefix + 'input_int'], sere);
        },
        'getVarchar': function (fieldname, entry) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_label': this.field_label,
                'field_maxlength': this.structInfo.lgth};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);


            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_standard'], sere);
        },

        'getDate': function (fieldname, entry) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_label': this.field_label,
                'field_maxlength': 10};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_date'], sere);
        },
        'getTime': function (fieldname, entry) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_label': this.field_label,
                'field_maxlength': 8};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_time'], sere);
        },

        'getDateTime': function (fieldname, entry) {
            var entry_arr = entry.split(' ');
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_value_partdate': entry_arr[0],
                'field_value_parttime': entry_arr[1].substr(0, 5),
                'field_label': this.field_label,
                'field_maxlength': 19}; //0000-00-00 00:00:00
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_datetime'], sere);
        },

        'getText': function (fieldname, entry, lgth) {
            var sere = {'field_name': fieldname,
                'field_value': entry,
                'field_label': this.field_label,
                'field_maxlength': lgth};
            add_inp_modifyer(sere, this.table_id, fieldname, this.field_label);
            return pbTpl.fillTpl(this.template || formtemplates.base[this.prefix + 'input_text'], sere);
        },
        //definiert die Dialogweite in Abhängikeit von der Feldgröße aus DESCRIBE table.
        'getWidth': function (length) {
            var lgth = parseInt(length);
            if (!lgth) {
                return 's';
            }

            if (lgth < 10) {
                return 'xs';
            }
            if (lgth < 100) {
                return 's';
            }
            if (lgth < 300) {
                return 'm';
            }
            if (lgth < 800) {
                return 'l';
            }
            return 'xl';
        }
    };

    /*
     * 
     * @param obj sere   Key-Value-Paare für Platzhalternamen und Inhalt
     * @param string table_id
     * @param string fieldname    Tabellen-Attribut
     * @returns {undefined}
     */
    function add_inp_modifyer(sere, table_id, fieldname, field_label) {
        sere.attributes = (modal_input_modifyer[table_id].attributes && modal_input_modifyer[table_id].attributes[fieldname]) ? ' ' + modal_input_modifyer[table_id].attributes[fieldname] : '';
        sere.classes = (modal_input_modifyer[table_id].classes && modal_input_modifyer[table_id].classes[fieldname]) ? ' ' + modal_input_modifyer[table_id].classes[fieldname] : '';
        sere.field_label = (modal_input_modifyer[table_id].label && modal_input_modifyer[table_id].label[fieldname]) ? ' ' + modal_input_modifyer[table_id].label[fieldname] : field_label;

        //Templates könenn einen Plathalter {TYPE} haben, der standardmäßig mit 'text' gefüllt wird, wenn nichts anderes angegebe4n wird.
        let defaultValue = (sere.type) ? sere.type : 'text';

        sere.type = (modal_input_modifyer[table_id].type && modal_input_modifyer[table_id].type[fieldname]) ? modal_input_modifyer[table_id].type[fieldname] : defaultValue;
    }

    /*
     * @param string table_id
     * @param string fieldname
     * @param mixed entry
     * @returns {modal_input_modifyer.preset_values} - Falls Vorgabe eingetzagen ist, wird diese 
     *                                                 Default-Werte aus der Tabellendefinition!
     */
    function get_preset_value(table_id, fieldname, entry) {
        if (!modal_input_modifyer[table_id].preset_values) {
            return entry;
        }
        if (typeof modal_input_modifyer[table_id].preset_values[fieldname] !== 'undefined') {
            return modal_input_modifyer[table_id].preset_values[fieldname];
        }
        return entry;
    }

    function show_dialog(field_el, formObj, table_id) {
        var is_row = (field_el.hasClass('row-identifier')) ? true : false;
        var message = '<form role="form" class="nosubm needs-validation"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  novalidate>' + formObj.html + '</form>';
        var width = formObj.width;

        var fnc = (is_row) ? updateRow : updateFieldValue;
        
        
        const langMap = tableConf[table_id].language_map;

        var paramObj = {'table_id': table_id,
            'field_el': field_el,
            'lang_map' : langMap};

        //Set the label for the submit and head
        
        let head;


        if (is_row) {
            head = langMap.update_row || 'Daten ändern';
            
        } else {
            head = langMap.update_entry || 'Eintrag ändern';
        }
        const submitLabel = langMap.update || 'Aktualisieren';

        //function pb_show_modal(title, content, width, fnc, button_label, param_obj) {
        pb_show_modal(head, message, width, fnc, submitLabel, paramObj);

    }

    // function updateFieldValue(modal, table_id, field_el) {
    function updateFieldValue(modal, paramObj) {
        const table_id = paramObj.table_id;
        const field_el = paramObj.field_el;
        const langMap = tableConf[table_id].language_map;
        $('.input-validation-error').remove();
        if (!modal_validation(modal)) {
            return;
        }

        var fieldname = field_el.data("fn");
        var el = $('#' + fieldname);
        var old_val = (el.hasClass('pboldval-isnull')) ? null : $('#' + fieldname + '-oldvalue').html();
        var act_val = (el.hasClass('pbinp_nullable') && $('.pbchk-nullable[data-id=' + fieldname + ']').prop("checked")) ? null : el.val();
        el.prop('disabled', true);
        if (old_val === act_val) {
            
            modal_alert(langMap.nothing_changed || 'Sie haben nichts geändert.', 'short_error');
            el.prop('disabled', false);
            pbmodal_footerbuttonsEnabled(modal);
            return;
        }

        var row_el = field_el.closest('.row-identifier');
        var param = {
            tabid: table_id,
            cmd: 'upd_sg',
            fieldname: fieldname,
            upd_val: act_val,
            is_null: (act_val === null) ? 1 : 0,
            upd_id: $(field_el).closest('.row-identifier').find('.change-row').data('change-id')};

        if (param.upd_id === null || param.upd_id === undefined) {
            param.upd_id = $(field_el).data('change-id');
        }
        //2025-02-14 //für eigene Felder mit "chg" - Attribut ohne change-Button
        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Änderungs-Event ausgeben:
                $(document).trigger("pbtable_table_modified", {
                    tabid: table_id,
                    cmd: 'upd_sg'});
                //Wenn Update-Filter (z.B. Passwwort) angewendet werden wird der tatsächliche Eintragswert gebraucht.
                //Daher nicht die lokale Eingabe übernehmen sondern rückgabe vom Server verwenden.

                if (d.update_arr[param.fieldname] === null) {
                    field_el.addClass('pbval-isnull');
                    field_el.html('');
                } else {
                    field_el.removeClass('pbval-isnull');

                    var entry = null;
                    //Bei zu komplexen Konstruktionen müssen die Tabellenreihen neu geladen werden:
                    if (typeof tableConf[table_id].transform_values.refresh !== 'undefined' && tableConf[table_id].transform_values.refresh[param.fieldname]) {
                        modal.hide();
                        refresh_rows(field_el.closest('.autoload-table'), 0);
                        return;
                    } else if (typeof tableConf[table_id].transform_values.changedateformat !== 'undefined' && tableConf[table_id].transform_values.changedateformat[param.fieldname]) {
                        entry = sql2gdate(d.update_arr[param.fieldname]);
                        field_el.data('rlentry', d.update_arr[param.fieldname]);
                    } else if (typeof tableConf[table_id].transform_values.addunit !== 'undefined' && tableConf[table_id].transform_values.addunit[param.fieldname]) {
                        entry = d.update_arr[param.fieldname] + tableConf[table_id].transform_values.addunit[param.fieldname];
                        field_el.data('rlentry', d.update_arr[param.fieldname]);
                    } else {
                        entry = d.update_arr[param.fieldname];
                        //Falls vorhanden wird das Feld aktualisiert.
                        field_el.data('rlentry', d.update_arr[param.fieldname]);
                    }
                    //Wenn ein Zielelement gefunden wird, den Updatewert dort einfügen
                    if (field_el.find('.pbtbl-upd-target').length) {
                        field_el.find('.pbtbl-upd-target').html(entry);
                    } else {
                        field_el.html(entry);
                    }
                }

                if (field_el.hasClass('modify')) {
                    //für CSS, daher Attribut ändern!
                    field_el.attr('data-modval', d.update_arr[param.fieldname]);
                }
                if (d.rowmarker) {
                    mark_row(row_el, d.rowmarker); //Markierungsclasse in row setzen oder entfernen
                }

                field_el.addClass('highlight-updated-row');
                setTimeout(function () {
                    field_el.removeClass('highlight-updated-row');
                }, 2000);
                modal.hide();
            } else if (d.validation_error) {
                $('#' + fieldname).prop('disabled', false);

                el.prop('disabled', false);
                pbmodal_footerbuttonsEnabled(modal);
                $('#' + fieldname).val(param.upd_val).select().focus();
                var errmessage = $("<p>" + d.validation_error + "</p>").addClass('input-validation-error');

                $('#' + fieldname).select().focus();
                $('#' + fieldname).after(errmessage);

            } else {
                modal_alert(d.errortext || 'Unbekannter Fehler beim Update');
                modal.hide();
            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Update');
            modal.hide();
        });
    }


    function modal_validation(modal) {
        //var form_el = $('.modal-dialog').find('form.needs-validation');
        //Im eigenen Modal bleiben, sonst gibt es Probleme bei mehreren Modals.


        var form_el = $(modal.element).find('form.needs-validation');
        if (form_el[0].checkValidity() === false) {
            form_el.addClass('was-validated');
            modal_alert('Es sind fehlerhafte oder unvollständige Einträge vorhanden.', 'short_error');
            pbmodal_footerbuttonsEnabled(modal);
            return false;

        }


        form_el.removeClass('was-validated');
        return true;

    }




    /*
     Nach Updates werden mit dieser Funktion row-marker-Klassen gesetzt oder
     entfernt. Beispiel vom Server:
     [rowmarker] => Array
     (
     [rowmarker-ON_OFF] => 0
     )
     */
    function mark_row(row_el, upd_arr) {
        $.each(upd_arr, function (key, value) {
            if (value) {
                row_el.addClass(key);
            } else {
                row_el.removeClass(key);
            }
        });

    }
    //function updateRow(modal, table_id, row_el) {
    function updateRow(modal, paramObj) {
        const table_id = paramObj.table_id;
        const row_el = paramObj.field_el;
        var table_el = row_el.closest('.autoload-table');
        $('.input-validation-error').remove(); //Alte Fehlermeldungen entfernen
        if (!modal_validation(modal)) {
            return;
        }
        var curr_modal = $('div#' + $(modal).attr('id'));
        var changes = {};

        curr_modal.find('form .form-control').prop('disabled', true);
        curr_modal.find('form').find('input[name], select[name], textarea[name]').each(function () { //WICHTIG - Nur input-Felder mit name-Attribut berücksichtigen.
            var id = $(this).attr('id');

            var old_val = ($(this).hasClass('pboldval-isnull')) ? null : $('#' + id + '-oldvalue').html();
            var act_val = ($(this).hasClass('pbinp_nullable') && $('.pbchk-nullable[data-id=' + id + ']').prop("checked")) ? null : $(this).val();

            if (old_val !== act_val) {
                changes[id] = act_val;
            }

        });

        if (!Object.keys(changes).length) {
            modal_alert('Sie haben nichts geändert.', 'short_error');

            curr_modal.find('form .form-control').prop('disabled', false);
            curr_modal.find('form .isnull').prop('disabled', false);
            pbmodal_footerbuttonsEnabled(modal);
            return;
        }
        var param = {
            tabid: table_id,
            cmd: 'upd_row',
            field_arr: JSON.stringify(changes),
            upd_id: $(row_el).find('.change-row').data('change-id')

        };

        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Änderungs-Event ausgeben:
                $(document).trigger("pbtable_table_modified", {
                    tabid: table_id,
                    cmd: 'upd_row'});

                //Wenn ein Refreshwert angegeben ist, bei Reihenbearbeitung direkt aktualisieren.
                if (typeof tableConf[table_id].transform_values.refresh !== 'undefined') {
                    modal.hide();
                    // refresh_rows(row_el.closest('.autoload-table'), 0); ((Falsch! springt auf 0 zurück
                    refresh_rows(row_el.closest('.autoload-table'));
                    return;
                }

                $.each(changes, function (key, value) {
                    var field_el = row_el.find('.chg[data-fn="' + key + '"]');

                    if (!field_el.length) {
                        field_el = table_el.find("[data-change-id='" + param.upd_id + "'][data-fn='" + key + "'].chg");
                    }


                    //Wenn Update-Filter (z.B. Passwwort) angewendet werden wird der tatsächliche Eintragswert gebraucht.
                    //Daher nicht die lokale Eingabe übernehmen sondern rückgabe vom Server verwenden.
                    //Todo: gebraucht wird der neue Wert aus der Datenbank, für den Fall, dass Mysql die Werte anpasst, abschneidet usw.


                    if (d.update_arr[key] === null) {
                        field_el.addClass('pbval-isnull');
                        field_el.html('');
                    } else {
                        field_el.removeClass('pbval-isnull');
                        var entry = null;

                        //
                        if (typeof tableConf[table_id].transform_values.changedateformat !== 'undefined' && tableConf[table_id].transform_values.changedateformat[key]) {
                            entry = sql2gdate(d.update_arr[key]);
                            field_el.data('rlentry', d.update_arr[key]);
                        } else {
                            entry = d.update_arr[key];
                            //Falls vorhanden:
                            field_el.data('rlentry', d.update_arr[key]);
                        }
                        //field_el.html(entry);
                        //Wenn ein Zielelement gefunden wird, den Updatewert dort einfügen
                        if (field_el.find('.pbtbl-upd-target').length) {
                            field_el.find('.pbtbl-upd-target').html(entry);
                        } else {
                            field_el.html(entry);
                        }
                    }

                    //field_el.html(value);
                    field_el.addClass('highlight-updated-row');
                });

                if (d.rowmarker) {
                    mark_row(row_el, d.rowmarker); //Markierungsclasse in row setzen oder entfernen
                }

                setTimeout(function () {
                    table_el.find('.chg').removeClass('highlight-updated-row');
                }, 2000);
                modal.hide();
            } else if (d.validation_error) {
                curr_modal.find('form .form-control').prop('disabled', false);
                curr_modal.find('form .isnull').prop('disabled', false);
                pbmodal_footerbuttonsEnabled(modal);
                var errmessage = $("<p>" + d.validation_error + "</p>").addClass('input-validation-error');
                $('#' + d.validation_fieldname).select().focus().after(errmessage);
            } else {

                modal_alert(d.errortext || 'Unbekannter Fehler beim Update');
                modal.hide();

            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Update');
            modal.hide();
        });
    }

    function sql2gdate(date) {
        if (!date) {
            return '';
        }
        var dateArr = date.split('-');
        return dateArr[2] + '.' + dateArr[1] + '.' + dateArr[0];
    }

    $(document).on("click", ".autoload-table .chg", function () {
        var value = $(this).html();
        if ($(this).hasClass('pbval-isnull')) {
            value = null;
        } else if ($(this).hasClass('rlentry')) {
            value = $(this).data('rlentry');
        }

        var table_id = $(this).closest('.autoload-table').data('tabid');
        var fieldname = $(this).data("fn");
        var struct_info = get_struct_info(table_structures[table_id][fieldname].Type);
        //Element wird noch gebraucht, um Wert ändern zu können
        var formObj = dialogforms.getFormField(fieldname, value, struct_info, table_id, true);
        handle_null_input(formObj, fieldname, table_id, true);
        show_dialog($(this), formObj, table_id);
    });

    $(document).on("click", ".autoload-table .pbstandard_thead th.sortable,.autoload-table .pbtable-sort-container.sortable", function () {
        var sortdata = tableSorter.set($(this)); //Json-String
        var el = $(this).closest('.autoload-table');
        var limit_of_rows = parseInt(tableConf[el.data('tabid')].rowlimit);
        var table_id = el.data('tabid');
        var pagination_index = el.data('currindex');

        var param = {tabid: table_id,
            sort: sortdata,
            cmd: 'set_sort',
            index: pagination_index,
            limit: limit_of_rows
        };
        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                el.find('.pbstandard_tbody').html(d.html).ready(function () {
                    highlight_sorting(el);
                });
            } else {
                modal_alert(d.errortext || 'Unbekannter Sortierfehler');
            }
        }).fail(function () {
            modal_alert('Problem beim Sortierbefehl');
        });
    });

    $(document).on("click", ".change-row", function () {
        var change_id = $(this).data('change-id');
        var width_index = 0;
        var width_obj = {'xs': 0, 's': 1, 'm': 2, 'l': 3, 'xl': 4};
        var width_arr = ['xs', 's', 'm', 'l', 'xl'];


        var table_id = $(this).closest('.autoload-table').data('tabid');
        var row_el = $(this).closest('.row-identifier');
        var table_el = row_el.closest('.autoload-table');

        var message_buffer = '';


        //row_el.find('.chg').each(function () {
        $(allowed_update_fields[table_id]).each(function (index, fieldname) {
            var field_el;
            if (row_el.find("[data-fn='" + fieldname + "'].chg").length) {
                field_el = row_el.find("[data-fn='" + fieldname + "'].chg");
            } else if ($("[data-change-id='" + change_id + "'][data-fn='" + fieldname + "'].chg").length) {
                field_el = table_el.find("[data-change-id='" + change_id + "'][data-fn='" + fieldname + "'].chg");

            } else {
                modal_alert('Fehler im Feld' + fieldname + '. Wert konnte nicht gefunden werden!');
                return false;
            }

            var value;
            if (field_el.hasClass('pbval-isnull')) {
                value = null;
            } else if (field_el.hasClass('rlentry')) {
                value = field_el.data('rlentry');
            } else {
                value = field_el.html();
            }
            //var fieldname = $(this).data("fn");
            var struct_info = get_struct_info(table_structures[table_id][fieldname].Type);
            var formObj = dialogforms.getFormField(fieldname, value, struct_info, table_id, true);
            handle_null_input(formObj, fieldname, table_id, true);

            var curr_width = formObj.width;

            if (width_obj[curr_width] > width_index) {
                width_index = width_obj[curr_width];
            }
            message_buffer = message_buffer.concat(formObj.html);
        });

        var tmp_obj = {'html': message_buffer,
            'width': width_arr[width_index]};
        show_dialog(row_el, tmp_obj, table_id);
    });

    //insert-row
    $(document).on("click", ".autoload-table .insert-row", function () {
        var table_id = $(this).closest('.autoload-table').data('tabid');
        build_insert_dialog(table_id);
    });

    /*
     * 
     * @param {string} table_id
     * @returns {undefined}
     */
    function build_ins_dial(table_id) {
        var width_index = 0;
        var width_obj = {'xs': 0, 's': 1, 'm': 2, 'l': 3, 'xl': 4};
        var width_arr = ['xs', 's', 'm', 'l', 'xl'];
        var message_buffer = '';
        $(allowed_insert_fields[table_id]).each(function (index, fieldname) {
            var value;
            //fix
            if (modal_input_modifyer[table_id] && modal_input_modifyer[table_id].dyn_preset && typeof modal_input_modifyer[table_id].dyn_preset[fieldname] !== 'undefined') {
                value = modal_input_modifyer[table_id].dyn_preset[fieldname];
            } else {
                value = table_structures[table_id][fieldname].OwnDefault;
            }
            var struct_info = get_struct_info(table_structures[table_id][fieldname].Type);


            var formObj = dialogforms.getFormField(fieldname, value, struct_info, table_id, false);
            var curr_width = formObj.width;

            if (width_obj[curr_width] > width_index) {
                width_index = width_obj[curr_width];
            }
            handle_null_input(formObj, fieldname, table_id, false);
            message_buffer = message_buffer.concat(formObj.html);
        });
        show_insert_dialog(message_buffer, width_arr[width_index], table_id);
    }


    function build_insert_dialog(table_id) {
        //Werte aus d.js_modal_input_modifyer befinden sich in modal_input_modifyer[table_id]
        if (typeof modal_input_modifyer[table_id]['dynamic_preset'] === 'undefined' || !modal_input_modifyer[table_id]['dynamic_preset']) {
            //Hier müssen erst Werte geholt werden, bevor der Dialog aufgebaut wird
            build_ins_dial(table_id);
        } else {

            make_dynamic_preset(table_id);
        }
    }

    function make_dynamic_preset(table_id) {
        // console.log(modal_input_modifyer[table_id]['dynamic_preset']);
        var param = {
            tabid: table_id,
            cmd: 'get_preset_from_classes'
        };

        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {

                modal_input_modifyer[table_id].dyn_preset = d.dyn_preset;
                build_ins_dial(table_id);
            } else {
                modal_alert(d.errortext || 'Fehler beim Anfordern der Voreinträge');
            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Update');
        });
    }



    function handle_null_input(formObj, fieldname, table_id, update_flag) {
        //Nicht-Null-Felder ingonrieren
        if (table_structures[table_id][fieldname].Null === 'NO') {
            return;
        }
        formObj.html = modify_null_template(formObj.html, fieldname, table_id, update_flag, formObj.entryisnull);
    }

    function modify_null_template(input_tpl, fieldname, table_id, update_flag, isnull_flag) {
        var el = $(input_tpl);
        var ncheck_el = $(formtemplates.base.tpl_null);

        if (isnull_flag) { //Feld ist schon NULL
            ncheck_el.find('input').attr('data-id', fieldname).attr("checked", "checked");
            el.find('[name=' + fieldname + ']')
                    .addClass('isnull')
                    .addClass('pboldval-isnull')
                    .addClass('pbinp_nullable').before(ncheck_el);


        } else {
            //Eintrag ist nicht NULL :
            ncheck_el.find('input').attr('data-id', fieldname);
            el.find('[name=' + fieldname + ']')
                    .addClass('pbinp_nullable').before(ncheck_el);
        }
        return el[0].outerHTML;
    }

    //date-input needs input
    $(document).on("change", ".pbinp_nullable", function () {
        if ($(this).val() !== '' && $(this).hasClass('isnull')) {
            $(this).removeClass('isnull');
            $('.pbchk-nullable[data-id=' + $(this).attr('id') + ']').prop("checked", false);
        } else if ($(this).val() === '' && !$(this).hasClass('isnull') && ($(this).attr('type') === 'date' || $(this).attr('type') === 'time')) {
            $(this).addClass('isnull');
            $('.pbchk-nullable[data-id=' + $(this).attr('id') + ']').prop("checked", true);
        }
    });

    $(document).on("click", ".pbchk-nullable", function () {
        if (!$(this).prop('checked')) {

            $('.pbinp_nullable[name=' + $(this).data('id') + ']')
                    .removeClass('isnull')
                    .focus();
        } else {
            $('.pbinp_nullable[name=' + $(this).data('id') + ']')
                    .addClass('isnull')
                    .val('');
        }

    });


    function show_insert_dialog(msg, width, table_id) {
        var message = '<form role="form" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="nosubm needs-validation" novalidate>' + msg + '</form>';
        const langMap = tableConf[table_id].language_map;
        var paramObj = {'table_id': table_id,
             'lang_map' : langMap};
        const head = langMap.insert_row || 'Tabellenzeile einfügen';
        const submitLabel = langMap.send || 'Eintragen';

        pb_show_modal(head, message, width, insertRow, submitLabel, paramObj);

    }

    function get_struct_info(fieldtype) {
        // var fieldtype = 'decimal(8,2) unsigned';
        var arr = /\((.+?)\)/.exec(fieldtype);
        var lgth = (arr) ? arr[1] : '';
        return {'lgth': lgth,
            'type': fieldtype.split('(')[0],
            'unsigned': /unsigned/.test(fieldtype)};
    }

    //Normaler Durchlauf beim Laden des Scripts. Suche nach nachzuladenden Tabellen
    $('.autoload-table').each(function () {
        var el = $(this);
        single_table_load(el);
    });

    //Autoload für einzelne Tabellen automatisch anstoßen.
    //Kann auch dazu verwendet werden, die Tabelle komplett neu zu laden
    $(document).on("table_load_manually", function (e, params) {
        var el = $('.autoload-table[data-tabid="' + params.tabid + '"]');
        if (el.length) {
            single_table_load(el);
        }
    });

    //Autoload-Element in einem Modal startet automatisch das Laden der Tabelle.
    //Limitation: Nur das erste autolaod-Elemen. Sollte der Normalfall sein, dass ein Modal nur eine
    //Tabelle enthält.
    $(document).on("bsmodal-shown", function (e, params) {
        if (!params || !params.element) {
            return false;
        }
        const tabid = $(params.element).find('.autoload-table').first().data('tabid');

        if (!tabid) {
            return false;
        }
        var el = $('.autoload-table[data-tabid="' + tabid + '"]');
        single_table_load(el);
    });


    function single_table_load(el) {
        var param_arr = {'tabid': el.data('tabid'),
            'cmd': 'all'};
        //Falls Sprache angegeben wird:
        if (el.data('pbtpl_language')) {
            param_arr.pbtpl_language = el.data('pbtpl_language');
        }

        if (el.data('where_id')) {
            param_arr.where_id = el.data('where_id');
        }
        if (el.data('scope')) {
            param_arr.scope = el.data('scope');
        }
        //Falls moduleconf übermittelt wird, wird der  Modulname mit übermittelt
        //Und kann ggf. in der Tabellenkonfiguration berücksichtigt werden, z.B
        //um den Tabellennamen zu modifizieren.


        if (el.data('tablemodifyer')) {
            param_arr.tablemodifyer = el.data('tablemodifyer');
        }


        $.post(ajax_url + window.location.search, param_arr, "json").done(function (d) {
            if (d.succ === 'OK') {


                //Rowlimit speichern (kommt vom Server (zurück))
                //language_map wird aus der Tabellen-Konfiguration geholt. Damit können die Dialogboxen
                //adäquat beschriftet werden.
                tableConf[param_arr.tabid] = {
                    'rowlimit': d.rowlimit,
                    'transform_values': d.transform_values || {},
                    //if an object containing key value pairs of the selected language it will be set to
                    //language_map, else language_map is set to null.
                    'language_map': (d.js_language_mapping !== null && typeof d.js_language_mapping === 'object') ? d.js_language_mapping : {}
                };

                //Eigene Formtemplates speichern:
                formtemplates[param_arr.tabid] = (d.own_forms) ? d.own_forms : {};

                el.html(d.html).ready(function () {
                    el.data('totalrows', parseInt(d.totalrows));
                    el.data('tablerows', parseInt(d.tablerows));
                    el.data('currindex', 0);
                    table_structures[el.data('tabid')] = d.table_structure;
                    fieldlabels[el.data('tabid')] = d.fieldlabels;
                    tableSorter.sortorder[el.data('tabid')] = []; //Speichert (für jede Tabelle) ein Sortierarray mit key (Tabllenname , vale = 0 oder 1) 1 = DESC 
                    //Filter müssen auf dem Server definiert werden, um Manipulationen zu vermeiden.
                    registered_filters[el.data('tabid')] = d.filters;
                    set_cssclasses4filters(el.data('tabid'), d.filters);
                    set_pre_filters(el.data('tabid'), d.pre_filters);

                    modal_input_modifyer[el.data('tabid')] = d.js_modal_input_modifyer;

                    allowed_insert_fields[el.data('tabid')] = d.allowed_insert;
                    allowed_update_fields[el.data('tabid')] = d.allowed_update;
                    //Seitennavigation
                    make_pagination(el, 0);
                    el.data('bodyrows', d.bodyrows); //Tasächlich zurückgelieferte Reihen
                    el.data('startindex', d.startindex);
                    //können auf der letzen Seite ja weniger sein
                    set_from_to_info(el);
                    //Limit-Anzeige aktualisieren
                    el.find('.table-limit-of-rows').val(d.limitselection);
                    //Neuen Wert speichern:
                    tableConf[el.data('tabid')].rowlimit = d.limitselection;
                    $(document).trigger("pbtable_firstload", {
                        "tabid": param_arr.tabid,
                        "totalrows": parseInt(d.totalrows),
                        "tablerows": parseInt(d.tablerows),
                        "bodyrows": parseInt(d.bodyrows)
                    });

                });
            } else {
                modal_alert(d.errortext || 'unbekannter Fehler');

            }
        }).fail(function () {
            modal_alert('Problem beim Anfordern der Tabelle');
        });
    }

    function set_cssclasses4filters(tabid, filters_conf) {
        //({demo_table4:{filter1:{onoff:0, active_always:0, send_on_activation:0, send_after_keyupdelay:0, params:{param1:null}}}})
        $.each(filters_conf, function (filtername, filters_obj) {
            if (filters_obj.send_after_keyupdelay) {
                $('#' + tabid + '-' + filtername).addClass('filter-sendafterkeyupdelay');
            } else if (filters_obj.send_after_select) {
                $('#' + tabid + '-' + filtername).addClass('filter-sendafterselect');
            } else if (filters_obj.send_after_dateinput) {
                $('#' + tabid + '-' + filtername).addClass('filter-sendafterdateinput');
            }
        });
    }

    function set_pre_filters(tabid, pre_filters) {
        //vorgegebene Werte aus PHP-Konfiguration als Parameter setzen. Diese wurden serverseitig schon berücksichtigt
        //und werden hier nur dargestellt
        $.each(pre_filters, function (key, val_obj) {
            var tab_el = $('.autoload-table[data-tabid="' + tabid + '"]');
            $.each(val_obj, function (param_name, param_value) {
                tab_el.find('#' + tabid + '_' + key + '_' + param_name).val(param_value);
            });

            var filter_el = tab_el.find('#' + tabid + '-' + key);
            filter_el.addClass('filterisactive');
            filter_el.find('.' + toggle_off_class).removeClass(toggle_off_class).addClass(toggle_on_class);
        });
    }

    $(document).on("click", ".autoload-table .filtersactivation", function () {
        $(this).parent().toggleClass('filterisactive');
        refresh_rows($(this).closest('.autoload-table'), 0);
    });

    $(document).on("click", ".autoload-table .tablerow-refresh-button", function () {
        $(this).button("loading").delay(500).queue(function () {
            $(this).button("reset");
            $(this).dequeue();
        });
        refresh_rows($(this).closest('.autoload-table'), 0);
    });


    var sendafterchange_timer = null;
    $(document).on("keyup", ".autoload-table .filter-sendafterkeyupdelay", function () {
        var el = $(this);
        var tab_el = $(this).closest('.autoload-table');
        if (sendafterchange_timer !== null) {
            clearTimeout(sendafterchange_timer);
            sendafterchange_timer = null;
        }
        //Prüfen, ob der Filter ausgeschaltet werden kann/muss        
        if (check_filteroff(el, tab_el.data('tabid'))) {
            //el.find('.' + toggle_on_class).click();
            el.find('.filteronoff').click();
            return;
        }

        sendafterchange_timer = setTimeout(function () {
            el.addClass('filterisactive');
            // el.find('.' + toggle_off_class).removeClass(toggle_off_class).addClass(toggle_on_class);
            el.find('.filteronoff').removeClass(toggle_off_class).addClass(toggle_on_class);
            refresh_rows(tab_el, 0);
            sendafterchange_timer = null;
        }, 500);
    });

    $(document).on("change", ".autoload-table .filter-sendafterselect", function () {
        var el = $(this);

        //Todo: testen:
        if (el.is("[type='date']") && !isValidDate(el.val()) && el.val() !== '') {
            return;
        }

        var tab_el = $(this).closest('.autoload-table');
        //Prüfen, ob der Filter ausgeschaltet werden kann/muss        
        if (check_filteroff(el, tab_el.data('tabid'))) {
            //el.find('.' + toggle_on_class).click();
            el.find('.filteronoff').click();
            return;
        }
        el.addClass('filterisactive');
        //el.find('.' + toggle_off_class).removeClass(toggle_off_class).addClass(toggle_on_class);
        el.find('.filteronoff').removeClass(toggle_off_class).addClass(toggle_on_class);
        refresh_rows(tab_el, 0);
    });

    $(document).on("change", ".filter-sendafterdateinput input[type='date']", function () {
        var filter_el = $(this).closest('.filter-sendafterdateinput'); //Filterelement
        var tab_el = $(this).closest('.autoload-table');
        //Prüfen, ob der Filter ausgeschaltet werden kann/muss        
        if (check_filteroff(filter_el, tab_el.data('tabid'))) {
            // filter_el.find('.' + toggle_on_class).click();
            filter_el.find('.filteronoff').click();
            return;
        }

        filter_el.addClass('filterisactive');
        //filter_el.find('.' + toggle_off_class).removeClass(toggle_off_class).addClass(toggle_on_class);
        filter_el.find('.filteronoff').removeClass(toggle_off_class).addClass(toggle_on_class);
        refresh_rows(tab_el, 0);
    });

    //https://stackoverflow.com/questions/18758772/how-do-i-validate-a-date-in-this-format-yyyy-mm-dd-using-jquery
    function isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString.match(regEx))
            return false;  // Invalid format
        var d = new Date(dateString);
        var dNum = d.getTime();
        if (!dNum && dNum !== 0)
            return false; // NaN value, Invalid date
        return d.toISOString().slice(0, 10) === dateString;
    }

    function check_filteroff(el, tab_id) {
        //Filternamen ermitteln
        var filtername = el.closest('[data-filtername]').data('filtername');
        var filter_param = registered_filters[tab_id][filtername];
        if (!filter_param.filteroff_on) {
            return false;
        }
        var found = false;
        $.each(filter_param.filteroff_on, function (key, value) {
            if ($('#' + tab_id + '_' + filtername + '_' + key).val() === value) {
                found = true;
                return true;
            }
        });
        return found;
    }

    $(document).on("click", '.autoload-table .filterisactive .filteronoff', function () {
        var filter_el = $(this).closest('[data-filtername]');
        $(this).removeClass(toggle_on_class).addClass(toggle_off_class);
        filter_el.removeClass('filterisactive');
        filter_el.find('input, select').val('');
        //Falls es sich um eine Checkbox handelt:
        filter_el.find('input[type=checkbox]').prop('checked', false);
        refresh_rows($(this).closest('.autoload-table'), 0);
    });

    $(document).on("click", ".autoload-table li.active a", function (e) {
        e.preventDefault();
    });

    $(document).on("click", ".autoload-table .page-wind", function () {

        // var direction = ($(this).hasClass('page-next')) ? 'next' : 'last';
        var direction;
        var sel_pagenr = null;
        var page_index_of_first_row = null;
        var nextindex = null;
        var el = $(this).closest('.autoload-table');
        var limit_of_rows = parseInt(tableConf[el.data('tabid')].rowlimit);

        if ($(this).hasClass('page-next')) {
            direction = 'next';
        } else if ($(this).hasClass('page-back')) {
            direction = 'back';
        } else if ($(this).hasClass('page-nr')) {
            direction = 'nr';
            sel_pagenr = parseInt($(this).text());
            page_index_of_first_row = (sel_pagenr - 1) * limit_of_rows;
        } else {
            return false;
        }

        var currindex = el.data('currindex');
        var totalrows = el.data('totalrows');
        if (page_index_of_first_row !== null) {
            nextindex = page_index_of_first_row;
        } else {
            nextindex = get_index(currindex, limit_of_rows, totalrows, direction);
        }

        var param_arr = {'tabid': el.data('tabid'),
            'cmd': 'body',
            'index': nextindex,
            'limit': limit_of_rows};
        get_table_body(param_arr, el);
        return false;
    });

    //
    $(document).on("change", ".autoload-table .table-limit-of-rows", function () {
        var limit_of_rows = $(this).val();
        var el = $(this).closest('.autoload-table');
        tableConf[el.data('tabid')].rowlimit = limit_of_rows;
        var param_arr = {'tabid': el.data('tabid'),
            'cmd': 'body',
            'index': el.data('currindex'),
            'limit': limit_of_rows};
        get_table_body(param_arr, el);
    });

    function get_table_body(param_arr, el) {
        $.post(ajax_url, param_arr, "json").done(function (d) {
            if (d.succ === 'OK') {
                tableConf[param_arr.tabid]['rowlimit'] = d.rowlimit;
                el.find('.pbstandard_tbody').html(d.html).ready(function () {
                    el.data('totalrows', d.totalrows);
                    el.data('tablerows', d.tablerows);
                    el.data('currindex', param_arr.index); //store information as data
                    el.data('bodyrows', d.bodyrows); //Tasächlich zurückgelieferte Reihen
                    //können auf der letzen Seite ja weniger sein                    
                    el.data('startindex', d.startindex);
                    make_pagination(el, param_arr.index);
                    set_from_to_info(el);

                    //Kann verwendet werden, um Aktionen außerhalb der Tabelle auszulösen, z.B. um
                    //Buttons zu sperren, wenn keine Daten mehr vorhanden sind, oder um Summen zu addieren
                    $(document).trigger("pbtable_rows_refreshed", {
                        "tabid": param_arr.tabid,
                        "totalrows": parseInt(d.totalrows),
                        "tablerows": parseInt(d.tablerows),
                        "bodyrows": parseInt(d.bodyrows)
                    });
                });
            } else {
                modal_alert(d.errortext);

            }
        }).fail(function () {
            modal_alert('Problem beim Anfordern der Tabelle');
        });
    }

    function set_from_to_info(el) {
        var start = 0;
        var end = 0;
        if (parseInt(el.data('bodyrows'))) {
            start = el.data('startindex') + 1;
            end = start + el.data('bodyrows') - 1;
        }
        el.find('.tablebody-start-nr').text(start);
        el.find('.tablebody-end-nr').text(end);

        el.find('.filtered-totalnumber').text(el.data('totalrows'));
        el.find('.totalnumber').text(el.data('tablerows'));
    }


    function make_pagination(el, index) {
        var row_nr = index + 1;
        var totalrows = el.data('totalrows');
        var limit_of_rows = parseInt(tableConf[el.data('tabid')].rowlimit);
        var pages = Math.ceil(totalrows / limit_of_rows);

        if (pages <= 1) {
            el.find('.pagination').hide();
        } else {
            el.find('.pagination').show();
        }

        var active_page = Math.ceil(row_nr / limit_of_rows);
        var show_pages = 5;

        if (typeof paginationConf !== 'undefined' && paginationConf.show) {
            show_pages = parseInt(paginationConf.show);
        }
        //Nur Seiten anzeigen, wenn diese vorhanden sind
        var first_page, last_page;
        if (pages <= show_pages) {
            show_pages = pages;
            first_page = 1;
            last_page = show_pages;
        } else {
            var half_range = Math.floor(show_pages / 2);
            first_page = active_page - half_range;
            if (first_page < 1) {
                first_page = 1;
            }
            last_page = first_page + show_pages - 1;
            //Am Ende angekommen:
            if (last_page > pages) {
                last_page = pages;
                first_page = last_page - show_pages + 1;
            }
        }

        var pagination_el = el.find('.pagination');

        //Frühere Navigationselemente entfernen:
        pagination_el.find('.pagenr').remove();
        //Alle disabled entfernen
        pagination_el.find('li.disabled').removeClass('disabled');
        if (active_page === 1) {
            pagination_el.find('li.back').addClass('disabled');
        }
        if (active_page === pages) {
            pagination_el.find('li.next').addClass('disabled');
        }

        //Es muss möglich sein, zur ersten Seite zu gehen:
        var firstbutton = (first_page > 1) ? '<li class="pagenr page-wind page-item page-nr"><a href="#" class="page-link">1</a></li>' : '';
        if (first_page > 2) {
            firstbutton += '<li class="pagenr page-item disabled"><a href="#" class="page-link">...</a></li>';
        }
        //Nur die benötigten Seiten durchgehen:
        for (var i = first_page; i <= last_page; i++) {
            var li = $('<li class="pagenr page-item"><a href="#" class="page-link">' + i + '</a></li>');
            if (i === active_page) {
                li.addClass('active');
            } else {
                li.find('a').addClass('page-wind page-nr');
            }

            if (i === first_page) {
                // pagination_el.append(li);
                pagination_el.find('li.back').after(li);
                if (firstbutton) {
                    pagination_el.find('li.back').after($(firstbutton));
                }
            } else {
                pagination_el.find('li.pagenr').last().after(li);
            }
        }

        if (last_page < pages) {
            var lastbutton = '<li class="pagenr page-wind page-nr"><a href="#" class="page-link">' + pages + '</a></li>';
            if (last_page + 1 < pages) {
                lastbutton = '<li class="pagenr disabled page-item"><a href="#" class="page-link">...</a></li>' + lastbutton;
            }
            pagination_el.find('li.pagenr').last().after($(lastbutton));
        }
    }

    function get_index(currindex, limit_of_rows, totalrows, direction) {
        if (direction === 'next') {
            return get_next_index(currindex, limit_of_rows, totalrows);
        } else if (direction === 'back') {
            return get_last_index(currindex, limit_of_rows);
        } else {
            return;
        }
    }
    function get_next_index(currindex, limit_of_rows, totalrows) {
        if (currindex + limit_of_rows >= (totalrows)) {
            return currindex;
        }
        return currindex + limit_of_rows;
    }
    function get_last_index(currindex, limit_of_rows) {
        if (currindex - limit_of_rows < 0) {
            return 0;
        }
        return currindex - limit_of_rows;
    }

    //remove-row
    $(document).on("click", ".autoload-table .remove-row", function () {
        const delete_id = $(this).data('id');
        const table_id = $(this).closest('.autoload-table').data('tabid');
        const langMap = tableConf[table_id].language_map;

        
        var row_el = $(this).closest('.row-identifier');
        if (!row_el.length) {
            modal_alert('Löschen nicht möglich. row-identifier nicht gefunden.');
            return false;
        }
        var el = $(this).closest('.autoload-table');
        const message = langMap.confirm_delete || 'Möchten Sie den Datensatz unwiderruflich löschen?';

        bootstrap.showConfirm({
            title: langMap.confirm_delete_label || "Löschen bestätigen",
            body: message,
            textTrue: langMap.yes || "Ja",
            textFalse: langMap.no || "Nein",
            onSubmit: function (result) { // callback on confirm
                if (result === true) {
                    var param_arr = {'tabid': el.data('tabid'),
                        'cmd': 'delete',
                        'delete_id': delete_id};

                    delete_row(param_arr, el, row_el);
                }
            }
        });
    });


    function delete_row(param_arr, el, row_el) {
        $.post(ajax_url, param_arr, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Zahl der Datensätze aktualisieren:
                el.data('totalrows', el.data('totalrows') - 1);
                el.find('.totalnumber').text(el.data('totalrows'));

                refresh_rows(el, null); //Index so lassen
            } else {
                modal_alert(d.errortext || 'Unbekanntes Problem beim Löschen des Datensatzes');
            }
        }).fail(function () {
            modal_alert('Problem beim Löschen des Datensatzes');
        });
    }


    function insertRow(modal, paramObj) {
        $('.input-validation-error').remove();
        //Clientseitige Constraints-Validierung
        if (!modal_validation(modal)) {
            return;
        }

        var curr_modal = $('#' + $(modal).attr('id'));

        //Null-Felder sollen nicht übertragen werden. Der Null-Wert entsteht ja autommatisch
        curr_modal.find('form .isnull').prop('disabled', true);
        var param = {
            tabid: paramObj.table_id,
            cmd: 'insert_row',
            field_arr: curr_modal.find('form').serialize()
        };

        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                var el = $('.autoload-table[data-tabid="' + paramObj.table_id + '"]');
                el.data('totalrows', el.data('totalrows') + 1);
                el.find('.totalnumber').text(el.data('totalrows'));

                //Änderungs-Event ausgeben:
                $(document).trigger("pbtable_table_modified", {
                    tabid: paramObj.table_id,
                    cmd: 'insert_row'});

                //Refresh:
                refresh_rows(el, 0);
                if (formtemplates[paramObj.table_id]['insert_success_message']) {
                    $(modal.element).find(".modal-body").html(formtemplates[paramObj.table_id]['insert_success_message']);
                } else {
                    modal.hide();
                }
            } else if (d.validation_error) {
                curr_modal.find('form .form-control').prop('disabled', false);
                curr_modal.find('form .isnull').prop('disabled', false);
                var errmessage = $("<p>" + d.validation_error + "</p>").addClass('input-validation-error');
                $('#' + d.validation_fieldname).select().focus().after(errmessage);
                pbmodal_footerbuttonsEnabled(modal);
            } else {
                modal_alert(d.errortext || 'Unbekannter Fehler beim Validieren');
                modal.hide();
            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Einfügen');
            modal.hide();
        });
    }

    $(document).on("click", ".autoload-table .showtable", function () {
        var el = $(this).closest('.autoload-table');
        var limit_of_rows = parseInt(tableConf[el.data('tabid')].rowlimit);

        var param_arr = {'tabid': el.data('tabid'),
            'cmd': 'body',
            'index': 0,
            'limit': limit_of_rows,
            'filters': get_filters(el.data('tabid'))};
        get_table_body(param_arr, el);
    });

    function refresh_rows(el, index) {
        if (index === 0) {
            el.data('currindex', 0);
        } else if (index === -1) {
            el.data('currindex', el.data('totalrows'));
        }
        var limit_of_rows = parseInt(tableConf[el.data('tabid')].rowlimit);

        var param_arr = {'tabid': el.data('tabid'),
            'cmd': 'body',
            'index': el.data('currindex'),
            'limit': limit_of_rows,
            'filters': get_filters(el.data('tabid'))};

        get_table_body(param_arr, el);
    }

    function get_filters(tabid) {
        var upl_filters_obj = {};
        $.each(registered_filters[tabid], function (filtername, filters_obj) {
            var id = '#' + tabid + '-' + filtername;
            if ($(id).hasClass('filterisactive')) {
                upl_filters_obj[filtername] = {};
                $.each(filters_obj.params, function (key, value) {
                    upl_filters_obj[filtername][key] = $('#' + tabid + '_' + filtername + '_' + key).val();
                });
            }
        });
        if (jQuery.isEmptyObject(upl_filters_obj)) {
            return '';
        }
        return upl_filters_obj;
    }

    /* datetime functions */
    $(document).on("change", ".pbtable-datetime", function () {
        var fieldname = $(this).data('inpid');
        var value = $('#' + fieldname + '_PARTDATE').val() + ' ' + $('#' + fieldname + '_PARTTIME').val() + ':00';
        $('#' + fieldname).val(value);
    });

    $(document).on("click", ".pbtable-btn-input-datetime button", function () {
        var el = $(this);
        var sel_minutes = parseInt(el.val());
        var d = new Date();
        d.setMinutes(d.getMinutes() + sel_minutes);
        var time_str = d.toLocaleTimeString();
        var date_str = js2Sql(d);
        //Feldnamen ermitteln:
        var field_id = el.parent().data('fieldid');
        $('#' + field_id).val(date_str + ' ' + time_str);
        $('#' + field_id + '_PARTDATE').val(date_str);
        $('#' + field_id + '_PARTTIME').val(time_str.substr(0, 5));
    });
    //https://stackoverflow.com/questions/2280104/convert-javascript-to-date-object-to-mysql-date-format-yyyy-mm-dd/15021796
    function js2Sql(cDate) {
        return cDate.getFullYear() + '-' + ("00" + (cDate.getMonth() + 1)).slice(-2) + '-' + ("00" + cDate.getDate()).slice(-2);
    }

    //Switch
    $(document).on("click", ".autoload-table .switchvalue", function () {
        //Konfirm falls data-Attribut vorhanden ist.
        if ($(this).data('switchconfirm')) {
            var message = $(this).data('switchconfirm');
            if (!confirm(message)) {
                return false;
            }
        }

        //show_dialog('/PbClasses/Table/Ajax/Test.php')  ;  
        var field_el = $(this);
        var row_el = $(field_el).closest('.row-identifier');
        var value = field_el.attr('data-switchvalue');
        var table_id = row_el.closest('.autoload-table').data('tabid');
        var fieldname = field_el.data("fn");
        // var structure = table_structures[table_id][fieldname].Type;

        var param = {
            tabid: table_id,
            fieldname: fieldname,
            cmd: 'switch_val',
            curr_val: value,
            upd_id: row_el.data('change-id')};

        if (param.upd_id === null || param.upd_id === undefined) {
            param.upd_id = row_el.find('.change-row').data('change-id');
        }

        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                //Wenn Refresh_rows angegeben ist, sofort neu laden
                if (typeof tableConf[table_id].transform_values.refresh !== 'undefined' && (tableConf[table_id].transform_values.refresh[param.fieldname] || tableConf[table_id].transform_values.refresh === true)) {
                    refresh_rows(field_el.closest('.autoload-table'), null); //Nicht zum Anfang springen!
                    return;
                }

                //Wenn Update-Filter (z.B. Passwwort) angewendet werden wird der tatsächliche Eintragswert gebraucht.
                //Daher nicht die lokale Eingabe übernehmen sondern rückgabe vom Server verwenden.
                //field_el.html(d.update_arr[param.fieldname]);
                field_el.attr('data-switchvalue', d.update_arr[param.fieldname]);

                if (field_el.find('.pbtbl-upd-target').length) {
                    field_el.find('.pbtbl-upd-target').html(d.switch_label);
                } else {
                    field_el.html(d.switch_label);
                }

                var css_switch_modifier = (typeof d.cssrowmodval === 'undefined') ? d.switch_label : d.cssrowmodval;

                row_el.removeClassStartingWith('rowmod-' + param.fieldname).addClass('rowmod-' + param.fieldname + '-' + css_switch_modifier);

                //Änderungs-Event ausgeben:
                $(document).trigger("pbtable_table_modified", param);

                field_el.addClass('highlight-updated-row');
                setTimeout(function () {
                    field_el.removeClass('highlight-updated-row');
                }, 2000);

            } else {
                modal_alert(d.errortext || 'Fehler beim Switchupdate');
            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Update');
        });
    });


    /*
     * Ausführen von individuellen Methoden, die auf dem Server hinterlegt sind.
     * Refresh nach Ausführung
     * @todo - Refresh-Verhalten steuern: eventuell deaktivieren. Serverseitig oder durch data-Parameter im HTML.
     */
    $(document).on("click", ".autoload-table [data-pbtbl-dojob]", function () {
        //Konfirm falls data-Attribut vorhanden ist.
        if ($(this).data('dojobconfirm')) {
            var message = $(this).data('dojobconfirm');
            if (!confirm(message)) {
                return false;
            }
        }
        $(this).prop('disabled', true);
        var method_name = $(this).data('pbtbl-dojob');
        var field_el = $(this).closest('[data-fn]'); //

        var row_el = $(field_el).closest('.row-identifier');
        var value = field_el.attr('data-dojob-value');
        var table_id = row_el.closest('.autoload-table').data('tabid');
        var fieldname = field_el.data("fn");

        var param = {
            tabid: table_id,
            fieldname: fieldname,
            cmd: 'dojob',
            method_name: method_name,
            curr_val: value,
            upd_id: row_el.data('change-id')
        };
        if (param.upd_id === null || param.upd_id === undefined) {
            param.upd_id = row_el.find('.change-row').data('change-id');
        }

        $.post(ajax_url, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                if (d.dojob && d.dojob.message) {
                    toast_message(d.dojob.message);
                } else if (d.dojob && d.dojob.error) {
                    modal_alert(d.dojob.error);
                } else if (d.message) {
                    toast_message(d.message);
                }
                //else:
                //Keine Message
            } else {
                modal_alert(d.errortext || 'Fehler bei der Ausführung');
            }
        }).fail(function () {
            modal_alert('Technisches Problem beim Ausführen des Befehls');
        }).always(function () {
            //refresh_rows(field_el.closest('.autoload-table'), 0);
            refresh_rows(field_el.closest('.autoload-table'));
        });
    });

    //Auswahlbuttons:
    $(document).on("click", ".autoload-table .sendbuttonselection", function () {
        var btn_el = $(this);
        var filter_el = btn_el.closest('[data-filtername]');
        var tab_el = btn_el.closest('.autoload-table');
        //var tab_id = tab_el.data('tabid');
        var btn_value = btn_el.val();

        // Button markieren:
        filter_el.find('.btn-primary').removeClass('btn-primary').addClass('btn-default');
        btn_el.removeClass('btn-default').addClass('btn-primary');
        $('.catchbuttonselection').val(btn_value);

        if (btn_el.hasClass('switchfilteroffselection')) {
            filter_el.removeClass('filterisactive');
        } else {
            filter_el.addClass('filterisactive');
        }
        refresh_rows(tab_el, 0);
    });

    //Eine Checkbox:
    $(document).on("click", ".autoload-table .sgcheckboxselection", function () {
        var check_el = $(this);
        var filter_el = check_el.closest('[data-filtername]');
        var tab_el = check_el.closest('.autoload-table');

        if (check_el.prop('checked') === false) {

            filter_el.removeClass('filterisactive');
        } else {
            filter_el.addClass('filterisactive');
        }
        refresh_rows(tab_el, 0);

    });

    /* Checkboxgruppe mit OR-Verknüpfung
     */
    $(document).on("change", ".autoload-table .checkboxselection", function () {
        var check_el = $(this);
        var filter_el = check_el.closest('[data-filtername]');
        var tab_el = check_el.closest('.autoload-table');

        if (check_el.hasClass('switchfilteroffselection')) {
            filter_el.removeClass('filterisactive');
            check_el.prop('disabled', true);
            filter_el.find('.checkboxselection').not('.switchfilteroffselection').prop('checked', false);
        } else {
            filter_el.addClass('filterisactive');
            filter_el.find('.switchfilteroffselection').prop('checked', false).prop('disabled', false);

            //Werte einsammeln
            var checkbuffer = '';
            filter_el.find('.checkboxselection').not('.switchfilteroffselection').each(function () {
                if ($(this).prop('checked')) {
                    checkbuffer += String($(this).val()) + ',';
                }
            });
            $('.catchcheckboxselection').val(checkbuffer);
            //Letzte Auswahl wurde deaktiviert
            if (checkbuffer === '') {
                filter_el.find('.switchfilteroffselection').click();
            }
        }
        refresh_rows(tab_el, 0);
    });


    function modal_alert(message, messtype) {
        if (!messtype) {
            messtype = 'error';
        }

        if (!message) {
            message = 'Unbekannter Fehler';
        }
        //Wenn pbtoast verfügbar ist:
        if (typeof pbtoast === 'function') {
            pbtoast(messtype, message);
            return;
        }
        //wenn shoAlert verfügbar ist sonst einfaches js-alert:
        if (bootatrap.showAlert) {
            bootstrap.showAlert({title: "Fehler", body: message});
            return;
        }
        alert(message);
    }

    function toast_message(message, messtype_) {
        var messtype = (!messtype_) ? 'success' : messtype_;
        //Wenn pbtoast verfügbar ist:

        if (typeof pbtoast === 'function') {
            pbtoast(messtype, message);
        }
        //Sonst keine Meldung. Alert würde stören
    }


    /* Refresh der Reihen per custom-event */
    $(document).on("table_refresh_rows", function (e, params) {

        var el = $('.autoload-table[data-tabid="' + params.tabid + '"]');
        refresh_rows(el, 0);

    });

    //Alle Filter zurücksetzen:
    $(document).on("click", ".autoload-table .pbtbl-filtersreset", function () {
        var focus_id = null; //Anschließend Focus auf dieses Feld setzen, falls definiert
        var reset_only = null; //@todo: Filter nur für diese Fehlder zurücksetzen
        if (typeof $(this).data('focusid') !== 'undefined') {
            focus_id = $(this).data('focusid');
        }
        if (typeof $(this).data('resetonly') !== 'undefined') {
            reset_only = $(this).data('reset_only');
        }
        reset_filters($(this).closest('.autoload-table').data('tabid'), focus_id, reset_only);
    });

    function reset_filters(tabid, focus_id) {
        //@todo , reset_only = null //3. param
        var tab_el = $('.autoload-table[data-tabid="' + tabid + '"]');


        tab_el.find('.filterisactive').each(function () {
            var el = $(this);
            el.removeClass('filterisactive');
            //el.find('.' + toggle_on_class).removeClass(toggle_on_class).addClass(toggle_off_class);
            el.find('.filteronoff').removeClass(toggle_on_class).addClass(toggle_off_class);

            el.find('input, select').val('');
            //Falls es sich um eine Checkbox handelt:
            el.find('input[type=checkbox]').prop('checked', false);
        });
        refresh_rows(tab_el, 0);
        if (focus_id !== null && focus_id !== undefined) {
            tab_el.find('#' + focus_id).focus();
        }
    }

    //Highlight row on delete
    $(document).on("click", '.remove-row', function () {
        $('.row-identifier').removeClass('deleterowhighlight'); //Remove old highlighting
        $(this).closest('.row-identifier').addClass('deleterowhighlight');
    });

    $(document).on("click", 'button.btn-false, button.close', function () {
        $('.row-identifier').removeClass('deleterowhighlight'); //alte Markierungen löschen.
    });

});

