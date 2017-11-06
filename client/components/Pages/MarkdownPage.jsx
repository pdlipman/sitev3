import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';

import './MarkdownPage.css';

export function highlightCode(codeBlock, language) {
    const renderedCodeBlock = hljs.getLanguage(language)
        ? hljs.highlight(language, codeBlock).value
        : hljs.highlightAuto(codeBlock).value;

    return renderedCodeBlock; // use external default escaping
}

export default class MarkdownPage extends React.Component { // eslint-disable-line react/prefer-stateless-function,max-len
    static propTypes = {
        content: PropTypes.string.isRequired,
    };

    render() {
        const {
            content,
        } = this.props;

        return (
            <div
                className='markdown-body'
            >
                <Markdown
                    options={{
                        typographer: true,
                        quotes: '“”‘’',
                        html: true,
                        xhtmlOut: true, // Use '/' to close single tags (<br />)
                        breaks: true, // Convert '\n' in paragraphs into <br>
                        highlight: highlightCode,
                    }}
                >
                    {content}
                </Markdown>
            </div>
        );
    }
}
