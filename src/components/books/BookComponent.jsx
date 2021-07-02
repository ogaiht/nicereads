import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bookActions } from '../../actions/bookActions';
import { authorActions } from '../../actions/authorActions';
import { paths } from '../../paths';
import TextField from '../controls/TextField';
import Search from '../controls/Search';

class BookComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: {
                title: '',
                synopsis: '',
                authorId: '',
                tags:[]
            },
            submitted: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                [name]: value
            }
        });
    }

    onSubmit(event) {
        this.setState({ submitted: true });
        const { book } = this.state;
        if (book.title && book.synopsis && book.authorId) {
            this.props.create(book);
        }
    }

    render() {
        const { submitting  } = this.props;
        const { book, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>New Book</h2>
                <div>
                    <TextField value={book.title} label="Title" name="title" onChange={this.onChange} submitted={submitted} />
                    <TextField value={book.synopsis} label="Synopsis" name="synopsis" onChange={this.onChange} submitted={submitted} />
                    <TextField value={book.authorId} label="Author" name="authorId" onChange={this.onChange} submitted={submitted} />
                    <TextField value={book.tags} label="Tags" name="tags" onChange={this.onChange} submitted={submitted} />
                    <Search value={book.authorId} label="Author" name="authorId" onChange={this.onChange} submitted={submitted} lookup={async q => await authorActions.lookupAuthorsAsync(q)} />
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

function mapState(state) {
    const { submitting } = state.authors;
    return { submitting };
}

const actionCreators = {
    create: bookActions.createBook
}

const connectedBookComponent = connect(mapState, actionCreators)(BookComponent);
export { connectedBookComponent as BookComponent };