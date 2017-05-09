import expect from 'expect';
import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';

import {FormForm, Input} from 'src/';

describe('FormForm', () => {
    let node;

    beforeEach(() => {
        node = document.createElement('div');
    });

    afterEach(() => {
        unmountComponentAtNode(node);
    });

    it('renders an empty form', () => {
        render(<FormForm values={{}} onValuesChange={() => {}}/>, node, () => {
            expect(node.children.length).toEqual(1);

            const form = node.children[0];
            expect(form.tagName).toEqual('FORM');
            expect(form.innerHTML).toEqual('');
        });
    });

    it('renders an input with a default value', () => {
        render(
            (
                <FormForm values={{}} onValuesChange={() => {}}>
                    <Input name="name" type="text" value="test" label="Name"/>
                </FormForm>
        ), node, () => {
            const form = node.children[0];
            expect(form.children.length).toEqual(1);
            const formGroup = form.children[0];
            expect(formGroup.children.length).toEqual(2);
            const input = formGroup.children[1];
            expect(input.tagName).toEqual('INPUT');
            expect(input.getAttribute('value')).toEqual('test');
        });
    });

    it('renders an input with a controlled value', () => {
        render(
            (
                <FormForm values={{name: 'foo'}} onValuesChange={() => {}}>
                    <Input name="name" type="text" value="test" label="Name"/>
                </FormForm>
            ), node, () => {
                const form = node.children[0];
                const formGroup = form.children[0];
                const input = formGroup.children[1];
                expect(input.getAttribute('value')).toEqual('foo');
            });
    });
});
