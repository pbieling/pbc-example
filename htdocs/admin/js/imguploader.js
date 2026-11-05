$(document).ready(function () {
    var conf_name = $('#tabs-1').data('conf');

    var ajax_url = {
        'file_upload': 'PbClasses/PG/Ajax/MImgFileUpload.php',
        'thumbnail_bar': 'PbClasses/PG/Ajax/MThumbnailBar.php',
        'register_form': 'PbClasses/PG/Ajax/MImgRegisterForm.php',
        'image_registration': 'PbClasses/PG/Ajax/MImgRegistration.php'
    };


    var flag_loading = false;
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
        $.post(ajax_url.thumbnail_bar, {'conf_name': conf_name}).done(function (d) {

            if (d.succ === 'OK') {
                $('#thumbnailbar').html(d.thumbs_bar);
                //console.log(d.thumbs_bar);
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }
        }).fail(function () {
            alert("error");
        });
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
                data.append('conf_name', conf_name);
                //create a new XMLHttpRequest
                var xhr = new XMLHttpRequest();


                xhr.open('POST', ajax_url['file_upload'], true);
                xhr.send(data);
                xhr.onload = function () {
                    var response = JSON.parse(xhr.responseText);
                    if (xhr.status === 200 && response.succ === 'OK') {
                        $("#dropBox").html(response.message);
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

    register_image = function (modal) {
        var param = {
            'conf_name': conf_name,
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
            //Nach der Registrierung muss dder Tabellen-Body neu geladen werden, damit 
            //das registrierte Bild erscheint.
            $(document).trigger("table_refresh_rows", {
                "tabid": 'module_' + conf_name + '_table_images'
            });
        });


    };

    $(document).on("click", ".thumb_bar_item", function () {
        var param = {'filename': $(this).data('filename'),
            'conf_name': conf_name};



        $.post(ajax_url.register_form, param, "json").done(function (d) {
            if (d.succ === 'OK') {
                // alert(d.image_register_form);

                pb_show_modal('Bild registrieren', d.image_register_form, 1000, register_image);
                //show_register_dialog(d.image_register_form);
            } else {
                alert(d.errortext || 'Unbekannter Fehler');
            }

        }).fail(function () {
            alert('Technischer Fehler');
        });
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

});

