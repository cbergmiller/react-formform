import React from 'react';
import PropTypes from 'prop-types';
import {assoc, dissoc} from 'ramda';
import classNames from 'classnames';

import {InputConnector} from './input-connector.component';

let instanceCounter = 0;

export class FormForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaultId = `formform-${instanceCounter++}`;
    }

    static propTypes = {
        id: PropTypes.string,
        values: PropTypes.object.isRequired,
        errors: PropTypes.object,
        onValuesChange: PropTypes.func.isRequired,
        onErrorsChange: PropTypes.func,
        isHorizontal: PropTypes.bool,
        className: PropTypes.string,
        col1: PropTypes.number,
        col2: PropTypes.number,
        namePrefix: PropTypes.string,
        encType: PropTypes.string,
    };

    static defaultProps = {
        errors: {},
        col1: 2,
        col2: 10,
        namePrefix: '',
        encType: 'application/x-www-form-urlencoded',
    };

    handleChange = (name, value) => {
        this.props.onValuesChange(assoc(name, value, this.props.values));
    };

    handleFocus = name => {
        this.props.onErrorsChange(dissoc(name, this.props.errors));
    };

    renderFields() {
        return React.Children.map(this.props.children, child => {
            return (
                <InputConnector values={this.props.values}
                                errors={this.props.errors}
                                onChange={this.handleChange}
                                onFocus={this.handleFocus}
                                formId={this.props.id || this.defaultId}
                                isHorizontal={this.props.isHorizontal}
                                col1={this.props.col1}
                                col2={this.props.col2}
                                namePrefix={this.props.namePrefix}>
                    {child}
                </InputConnector>
            );
        });
    }

    render() {
        const className = classNames('form-form', this.props.className, {'form-horizontal': this.props.isHorizontal});

        return (
            <form id={this.props.id || this.defaultId}
                  onSubmit={this.handleSubmit}
                  className={className}
                  ref={this.props.formRef}
                  encType={this.props.encType}>
                {this.renderFields()}
            </form>
        );
    }
}
