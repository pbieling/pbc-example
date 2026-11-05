[main]
<p><small>Dokument-Nr. {DOCINDEX_ID} - Keywords: <strong>{KEYWORDS}</strong></small></p>


<h3>{DOCINDEX_LABEL}</h3>
<p class="doc-teaser">{TEASER}</p>

<div id="doc-maintext">{MAINTEXT}</div>

{PREVNEXT_NAVI}

#<div id="prevnext-navi"><pre>{PREVNEXT_NAVI}</pre></div>

############# Navigation unter dem Text ###################################

[prevnext_container]
{CHILD_BLOCK}
<div class="container" id="doc-bottomnavigation">
    <div class="row">
        <div id="doc-bottomnavigation-up" class="col text-center">{UPLINK}</div>
    </div>
    <div class="row">
        <div id="doc-bottomnavigation-prev" class="col text-left">{PREVLINK}</div>
        <div id="doc-bottomnavigation-next" class="col text-right">{NEXTLINK}</div>
    </div>    
</div>

[prevlink]
<a class="doclink" href="#doc_{ID}"><i class="far fa-arrow-alt-circle-left"></i> {LABEL}</a>

[nextlink]
<a class="doclink" href="#doc_{ID}"><i class="far fa-arrow-alt-circle-right"></i> {LABEL}</a>

[uplink]
<a class="doclink" href="#doc_{ID}"><i class="far fa-arrow-alt-circle-up"></i> {LABEL}</a>

################
[child_block]
<div id="doc-child-block"><small style="font-weight: bold;">Untergeornete Dokumente in dieser Kategorie: </small>

<ul id="doc-child-items" class="list-unstyled">
        {CHILD_ITEMS}</ul>
</div>
    
[child_item]
  <li><a href="#doc_{CHILD_ID}">{CHILD_LABEL}</a>
    {CHILD_TEASER}</li>