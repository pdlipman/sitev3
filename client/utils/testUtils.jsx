import { shallow } from 'enzyme';

export function shallowUntilTarget( // eslint-disable-line import/prefer-default-export
    componentInstance,
    TargetComponent,
    {
        maxTries = 10,
        shallowOptions,
    } = {}) {
    let root = shallow(componentInstance, shallowOptions);

    if (typeof root.type() === 'string') {
        // If type() is a string then it's a DOM Node.
        // If it were wrapped, it would be a React component.
        throw new Error('Cannot unwrap this component because it is not wrapped');
    }

    for (let tries = 1; tries <= maxTries; tries++) {
        if (root.is(TargetComponent)) {
            // Now that we found the target component, render it.
            return root.shallow(shallowOptions);
        }
        // Unwrap the next component in the hierarchy.
        root = root.first().shallow(shallowOptions);
    }

    throw new Error(
        `Could not find ${TargetComponent} in React instance:${componentInstance}; gave up after ${maxTries} tries`,
    );
}
