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

                {MYFOOTER}
            </div>
        </footer>
        <script src="{DATA_SUBROOT}/3rd/node_modules/jquery/dist/jquery.min.js"></script>    
        <script src="{DATA_SUBROOT}/3rd/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
        <script src="{DATA_SUBROOT}/js/main.js"></script>
        {JS_FILES}
    </body>
</html>


#######################################
[toolbar]
<nav class="navbar navbar-expand-xxl navbar-dark bg-dark fixed-top ps-2 flex-wrap flex-lg-nowrap">
    <div class="container-fluid">
        <div class="col">
            <button class="navbar2-toggler" type="button">
                <span class="navbar2-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="/">{OUTER_TPL_PROJECT_NAME}</a>

        </div>
{LANGUAGE_SELECTION}
        <div class="col-2" >
            <ul style="white-space: nowrap;" class="navbar-nav float-end">
                {LOGIN}
            </ul>
        </div>
    </div>
</nav>

[login_old]
<li class="nav-item">
    <a id="user-logged-in" href="{SELF}?grlogout" class="nav-link"><i class="{PBCICON_USER}"></i> {USER_REALNAME}</a>
</li>

[login]

<li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle"
       href="#"
       id="navbarLoginDropdown"
       role="button"
       data-bs-toggle="dropdown"
       aria-expanded="false"><i class="{PBCICON_USER}"></i> {USER_REALNAME}
</a>

<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarLoginDropdown">
    <li>
        <a class="dropdown-item" href="{SELF}?grlogout">
            <i class="{PBCICON_LOGOUT}"></i> <span>Logout</span>
        </a>
    </li>
    # <li>
        #     <a class="dropdown-item" href="/settings.php">
            #         <i class="{PBCICON_SETTINGS}"></i> <span>Einstellungen</span>
            #     </a>
        # </li>
</ul>
</li>



##########
[language_selection]
        <div class="col-1">
            <form id="f-language-selection">
            <select id="languageselection" name="languageselection">
{OPTIONS}
            </select>
            </form>
        </div>   

[option_standard]
<option{SELECTION_ATTR} value="{OPTION_VALUE}">{OPTION_LABEL}</option>



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