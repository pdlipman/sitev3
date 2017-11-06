import React from 'react';
import { shallow } from 'enzyme';

import MarkdownPage, { highlightCode } from '../MarkdownPage.jsx';

describe('Pages/MarkdownPage.jsx', () => {
    const testMarkdown = '### Hello Markdown';
    test('MarkdownPage should render properly', () => {
        const wrapper = shallow(
            <MarkdownPage
                content={testMarkdown}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });

    test('MarkdownPage highlightCode static function', () => {
        const testCodeBlock = 'console.log("Hello World");';
        const testLanguage = 'javascript';

        expect(highlightCode(testCodeBlock, testLanguage)).toMatchSnapshot();
        expect(highlightCode(testCodeBlock)).toMatchSnapshot();
    });
});
