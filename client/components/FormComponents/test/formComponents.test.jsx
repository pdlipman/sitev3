import { shallow } from 'enzyme';
import { renderField } from '../formComponents';

describe('formComponent', () => {
    test('formComponent renders', () => {
        const label = 'Test Label';
        const type = 'text';
        const meta = {
            touched: false,
            error: '',
        };

        const testField = renderField({ label, type, meta });
        const wrapper = shallow(testField);
        expect(wrapper).toMatchSnapshot();
    });

    test('formComponent renders error', () => {
        const label = 'Test Label';
        const type = 'text';
        const meta = {
            touched: true,
            error: 'Error: Test Error',
        };

        const testField = renderField({ label, type, meta });
        const wrapper = shallow(testField);
        expect(wrapper).toMatchSnapshot();
    });
});
