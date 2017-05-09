import React from 'react';
import classNames from 'classnames';


export class Checkbox extends React.Component {
    handleChange = event => {
        this.props.onChange(!this.props.value);
    };

    render() {
        const {onChange, error, label, isHorizontal, col1, col2, value, show, addonPrepend, addonAppend, ...inputProps
        } = this.props;

        return (
            <div className={classNames({'form-group': isHorizontal}, error ? 'error' : null)}>
                <div className={isHorizontal ? `col-sm-offset-${col1} col-sm-${col2}` : undefined}>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"
                                   checked={value || false}
                                   onChange={this.handleChange}
                                   {...inputProps}/>
                            {label}
                        </label>
                    </div>
                    {error ? <span className="help-block">{error}</span> : null}
                </div>
            </div>
        );
    }
}

