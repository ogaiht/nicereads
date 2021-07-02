import React from 'react';

class FormComponent extends React.Component {

    render() {
        const { submitting  } = this.props;
        const { author, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>New Author</h2>
                <div>
                    {Object.keys(fields).map(f => {
                        const fieldInfo = fields[f];
                        const value = author[f];
                        const hasError = submitted && fieldInfo.required && !value;
                        return (
                            <div key={f} className={'form-group' + (hasError ? ' has-error' : '')}>
                                <label htmlFor="firstName">{fieldInfo.label}</label>
                                <input type="text" className="form-control" name={f} value={value} onChange={this.onChange} />
                                {hasError &&
                                    <div className="help-block">{fieldInfo.label} is required</div>
                                }
                            </div>
                        );
                    })}
                    <div className="form-group">
                        <button className="btn btn-primary" onClick={this.onSubmit}>Create</button>
                        {submitting &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to={paths.AUTHORS} className="btn btn-link">Cancel</Link>
                    </div>
                </div>
            </div>
        );
    }
}