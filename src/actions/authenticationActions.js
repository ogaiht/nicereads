import {authenticationConstants} from '../constants/authenticationConstants';
import {authenticationService} from '../services/authenticationService';
import {alertActions} from '../actions/alertActions';
import {navigation} from '../lib/navigation';
import {paths} from '../paths';

export const authenticationActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));
        authenticationService.loginAsync(username, password)
        .then(
            userInfo => {
                dispatch(success(userInfo));
                navigation.navigateTo(paths.HOME);
            },
            error => {
                dispatch(failure(error.message));
                dispatch(alertActions.error(error.message));
            }
        );
    }
    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } };
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } };
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } };
}

function logout() {
    return dispatch => {
        authenticationService.logout();
        dispatch(logout());
    };
    function logout() { return { type: authenticationConstants.LOGOUT } }
}