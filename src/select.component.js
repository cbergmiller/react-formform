import React from 'react';
import PropTypes from 'prop-types';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';

import {Group} from './group.component';


export class Select extends React.Component {
    static propTypes = {
        choices: PropTypes.array,
        blankChoice: PropTypes.string,
        multiple: PropTypes.bool,
    };

    static defaultProps = {
        choices: [],
    };

    handleChange = event => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {
            onChange, error, label, isHorizontal, col1, col2, show, choices, value, blankChoice, addonPrepend,
            addonAppend, ...inputProps
        } = this.props;

        const options = choices.map((choice, index) => {
            const key = `${index}-${choice[0]}`;

            return isArray(choice[1]) ? (
                <optgroup label={choice[0]} key={key}>
                    {choice[1].map((c, i) =>
                        <option key={`${i}-${c[0]}`} value={c[0]}>
                            {c[1]}
                        </option>
                    )}
                </optgroup>
            ) : (
                <option key={key} value={choice[0]}>
                    {choice[1]}
                </option>
            );
        });
        if (isString(blankChoice)) {
            options.splice(0, 0, <option key="empty" value="">{blankChoice}</option>);
        }

        return (
            <Group controlId={this.props.id}
                   label={label}
                   isHorizontal={isHorizontal}
                   helpText={error}
                   validationState={error ? 'error' : null}
                   col1={col1}
                   col2={col2}>
                <select value={value !== null ? value : ''}
                        onChange={this.handleChange}
                        className="form-control" {...inputProps}>
                    {options}
                </select>
            </Group>
        );
    }
}

