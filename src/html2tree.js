export function html2tree(html) {
    const startTag = /<([a-zA-Z_][\w\-\.]*)((?:\s+([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))*)\s*(\/?)>/;

    const endTag = /<\/([a-zA-Z_][\w\-\.]*)>/;

    const attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g;

    const bufArray = [];
    const results = {
        node: 'root',
        children: []
    };
    let chars;
    let match;
    let last;
    while (html && last != html) {
        last = html;
        chars = true;
        if (html.indexOf('</') == 0) {
            match = html.match(endTag);
            if (match) {
                chars = false;
                html = html.substring(match[0].length);
                match[0].replace(endTag, parseEndTag);
            }
        } else if (html.indexOf('<') == 0) {
            match = html.match(startTag);
            if (match) {
                chars = false;
                html = html.substring(match[0].length);
                match[0].replace(startTag, parseStartTag);
            }
        }
        if (chars) {
            let index = html.indexOf('<');
            let text;
            if (index < 0) {
                text = html;
                html = '';
            } else {
                text = html.substring(0, index);
                html = html.substring(index);
            }
            const node = {
                text
            };
            pushChild(node);
        }
    }

    function pushChild(node) {
        if (bufArray.length === 0) {
            results.children.push(node);
        } else {
            const parent = bufArray[bufArray.length - 1];
            if (typeof parent.children == 'undefined') {
                parent.children = [];
            }
            if (node.text) {
                parent.text = node.text;
                return;
            }
            parent.children.push(node);
        }
    }

    function parseStartTag(tag, tagName, rest) {
        tagName = tagName.toLowerCase();

        const ds = {};
        const attrs = {};
        let unary = !!arguments[7];

        const node = {
            tag: tagName
        };
        rest.replace(attr, function (match, name) {
            const value = arguments[2] ?
                arguments[2] :
                arguments[3] ?
                arguments[3] :
                arguments[4] ?
                arguments[4] :
                '';
            attrs[name] = value;
        });
        if (Object.keys(attrs).length > 0) {
            node.attributes = attrs;
        }
        if (tag.indexOf('/>') > 0) {
            node.selfClose = true;
        } else {
            node.selfClose = false;
        }

        if (!unary) {
            bufArray.push(node);
        } else {
            pushChild(node);
        }
    }

    function parseEndTag(tag, tagName) {
        let pos = 0;
        for (pos = bufArray.length - 1; pos >= 0; pos--) {
            if (bufArray[pos].tag == tagName) {
                break;
            }
        }
        if (pos >= 0) {
            pushChild(bufArray.pop());
        }
    }
    if (results.children) {
        return results.children[0];
    } else {
        return {};
    }
}