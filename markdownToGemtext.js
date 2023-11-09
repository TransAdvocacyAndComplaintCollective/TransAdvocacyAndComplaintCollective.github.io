const markdownIt = require('markdown-it')();

// Sample Markdown input
const markdown = `

Some text, *emphasis*, **strong**\
\`code()\`, and ~~scratch that~~.

> Some
> quotes

\`\`\`
const code = "block";
for (let i = 0; i < 10; i++) {
    console.log(i);
}
\`\`\`

*   a list
*   with another item

1.  “Ordered”
2.  List

[x] Checked
[ ] Unchecked

> "In a few moments he was barefoot, his stockings folded in his pockets and his
  canvas shoes dangling by their knotted laces over his shoulders and, picking a
  pointed salt-eaten stick out of the jetsam among the rocks, he clambered down
  the slope of the breakwater."

`
// Function to convert Markdown to Gemtext
function markdownToGemtext(markdown) {
    const tokens = markdownIt.parse(markdown, {});
    return markdownToGemtextTokens(tokens);
}

function markdownToGemtextTokens(tokens) {
    let gemtext = "";
    for (const token of tokens) {

        if (token.type === 'heading_open') {
            const headerLevel = token.tag.length;
            gemtext += token.markup + ' ';
        }
        else if (token.type === 'heading_close') {
            gemtext += "\n";
        }
        else if (token.type === 'text') {
            gemtext += token.content;
        } else if (token.type === 'inline') {
            gemtext += markdownToGemtextTokens(token.children);
        } else if (token.type === 'link_open') {
            const url = token.attrs[0][1];
            gemtext += '\n' + '=> ' + url + ' ';
        } else if (token.type === 'link_close') {
            gemtext += '\n';
        } else if (token.type === 'link_title') {
            gemtext += token.content;
        } else if (token.type === 'softbreak') {
            gemtext += '\n';
        } else if (token.type === 'paragraph_open') {
            gemtext += ''; // Start a new paragraph
        } else if (token.type === 'paragraph_open') {
            gemtext += '\n\n'; // Start a new paragraph
        } else if (token.type === 'list_item_open') {
            gemtext += '* ';
        } else if (token.type === 'blockquote_open') {
            gemtext += "\n" + token.markup;
        } else if (token.type === 'blockquote_close') {
            gemtext += "\n";
        } else if (token.type === 'paragraph_close') {
            gemtext += "";
        } else if (token.type === 'ordered_list_open') {
            gemtext += "* ";
        } else if (token.type === 'ordered_list_close') {
            gemtext += "\n";
        } else if (token.type === 'bullet_list_open') {
            gemtext += "\n";
        } else if (token.type === 'bullet_list_close') {
            gemtext += "\n";
        } else if (token.type === 'list_item_close') {
            gemtext += "\n";
        } else if (token.type === 'strong_open') {
            gemtext += '\x1b[1m';
        } else if (token.type === 'strong_close') {
            gemtext += '\x1b[0m';
        } else if (token.type === 'em_open') {
            gemtext += '\x1b[3m';
        } else if (token.type === 'em_close') {
            gemtext += '\x1b[0m';
        } else if (token.type === 's_open') {
            gemtext += '\x1b[9m';
        } else if (token.type === 's_close') {
            gemtext += '\x1b[0m';
        } else if (token.type === 'code_inline') {
            gemtext += `\x1b[7m${token.content}\x1b[0m`;
        } else if (token.type === 'fence') {
            const codeLanguage = token.info;
            const codeContent = token.content;

            // Customize the ANSI escape codes based on your preferences
            // For example, you can use \x1b[7m for reverse video as a common choice
            // to indicate code blocks.
            gemtext += `\x1b[7m${codeLanguage}\n${codeContent}\x1b[0m\n`;
        }
        else {
            console.log(token);
        }
    }

    return gemtext;
}

const gemtext = markdownToGemtext(markdown);

console.log(gemtext);
