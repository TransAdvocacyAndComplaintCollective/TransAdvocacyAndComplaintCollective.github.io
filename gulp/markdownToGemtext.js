const markdownIt = require('markdown-it')();
const hljs = require('highlight.js');
const gulp = require("gulp");
const matter = require("gray-matter");
const livereload = require('gulp-livereload');

const each = require("gulp-each");
const rename = require("gulp-rename");
// Function to convert Markdown to Gemtext
function markdownToGemtext(markdown) {
    const tokens = markdownIt.parse(markdown, {});
    return markdownToGemtextTokens(tokens);
}


// Function to convert HTML to ASCII
function htmlToAscii(html) {
    return html
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}

// Function to convert HTML to ANSI escape codes
function htmlToAnsi(html) {
    return htmlToAscii(html
        .replace(/<span class="hljs-comment">/g, '\x1b[34m') // Blue (comments)
        .replace(/<span class="hljs-keyword">/g, '\x1b[35m') // Magenta (keywords)
        .replace(/<span class="hljs-string">/g, '\x1b[32m') // Green (strings)
        .replace(/<span class="hljs-number">/g, '\x1b[31m') // Red (numbers)
        .replace(/<span class="hljs-name">/g, '\x1b[36m')   // Cyan (function names, etc.)
        .replace(/<span class="hljs-title">/g, '\x1b[36m')
        .replace(/<span class="hljs-params">/g, '\x1b[36m')
        .replace(/<span class="hljs-built_in">/g, '\x1b[36m')
        .replace(/<span class="hljs-title function_">/g, '\x1b[36m')
        .replace(/<\/span>/g, '\x1b[0m')); // Reset color

    // You can add more CSS classes and corresponding ANSI escape codes as needed.
}

function markdownToGemtextTokens(tokens) {
    let gemtext = "";
    let strong = false;
    let em = false;
    let s = false;
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
            strong = true;
            gemtext += '\x1b[1m';
            if (strong) {
                gemtext += "[1m";
            }
            if (em) {
                gemtext += "\x1b[3m";
            }
            if (s) {
                gemtext += "\x1b[9m";
            }
        } else if (token.type === 'strong_close') {
            strong = false;
            gemtext += '\x1b[0m';
        } else if (token.type === 'em_open') {
            em = true;
            gemtext += '\x1b[3m';
            if (strong) {
                gemtext += "[1m";
            }
            if (em) {
                gemtext += "\x1b[3m";
            }
            if (s) {
                gemtext += "\x1b[9m";
            }
        } else if (token.type === 'em_close') {
            em = false;
            gemtext += '\x1b[0m';
        } else if (token.type === 's_open') {
            s = true;
            gemtext += '\x1b[9m';
        } else if (token.type === 's_close') {
            s = false;
            gemtext += '\x1b[0m';
            if (strong) {
                gemtext += "[1m";
            }
            if (em) {
                gemtext += "\x1b[3m";
            }
            if (s) {
                gemtext += "\x1b[9m";
            }
        } else if (token.type === 'code_inline') {
            gemtext += `\x1b[7m${token.content}\x1b[0m`;
        } else if (token.type === 'fence') {
            const codeLanguage = token.info;
            // console.log(token);
            // console.log("codeLanguage", codeLanguage);
            let codeContent = token.content;
            const highlightedCode = hljs.highlight(codeContent, { language: codeLanguage, ignoreIllegals: true }).value;
            codeContent = htmlToAnsi(highlightedCode);
            // Customize the ANSI escape codes based on your preferences
            // For example, you can use \x1b[7m for reverse video as a common choice
            // to indicate code blocks.
            gemtext += `\x1b[7m${codeLanguage}\n${codeContent}\x1b[0m\n`;
        }
        else {
            // console.log(token);
        }
    }
    // console.log(gemtext);
    return gemtext;
}


// markdownToGemtext(markdown);


// Generate HTML pages for each article using Markdown content and an EJS template
function generateArticleGemPages(cb) {
    return gulp
        .src("./src/articles/*.md")
        .pipe(
            each(function (content, file, callback) {
                const { data, content: markdownContent } = matter(content);
                const fileHistory = file.history[0];
                const articleSlug = fileHistory.slice(0, -3);
                const date = new Date(Date.parse(data.publishDate))
                let renderedPage = markdownToGemtext(markdownContent)

                callback(null, renderedPage);
            })
        )
        .pipe(rename({ extname: ".gemtext" }))
        .pipe(gulp.dest("./output/articles/")).pipe(livereload());
}

exports.generateArticleGemPages = generateArticleGemPages;
