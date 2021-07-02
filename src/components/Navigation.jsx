import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { Home } from './Home';
import { Login } from './public/Login';
import { Registration } from './public/Registration';
import { AuthorComponent } from './authors/AuthorComponet';
import { AuthorListComponent } from './authors/AuthorListComponent';
import { UserListComponent } from './users/UserListComponent';
import { UserComponent } from './users/UserComponent';
import { BookListComponent } from './books/BookListComponent';
import { BookComponent } from './books/BookComponent';
import { paths } from '../paths';


export class Navigation extends React.Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path={paths.HOME} component={Home} />
                <Route path={paths.LOGIN} component={Login} />
                <Route path={paths.REGISTER} component={Registration} />
                <Route exact path={paths.NEW_AUTHOR} component={AuthorComponent} />
                <Route exact path={paths.AUTHORS} component={AuthorListComponent} />
                <Route exact path={paths.NEW_USER} component={UserComponent} />
                <Route exact path={paths.USERS} component={UserListComponent} />
                <Route exact path={paths.BOOKS} component={BookListComponent} />
                <Route exact path={paths.NEW_BOOK} component={BookComponent} />
                <Redirect from="*" to={paths.HOME} />
            </Switch>
        );
    }
}