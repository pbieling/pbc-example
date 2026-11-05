function pb_show_modal(title, content, width, fnc, submLabel, param_obj) {
    fnc = (typeof fnc !== 'undefined') ? fnc : null;
    let submitLabel;
    if (typeof submLabel === 'string') {
        submitLabel = submLabel;
    } else {
        submitLabel = 'Send';
    }
    if  (typeof param_obj !== 'object') {
        param_obj = {
           
        };
    };
    if (! param_obj.lang_map) {
        param_obj.lang_map = {};
    }
    const cancelLabel = param_obj.lang_map.cancel || 'Abbrechen';
   
    const subm_button = (submitLabel) ? '<button type="submit" class="btn btn-primary">' + submitLabel + '</button>' : '';
    bootstrap.showModal({
        title: title,
        body: content,
        modalDialogClass: 'mdialog-' + width,
        footer: '<button type="button" class="btn btn-link" data-bs-dismiss="modal">' + cancelLabel + '</button>' + subm_button,
        onCreate: function (modal) {
            makeModalDraggable(modal.element);

            modal.element.addEventListener('shown.bs.modal', function () {
                 $(document).trigger("bsmodal-shown", {"element": $(this)});
                // Get all inputs, textareas, selects
                const fields = this.querySelectorAll('input, textarea, select');
                if (! fields) {
                    return;
                }
                
                // Find the first visible one
                const firstVisible = Array.from(fields).find(el => {
                    return el.offsetParent !== null && !el.disabled;
                });

                if (firstVisible) {
                    firstVisible.focus();
                }

               
            });



            if (subm_button) {
                modal.element.querySelector("button[type='submit']").addEventListener("click", function (event) {
                    event.preventDefault();
                    /*
                    modal.footerElement.querySelectorAll('button').forEach(button => {
                        button.disabled = true;
                    });
                     * 
                     */
                    pbmodal_footerbuttonsDisabled(modal);
                    if (fnc) {
                        fnc(modal, param_obj);
                    } else {
                        modal.hide();
                    }
                });
            } else if (fnc) { //Es gibt keinen Submitbutton. Wenn eine Funktion übergeben wird wird die
                //ausgeführt
                fnc(modal, param_obj);
            }

        },
        onDispose: function (modal) {
            if (param_obj && param_obj.close_fnc) {
                param_obj.close_fnc(modal, param_obj);
            }
                if (param_obj && typeof param_obj['dispose_fnc'] !== 'undefined') {
                    param_obj['dispose_fnc']();
                }
            
            
            
            
            $(document).trigger("bsmodal-hide", {"element": modal.element});
        }
    });
    //ChatGPT and me
    function makeModalDraggable(modal) {
        const header = modal.querySelector(".modal-header");
        if (!header)
            return; // Sicherheitscheck

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        header.style.cursor = "grab";
        header.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - modal.offsetLeft;
            offsetY = e.clientY - modal.offsetTop;
            document.addEventListener("mousemove", mouseMoveHandler);
            document.addEventListener("mouseup", mouseUpHandler);
        });
        function mouseMoveHandler(e) {
            if (!isDragging)
                return;
            modal.style.left = (e.clientX - offsetX) + "px";
            modal.style.top = (e.clientY - offsetY) + "px";
            header.style.cursor = "grabbing";
        }

        function mouseUpHandler() {
            isDragging = false;
            document.removeEventListener("mousemove", mouseMoveHandler);
            document.removeEventListener("mouseup", mouseUpHandler);
            header.style.cursor = "grab";
        }

    }
}

function pbmodal_footerbuttonsEnabled(modal) {
    modal.footerElement.querySelectorAll('button').forEach(button => {
       button.disabled = false;
   });   
}
function pbmodal_footerbuttonsDisabled(modal) {
    modal.footerElement.querySelectorAll('button').forEach(button => {
       button.disabled = true;
   });   
}




