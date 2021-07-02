import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions/userActions';
import { paths } from '../../paths';

class UserListComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return e => this.props.deleteUser(id);
    }

    render() {
        const { users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h3>All registered users:</h3>
                <Link to={paths.NEW_USER}>New</Link>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((u, index) =>
                            <li key={u.id}>
                                {u.firstName + ' ' + u.lastName}
                                {
                                    u.deleting ? <em> - Deleting...</em>
                                    : u.deleteError ? <span className="text-danger"> - ERROR: {u.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(u.id)}>Delete</a></span>
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
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getUsers,
    deleteUser: userActions.deleteUser
}

const connectedUserListComponent = connect(mapState, actionCreators)(UserListComponent);
export { connectedUserListComponent as UserListComponent };