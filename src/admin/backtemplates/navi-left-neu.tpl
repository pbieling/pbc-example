################################################

################################################
[outer_navi]
#<nav class="navbar nav nav-sidebar navbar-toggleable-md navbar-expand-md">
<ul  class="nav-sidebar list-unstyled components ps-2 pt-2">{LINKS}</ul>
#</nav>

[navi]
<ul id="{PARENT}" class="nav list-unstyled level-{LEVEL}{CLASSES}">{LINKS}</ul>


[links]
<li class="nav-item level-{LEVEL}{CLASSES}"><a class="nav-link" href="/{URL}">{LISTARROW} {LABEL}</a>{NEXTLEVEL}</li>
!
[group]
<li  class="nav-item level-{LEVEL}{CLASSES}"><a class="nav-link" data-bs-toggle="collapse" href="#g{ID}">{LISTARROW} {LABEL}
</a>{NEXTLEVEL}</li>


### Eine ausgeklappte Elterngruppe soll nicht eingklappt werden können!
[parent_group]
<li  class="nav-item level-{LEVEL}{CLASSES} disabled"><a class="nav-link" href="javascript:return false;">{LISTARROW} {LABEL}
</a>{NEXTLEVEL}</li>



[links_akt]
<li class="nav-item level-{LEVEL} active"><a class="nav-link" href="/{URL}">{LISTARROW} {LABEL}</a>{NEXTLEVEL}</li>
!


[icon_collapsed]
#<i class="pbnavicn bi bi-folder-fill"></i>
<i class="pbnavicn {PBCICON_FOLDER_CLOSE}"></i>


[icon_expanded]
<i class="pbnavicn {PBCICON_FOLDER_OPEN}"></i>

[icon_page]
<i class="pbnavicn {PBCICON_FILE}"></i>
