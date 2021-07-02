import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bookActions } from '../../actions/bookActions';
import { paths } from '../../paths';

class BookListComponent extends React.Component {

    componentDidMount() {
        this.props.getBooks();
    }

    handleDeleteUser(id) {
        //return e => this.props.deleteUser(id);
    }

    render() {
        const { books } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>All Books:</h3>
                <Link to={paths.NEW_BOOK}>New</Link>
                {books.loading && <em>Loading books...</em>}
                {books.error && <span className="text-danger">ERROR: {books.error}</span>}
                {books.items &&
                    <ul>
                        {books.items.map((a, index) =>
                            <li key={a.id}>
                                {a.title}
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
    const { books } = state;
    return { books };
}

const actionCreators = {
    getBooks: bookActions.getBooks
}

const connectedAuthorListComponent = connect(mapState, actionCreators)(BookListComponent);
export { connectedAuthorListComponent as BookListComponent };