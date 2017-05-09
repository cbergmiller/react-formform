import React from 'react';
import {render} from 'react-dom';

import {FormForm, Input, Textarea, Checkbox, Select} from '../../src';

import '../css/bootstrap.min.css';


class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {},
            errors: {},
        };
    }

    handleValuesChange = values => {
        this.setState({values});
    };

    handleErrorsChange = errors => {
        this.setState({errors});
    };

    static choices = [
        ['foo', 'Foo'],
        ['bar', 'Bar'],
    ];

    render() {
        return (
            <div className="container">
                <h1>react-formform Demo</h1>
                <FormForm values={this.state.values}
                          errors={this.state.errors}
                          onValuesChange={this.handleValuesChange}
                          onErrorsChange={this.handleErrorsChange}
                          isHorizontal>
                    <Input name="name" type="text" label="Name"/>
                    <Checkbox name="status" label="Add comment"/>
                    <Textarea name="text" label="Comment" show={g => !!g('status')}/>
                    <Select name="select" label="Select" choices={Demo.choices}/>
                </FormForm>
                <pre>
                    {JSON.stringify(this.state.values, null, '    ')}
                </pre>
            </div>
        );
    }
}

render(<Demo/>, document.querySelector('#demo'));
