import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


/**
 * Overlay trigger with the ability to be disabled.

 class CustomOverlayTrigger extends OverlayTrigger {
    show() {
        if (!this.props.disabled) {
            super.show();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled && !this.props.disabled) {
            super.hide();
        }
    }
}
 */


/**
 * The Group component wraps form-input elements with support for addons and inline/horizontal forms.
 */
export class Group extends React.Component {
    static propTypes = {
        controlId: PropTypes.string.isRequired,
        label: PropTypes.string,
        helpText: PropTypes.string,
        validationState: PropTypes.oneOf(['success', 'warning', 'error']),
        isHorizontal: PropTypes.bool,
        col1: PropTypes.number,
        col2: PropTypes.number,
    };

    static defaultProps = {
        label: '',
        error: null,
        isHorizontal: false,
        col1: 2,
        col2: 10,
    };

    hasAddons() {
        const {addonAppend, addonPrepend, buttonAppend, buttonPrepend} = this.props;
        return !!(addonAppend || addonPrepend || buttonPrepend || buttonAppend);
    }

    render() {
        const input = this.hasAddons() ? (
            <div className="input-group">
                {this.props.addonPrepend ? <div className="input-group-addon">{this.props.addonPrepend}</div> : null}
                {this.props.buttonPrepend ? <InputGroup.Button>{this.props.buttonPrepend}</InputGroup.Button> : null}
                {this.props.children}
                {this.props.addonAppend ? <div className="input-group-addon">{this.props.addonAppend}</div> : null}
                {this.props.buttonAppend ? <InputGroup.Button>{this.props.buttonAppend}</InputGroup.Button> : null}
            </div>
        ) : this.props.children;
        const helpBlock = this.props.helpText ? <span className="help-block">{this.props.helpText}</span> : null;

        /*
         if (this.props.isInline) {
         // Inline forms display the validation message via tooltip because there is little space.
         const overlay = <Tooltip id="tooltip">{this.props.helpText}</Tooltip>;
         return (
         <td style={this.props.inlineTdStyle}>
         <CustomOverlayTrigger placement="bottom"
         overlay={overlay}
         disabled={!this.props.helpText}>
         <FormGroup style={this.props.inlineGroupStyle}
         controlId={this.props.controlId}
         validationState={this.props.validationState}>
         {input}
         </FormGroup>
         </CustomOverlayTrigger>
         </td>
         );
         }
         */
        const groupClassName = classNames('form-group',
            this.props.validationState ? `has-${this.props.validationState}` : null
        );

        if (this.props.isHorizontal) {
            // Horizontal form
            return (
                <div className={groupClassName}>
                    <label htmlFor={this.props.controlId}
                           className={`col-sm-${this.props.col1} control-label`}>
                        {this.props.label}
                    </label>
                    <div className={`col-sm-${this.props.col2}`}>
                        {input}
                        {helpBlock}
                    </div>
                </div>
            );
        }
        // Standard form
        return (
            <div className={groupClassName}>
                {this.props.label ?
                    <label htmlFor={this.props.controlId}>
                        {this.props.label}
                    </label> : null
                }
                {input}
                {helpBlock}
            </div>
        );
    }
}
