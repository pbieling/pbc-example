$(document).ready(function () {

    var module_data = $('#modulcontainer-commondoc').data('commondocmodule');
    var ajax_url = {
        'thumbnail_bar': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/ThumbnailBar.php',
        'register_form': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/ImgRegisterForm.php',
        'image_registration': 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/ImgRegistration.php',
        'image_file_upload' : 'PbClasses/' + module_data.name + '/' + module_data.nsp + '/MDoc/Ajax/ImgFileUpload.php',
    };
    var pb_jstree_conf = {
        'pbcnf': 'doc',
        'prepared_img_names' : {'topimg_big' : 'article_%s_top_1400.jpg',
                                'topimg_small' : 'article_%s_top_700.jpg',
                                'teaser_img' : 'teaser-%s.jpg'}
    };
    /*
     $('[data-toggle="tooltip"]').tooltip().click(function (e) {
     e.preventDefault();
     });
     */


    //var upload_more = 1;
    //var num_uploaded = 0;
    var flag_loading = false;
    //var css_checked_class = 'pb-boxchecked';
    //var validation_errors_found = false;
    //var tech_error_message = 'Wir bitten um Entschuldigung. Es ist ein technischer Fehler aufgetreten.\n\
    //Bitte wenden Sie sich telefonisch oder per E-Mail an uns.';

    //see https://www.codexworld.com/ajax-file-upload-using-jquery-php/
    //file input field trigger when the drop box is clicked

    $("#dropBox").click(function () {
        if (flag_loading === false) {
            $("#fileInput").click();
        }
    });


    //prevent browsers from opening the file when its dragged and dropped
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    //call a function to handle file upload on select file
    $('input[type=file]').on('change', fileUpload);


    function refreshThumbnailBar() {
        $.post(ajax_url.thumbnail_bar, {'pbcnf': pb_jstree_conf.pbcnf}).done(function (d) {

            if (d.succ === 'OK') {
                $('#thumbnailbar').html(d.thumbs_bar);
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            alert("error");
        })
                /*
                 .always(function () {
                 alert("finished");
                 })
                 */
                ;
    }
    refreshThumbnailBar();



    function fileUpload(event) {
        //notify user about the file upload status
        // $("#dropBox").html(event.target.value + " Datei wird hochgeladen ...");
        flag_loading = true;
        $('#dropBox').css('cursor', 'wait');
        $("#dropBox").html(" Die Datei wird hochgeladen ...");

        //get selected file
        files = event.target.files;

        //form data check the above bullet for what it is
        var data = new FormData();

        //file data is presented as an array
        var allowed_size = 1024 * 1024 * 4;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('image.*')) {
                //check file type
                $("#dropBox").html("Bitte wählen Sie eine Bilddatei aus!");
            } else if (file.size > allowed_size) {
                //check file size (in bytes)
                $("#dropBox").html("Die Datei darf nicht größer als 4 MB sein.");
            } else {
                //append the uploadable file to FormData object
                data.append('file', file, file.name);
                //create a new XMLHttpRequest
                var xhr = new XMLHttpRequest();


                xhr.open('POST', ajax_url.image_file_upload, true);
                xhr.send(data);
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    //alert(response.toString());
                    if (xhr.status === 200 && response.succ === 'OK') {
                        $("#dropBox").html(response.message);
                        //handle_uploadform(response);
                        refreshThumbnailBar();

                    } else {
                        $("#dropBox").html(response.errortext || 'Technischer Fehler. Bitte versuchen Sie es später noch einmal.');
                    }
                    $('#dropBox').css('cursor', 'pointer');
                    flag_loading = false; //Sperrung aufheben

                };
            }
        }



    }



    var register_image = function (modal) {
        var param = {
            'pbcnf': pb_jstree_conf.pbcnf,
            'field_arr': $('#imgdata').serialize()};


        $.post(ajax_url.image_registration, param, "json").done(function (d) {
            if (d.succ !== 'OK') {

                alert(d.errortext || 'Unbekannter Fehler');
            }

        }).fail(function () {
            alert('Technischer Fehler');
            return false;
        }).always(function () {
            modal.hide();
            refreshThumbnailBar();
            $('.tablerow-refresh-button').click();
        });


    };

    $(document).on("click", ".thumb_bar_item", function () {
        var param = {'filename': $(this).data('filename'),
            'pbcnf': pb_jstree_conf.pbcnf};



        $.post(ajax_url.register_form, param, "json").done(function (d) {
            if (d.succ === 'OK') {


               // show_dialog('Bild registrieren', d.image_register_form, 1000, register_image);
                pb_show_modal('Bild registrieren', d.image_register_form, 1000, register_image);

            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }

        }).fail(function () {
            alert('Technischer Fehler');
        });
    });





    function register_image() {
        var param = {
            'pbcnf': pb_jstree_conf.pbcnf,
            'field_arr': $('#imgdata').serialize()};


        $.post(ajax_url.image_registration, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                // alert(d.image_register_form);

                return true;

            } else {
                alert(d.errortext || 'Unbekannter Fehler');
                return false;
            }

        }).fail(function () {
            alert('Technischer Fehler');
            return false;
        }).always(function () {
            refreshThumbnailBar();
            $('.tablerow-refresh-button').click();
        });

        // alert(param.field_arr);


    }

    $(document).on("click", ".prepared-img-names", function () {
        var key = $(this).val();
        var imgname = pb_jstree_conf.prepared_img_names[key].sprintf($('#f-overview-head').data('id'));
        $('#imgdata_imgname').val(imgname);
        
    });


  //http://matthiasschuetz.com/javascript-einfache-implementierung-von-sprintf
  //var str2 = "%s ist ein schöner %s".sprintf("Heute", "Tag");
  
    String.prototype.sprintf = function () {
        var counter = 0;
        var args = arguments;

        return this.replace(/%s/g, function () {
            return args[counter++];
        });
    };



    function show_dialog(title, content, width, fnc = null, button_label = 'Abschicken') {

        var subm_button = (button_label) ? '<button type="submit" class="btn btn-primary">' + button_label + '</button>' : '';

        $.showModal({
            title: title,
            body: content,
            modalDialogClass: 'mdialog-' + width,
            footer: '<button type="button" class="btn btn-link" data-dismiss="modal">Abbrechen</button>' + subm_button,
            onCreate: function (modal) {
                // create event handler for form submit and handle values
                $(modal.element).on("click", "button[type='submit']", function (event) {
                    event.preventDefault();
                    modal.buttonsDisabled(true);
                    if (fnc) {
                        fnc(modal);
                    } else {
                        modal.hide();
                    }

                });
            }
        });
    }



});

