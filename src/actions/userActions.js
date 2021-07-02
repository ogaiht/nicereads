import {userService} from '../services/userService';
import {userConstants} from '../constants/userConstants';
import {navigation} from '../lib/navigation';
import {alertActions} from '../actions/alertActions';
import {paths} from '../paths';

export const userActions = {
    register,
    createNewUser,
    getUsers,
    deleteUser
};

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.createUserAsync(user)
        .then(
        user => {
            dispatch(success(user));
            navigation.navigateTo(paths.LOGIN);
            dispatch(alertActions.success('Registration successful.'));
        },
        error => {
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        });
    };

    function request(user) { return { type:userConstants.REGISTER_REQUEST, user }}
    function success(user) { return { type:userConstants.REGISTER_SUCCESS, user }}
    function failure(error) { return { type:userConstants.REGISTER_FAILURE, error }}
}

function createNewUser(user) {
    return dispatch => {
        dispatch(request(user));
        userService.createUserAsync(user)
        .then(
        user => {
            dispatch(success(user));
            navigation.navigateTo(paths.USERS);
            dispatch(alertActions.success('Registration successful.'));
        },
        error => {
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        });
    };

    function request(user) { return { type:userConstants.CREATE_REQUEST, user }}
    function success(user) { return { type:userConstants.CREATE_SUCCESS, user }}
    function failure(error) { return { type:userConstants.CREATE_FAILURE, error }}
}

function getUsers() {
    return dispatch => {
        dispatch(request());
        userService.getUsersAsync()
        .then(
            users => dispatch(success(users)),
            error => dispatch(failure(error.message))
        );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function deleteUser(id) {
    return dispatch => {
        dispatch(request(id));
        userService.deleteUserAsync(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}