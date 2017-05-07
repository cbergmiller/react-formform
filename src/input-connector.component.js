import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash/isFunction';
import {has} from 'ramda';

/**
 * InputConnector connects a child input element to the form-state by passing additional props.
 */
export class InputConnector extends React.Component {
    static propTypes = {
        values: PropTypes.object.isRequired,
        errors: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        onFocus: PropTypes.func.isRequired,
        formId: PropTypes.string,
        isHorizontal: PropTypes.bool,
        col1: PropTypes.number,
        col2: PropTypes.number,
        namePrefix: PropTypes.string,
    };

    /**
     * Bound getter function that is passed to functions in the IFieldConfig as an argument so
     * they can access form-values by name.
     */
    _getValueByName = name => {
        const _name = this.props.namePrefix ? this.props.namePrefix + name : name;
        return this.props.values[_name];
    };

    /**
     * Evaluate a getter function for a field-property.
     */
    _getProperty(props, name) {
        const prop = props[name];

        if (isFunction(prop)) {
            return prop(this._getValueByName);
        }
        return prop;
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
        const inputChild = this.getInputChild();
        const inputChildProps = inputChild.props;
        const name = inputChildProps.name;

        if (has('show', inputChildProps) && !this._getProperty(inputChildProps, 'show')) {
            return null;
        }

        return React.cloneElement(
            inputChild, {
                value: this.props.values[name] || '',
                onChange: this.handleChange,
                onFocus: this.handleFocus,
                id: inputChild.props.id || `${this.props.formId}-${name}`,
                error: this.props.errors[name],
                isHorizontal: this.props.isHorizontal,
                col1: this.props.col1,
                col2: this.props.col2,
            }
        );
    }
}
