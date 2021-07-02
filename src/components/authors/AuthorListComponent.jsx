import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorActions } from '../../actions/authorActions';
import { paths } from '../../paths';

class AuthorListComponent extends React.Component {

    componentDidMount() {
        this.props.getAuthors();
    }

    handleDeleteUser(id) {
        return e => this.props.deleteAuthor(id);
    }

    render() {
        const { authors } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>All Authors:</h3>
                <Link to={paths.NEW_AUTHOR}>New</Link>
                {authors.loading && <em>Loading users...</em>}
                {authors.error && <span className="text-danger">ERROR: {authors.error}</span>}
                {authors.items &&
                    <ul>
                        {authors.items.map((a, index) =>
                            <li key={a.id}>
                                {a.firstName + ' ' + a.lastName}
                                {
                                    a.deleting ? <em> - Deleting...</em>
                                    : a.deleteError ? <span className="text-danger"> - ERROR: {a.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(a.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }
}

function mapState(state) {
    const { authors } = state;
    return { authors };
}

const actionCreators = {
    getAuthors: authorActions.getAuthors,
    deleteAuthor: authorActions.deleteAuthor
}

const connectedAuthorListComponent = connect(mapState, actionCreators)(AuthorListComponent);
export { connectedAuthorListComponent as AuthorListComponent };