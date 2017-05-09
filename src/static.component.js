import React from 'react';
import PropTypes from 'prop-types';

import {Group} from './group.component';

/**
 * Plain text with a label.
 */
export class Static extends React.Component {
    static propTypes = {
        fmtValue: PropTypes.func,
    };

    render() {
        const {error, label, isHorizontal, col1, col2, value, fmtValue} = this.props;

        return (
            <Group controlId={this.props.id}
                   label={label}
                   isHorizontal={isHorizontal}
                   helpText={error}
                   validationState={error ? 'error' : null}
                   col1={col1}
                   col2={col2}>
                <p className="form-control-static">
                    {fmtValue ? fmtValue(value) : value}
                </p>
            </Group>
        );
    }
}

