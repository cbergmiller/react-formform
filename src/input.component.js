import React from 'react';

import {Group} from './group.component';


export class Input extends React.Component {
    handleChange = event => {
        this.props.onChange(event.target.value);
    };

    render() {
        const {onChange, error, label, isHorizontal, col1, col2, show, addonPrepend, addonAppend, ...inputProps
        } = this.props;

        return (
            <Group controlId={this.props.id}
                   label={label}
                   isHorizontal={isHorizontal}
                   helpText={error}
                   validationState={error ? 'error' : null}
                   col1={col1}
                   col2={col2}>
                <input onChange={this.handleChange}
                       className="form-control" {...inputProps}/>
            </Group>
        );
    }
}

