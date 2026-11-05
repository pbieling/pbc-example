# prism highlighting muss für Elemente neu angestoßen werden, die per Ajax nachgeladen werden



[code_css]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-css">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!


[code_pbtpl]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-smarty">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!

[code_php]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-php">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!

[code_html]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-markup">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!

[code_javascript]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-javascript">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!

[code_xml]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-xml">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!

[code_sql]
!
<pre class="line-numbers"><code id="codeid-{ELEMENT_ID}" class="language-sql">{CODE}</code></pre>
<script>Prism.highlightElement($('#codeid-{ELEMENT_ID}')[0]);</script>
!