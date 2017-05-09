import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import {has, propOr} from 'ramda';

/**
 * InputConnector connects a child input element to the form-state by passing additional props.
 */
export class InputConnector extends React.Component {
    static propTypes = {
        values: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        formId: PropTypes.string.isRequired,
        isHorizontal: PropTypes.bool,
        col1: PropTypes.number,
        col2: PropTypes.number,
        namePrefix: PropTypes.string.isRequired,
    };

    /**
     * Bound getter that is passed to function props as an argument so
     * they can access form-values by name.
     */
    getValueByName = name => {
        const _name = this.props.namePrefix ? this.props.namePrefix + name : name;
        return this.props.values[_name];
    };

    /**
     * Evaluate a field-property that may be a function.
     */
    getProperty(props, name) {
        const prop = props[name];

        return isFunction(prop) ? prop(this.getValueByName) : prop;
    }

    getInputChild() {
        return React.Children.only(this.props.children);
    }

    handleChange = value => {
        const name = this.getInputChild().props.name;
        this.props.onChange(name, value);
    };

    handleFocus = () => {
        const name = this.getInputChild().props.name;
        this.props.onFocus(name);
    };

    render() {
        const {values, errors, isHorizontal, col1, col2, namePrefix, formId} = this.props;
        const inputChild = this.getInputChild();
        const inputChildProps = inputChild.props;
        const name = namePrefix + inputChildProps.name;

        if (has('show', inputChildProps) && !this.getProperty(inputChildProps, 'show')) {
            return null;
        }

        return React.cloneElement(
            inputChild, {
                name,
                value: propOr(defaultValue(inputChildProps), name, values),
                error: isArray(errors[name]) ? errors[name][0] : errors[name],
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                id: inputChildProps.id || `${formId}-${name}`,
                isHorizontal,
                col1,
                col2,
                // dynamic props
                disabled: this.getProperty(inputChildProps, 'disabled'),
                label: this.getProperty(inputChildProps, 'label'),
                placeholder: this.getProperty(inputChildProps, 'placeholder'),
                addonPrepend: this.getProperty(inputChildProps, 'addonPrepend'),
                addonAppend: this.getProperty(inputChildProps, 'addonAppend'),
            }
        );
    }
}

const defaultValue = propOr('', 'value');
