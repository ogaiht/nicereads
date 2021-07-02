import React from 'react';

export default class TextField extends React.Component {

    render() {
        const { name, value, label, required, onChange, submitted } = this.props;
        const hasError = submitted && required && !value;
        return (
            <div className={'form-group' + (hasError ? ' has-error' : '')}>
                <label htmlFor={name}>{label}</label>
                <input type="text" className="form-control" name={name} value={value} onChange={onChange} />
                {hasError &&
                    <div className="help-block">{label} is required</div>
                }
            </div>
        );
    }
}