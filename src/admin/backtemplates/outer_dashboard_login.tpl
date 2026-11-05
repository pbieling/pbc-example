[main]
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <link rel="icon" href="/favicon.ico">

        <title>LOGIN</title>

        <!-- Bootstrap core CSS -->
        <link href="{DATA_SUBROOT}/3rd/node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">
        {CSS_FILES}
    </head>

    <body class="loginbgimage" data-subroot="{DATA_SUBROOT}" data-pbconfdata='{PBCONFDATA}'>
        {TOOLBAR}
        <div class="container-fluid">
            {MESSAGE}
            {ERROR}    
            {CONTENT}  
        </div>




        <footer class="footer">
            <div class="container">
                {MYFOOTER}
            </div>
        </footer>
        <script src="{DATA_SUBROOT}/3rd/node_modules/jquery/dist/jquery.min.js"></script>    
        {JS_FILES}
    </body>
</html>


#######################################
[toolbar]
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/">{OUTER_TPL_PROJECT_NAME}</a>

        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>{LOGIN}</li>
            </ul>
        </div>
    </div>
</nav>


[login]
#<a href="{DATA_SUBROOT}/admin/logout.php">{USER_REALNAME}</a>
<a id="user-logged-in" href="{SELF}?grlogout"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> {USER_REALNAME}</a>



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
<div>
    {ERROR_ROWS}
</div>
[error_item]
<p class="text-bg-danger p-3">{ERROR_ITEM}</p>


[css_files]
<link rel="stylesheet" type="text/css" href="{FILE}">
!
[js_files]
<script type="text/javascript" src="{FILE}"></script>
!