import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { paths } from '../paths';

class Header extends React.Component {
    render() {
        const { loggedIn } = this.props;
        if (!loggedIn) {
            return '';
        }
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav mr-auto">
                    <ul>
                        <li className="nav-item">
                            <Link to={paths.AUTHORS} className="nav-link">
                                Authors
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.BOOKS} className="nav-link">
                                Books
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.USERS} className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={paths.LOGIN}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}

const connectedHeader = connect(mapState)(Header);
export { connectedHeader as Header };