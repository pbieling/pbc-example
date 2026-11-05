function pbtoast(type, message, mergeObj = {}) {
    
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,

        "preventDuplicates": false,
        "onclick": null,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "show",
        "hideMethod": "hide"
    };
    
    if (type === 'success') {
        toastr.options.showDuration = "300";
        toastr.options.hideDuration = "1000";
        toastr.options.timeOut = "2000";
        toastr.options.extendedTimeOut = "1000";  
        toastr.options.positionClass = "toast-top-right";
        
        $.extend( toastr.options, mergeObj);
        
        
        toastr["success"](message);
        return;
    }
    
    if (type === 'short_error') {
        toastr.options.showDuration = "1000";
        toastr.options.hideDuration = "1000";
        toastr.options.timeOut = "4000";
        toastr.options.extendedTimeOut = "1000";  
        toastr.options.positionClass = "toast-top-right";
        $.extend( toastr.options, mergeObj);
                
        toastr["error"](message);
        return;
    }
    
    if (type === 'error') {
        toastr.options.showDuration = "0";
        toastr.options.hideDuration = "0";
        toastr.options.timeOut = "0";
        toastr.options.extendedTimeOut = "0";  
        toastr.options.positionClass = "toast-top-full-width";
        $.extend( toastr.options, mergeObj);
                
        toastr["error"](message);
        return;
    }
}
