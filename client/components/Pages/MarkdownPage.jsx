import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-remarkable';
import hljs from 'highlight.js';

import './MarkdownPage.css';

export default class MarkdownPage extends React.Component {
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
                        highlight(str, lang) {
                            if (lang && hljs.getLanguage(lang)) {
                                try {
                                    return hljs.highlight(lang, str).value;
                                } catch (err) {
                                    console.log(err);
                                }
                            }

                            try {
                                return hljs.highlightAuto(str).value;
                            } catch (err) {
                                console.log(err);
                            }

                            return ''; // use external default escaping
                        },
                    }}
                >
                    {content}
                </Markdown>
            </div>
        );
    }
}