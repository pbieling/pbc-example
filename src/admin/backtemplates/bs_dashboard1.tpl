[main]
<!doctype html>
<html lang="de" class="h-100">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="icon" href="/favicon.ico">

        <title>{PAGETITLE}</title>

        <!-- Bootstrap core CSS -->
        <link href="{DATA_SUBROOT}/3rd/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        <link href="{DATA_SUBROOT}/3rd/node_modules/bootstrap-icons/font/bootstrap-icons.min.css" rel="stylesheet" type="text/css">

        {CSS_FILES}
    </head>

    <body data-subroot="{DATA_SUBROOT}" data-pbconfdata='{PBCONFDATA}'>
        {TOOLBAR}

        <div class="sidebar open"><button type="button" class="pbclose btn-close pt-2" aria-label="Close"></button>
            {NAVI}

        </div>
        <div class="main withsidebar">
            {MESSAGE}
            {ERROR}    
            {BREADCRUMBNAVI}
            {CONTENT}
        </div> 
        <footer class="footer">
            <div class="container">
                <p>Peter Bieling · internet &amp; multimedia · <a href="https://p-bieling.de/">p-bieling.de</a> · Am Sohlenkamp 26 · 58239 Schwerte · <i class="fas fa-phone"></i> <a href="tel:+492304257621">02304 / 257621</a> · <a href="mailto:pb@p-bieling.de">pb@p-bieling.de</a> · <a href="https://p-bieling.de/kontakt.php">Kontakt</a></p>
            </div>
        </footer>
        <script src="{DATA_SUBROOT}/3rd/node_modules/jquery/dist/jquery.min.js"></script>    
        <script src="{DATA_SUBROOT}/3rd/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="{DATA_SUBROOT}/admin/js/main.js"></script>
        {JS_FILES}
    </body>
</html>


#######################################
[toolbar_test]
<nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top">
    <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleXxl" aria-controls="navbarsExampleXxl" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarsExampleXxl">
            <a class="navbar-brand" href="/">{OUTER_TPL_PROJECT_NAME}</a>

            <ul class="navbar-nav ml-auto">
                {LOGIN}
            </ul>
        </div>
    </div>

</nav>

[toolbar]

<nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top ps-2 flex-wrap flex-lg-nowrap">
    <div class="container-fluid">
        <div class="col">
            <button class="navbar2-toggler" type="button">
                <span class="navbar2-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="/">{OUTER_TPL_PROJECT_NAME}</a>

        </div>
        <div class="col-3" ><ul style="white-space: nowrap;" class="navbar-nav float-end">
                {LOGIN}
            </ul></div>
    </div>
</nav>



[login]
<li class="nav-item">
    <a id="user-logged-in" href="{SELF}?grlogout" class="nav-link"><i class="bi bi-person-circle"></i> {USER_REALNAME}</a>
</li>



####### Meldungen und Fehler ################################################
[message]
<div class="message">
    <h4>Hinweise</h4>
    <ul>
        {MESSAGE_ROWS}
    </ul>
</div>
[message_item]
<li>{MESSAGE_ITEM}</li>
##########
[error]
<div class="error">
    <h4>Fehlermeldungen</h4>
    <ul>
        {ERROR_ROWS}
    </ul>
</div>
[error_item]
<li>{ERROR_ITEM}</li>


[css_files]
<link href="{FILE}" rel="stylesheet" type="text/css">
!
[js_files]
<script{PARAMS} src="{FILE}"></script>
!