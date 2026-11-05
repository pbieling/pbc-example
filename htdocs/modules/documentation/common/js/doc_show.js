//AI assistance by claude.ai

$(document).ready(function () {
    // Module configuration coming from the DOM (data attribute)
    const moduleData = $('#modulcontainer-commondoc').data('commondocmodule');

    // AJAX endpoints for loading document content and search results
    const ajaxUrl = {
        doc_content: `PbClasses/${moduleData.name}/${moduleData.nsp}/MDoc/Ajax/GetDocument.php`,
        doc_search: `PbClasses/${moduleData.name}/${moduleData.nsp}/MDoc/Ajax/GetSearchResult.php`
    };

    // Icon set used for the page tree, taken from the global page config
    const pageTreeIcons = $('body').data('pbconfdata').pg_iconset.page_tree;

    // Tracks the id of the article that was loaded last (null = nothing loaded yet)
    let lastLoadedId = null;

    // If the page was opened with a hash (e.g. #doc_12), remember it once
    let externalHash = getExternalHash();

    // JsTree persists its state (open/closed nodes, selection) under this key
    $.jstree.defaults.state.key = 'jstreedocpublic';

    const pbJstreeConf = {
        tree_name: 'dokutree',
        id_prefix: 'phtml_',
        pbcnf: 'doc'
    };

    $('#dokutree').jstree({
        core: {
            animation: 0,
            multiple: false,
            themes: {
                responsive: true,
                name: 'default',
                variant: 'large'
            }
        },
        plugins: ['state', 'types'],
        types: {
            default: {
                icon: pageTreeIcons.default
            },
            'file-unlocked': {
                icon: pageTreeIcons['file-unlocked']
            },
            'file-locked': {
                icon: pageTreeIcons['file-locked']
            },
            'dir-unlocked': {
                icon: pageTreeIcons['dir-open']
            },
            'dir-locked': {
                icon: pageTreeIcons['dir-open-locked']
            },
            'dir-closed-locked': {
                icon: pageTreeIcons['dir-closed-locked']
            },
            'dir-closed-unlocked': {
                icon: pageTreeIcons['dir-closed']
            }
        }
    })
        .on('activate_node.jstree', function (e, data) {
            if (externalHash) {
                // Consume the external hash once, then load the referenced article
                const id = externalHash.split('_')[1];
                externalHash = null; // reset so it is only used once
                getArticle(id);
            } else {
                data.instance.open_node(data.node);
                const id = data.node.id.split('_')[1];
                window.location.hash = `#doc_${id}`;
                getArticle(id);
            }
        })
        .on('after_close.jstree', function (e, data) {
            // Switch to the "closed" icon variant when a directory node collapses
            const type = data.instance.get_type(data.node);
            if (type === 'dir-locked') {
                data.instance.set_type(data.node, 'dir-closed-locked');
            } else if (type === 'dir-unlocked') {
                data.instance.set_type(data.node, 'dir-closed-unlocked');
            }
        })
        .on('after_open.jstree', function (e, data) {
            // Switch back to the "open" icon variant when a directory node expands
            const type = data.instance.get_type(data.node);
            if (type === 'dir-closed-locked') {
                data.instance.set_type(data.node, 'dir-locked');
            } else if (type === 'dir-closed-unlocked') {
                data.instance.set_type(data.node, 'dir-unlocked');
            }
        })
        .on('ready.jstree', function () {
            loadFirstIfNothingIsLoaded();
        });

    /**
     * Loads an article via AJAX and renders it into the content container.
     * @param {string|number} id
     */
    function getArticle(id) {
        $.post(ajaxUrl.doc_content, { id }, 'json')
            .done(function (d) {
                if (d.succ === 'OK') {
                    $('#doc_content').html(d.content);
                    lastLoadedId = id;
                } else {
                    alert(d.errortext || 'Unbekannter Fehler');
                }
            })
            .fail(function () {
                alert('Technischer Fehler');
            });
    }

    /**
     * When the documentation is loaded the first time, no article is selected yet.
     * JsTree itself restores its state from local storage, so we wait a short
     * moment (until the 'ready' event) to make sure nothing has been loaded
     * automatically before activating a default node.
     */
    function loadFirstIfNothingIsLoaded() {
        let hashId = null;
        const hash = getExternalHash();
        if (hash) {
            hashId = hash.split('_')[1];
        }

        const tree = $('#dokutree').jstree(true);
        if (lastLoadedId !== null) {
            return;
        }

        const id = hashId || 1;
        tree.activate_node(`phtml_${id}`);
        tree.open_node(`phtml_${id}`);
    }

    // Handle the search form submission
    $(document).on('submit', '#f-doc_searchform', function (e) {
        e.preventDefault();

        $.post(ajaxUrl.doc_search, {
            search: $('#doc_searchinput').val(),
            pbcnf: pbJstreeConf.pbcnf
        }, 'json')
            .done(function (d) {
                if (d.succ === 'OK') {
                    $('#doc_content').html(d.content);
                    lastLoadedId = null;
                    window.location.hash = '';
                } else {
                    alert(d.errortext || 'Unbekannter Fehler');
                }
            })
            .fail(function () {
                alert('Technischer Fehler');
            });
    });

    // Intercept internal "#doc_" links and activate the matching tree node instead
    
    window.onhashchange = function () {
        const hash = window.location.hash;
        if (hash.substr(0, 5) !== '#doc_') {
            return;
        }
        const id = hash.split('_')[1];
        const tree = $('#dokutree').jstree(true);
        tree.activate_node(`phtml_${id}`);
        tree.open_node(`phtml_${id}`);
    };

    /**
     * Returns the current URL hash, or null if there is none.
     * @returns {string|null}
     */
    function getExternalHash() {
        const hash = window.location.hash;
        return hash ? hash : null;
    }
});