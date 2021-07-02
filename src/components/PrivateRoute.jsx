import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {authenticationContext} from '../services/authenticationService';
import {paths} from '../paths';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        authenticationContext.getCurrentUser()
            ? <Component {...props} />
            : <Redirect to={{ pathname: paths.LOGIN, state: { from: props.location } }} />
    )} />
)