import {authorConstants} from '../constants/authorConstants';
import {authorService} from '../services/authorService';
import {alertActions} from '../actions/alertActions';
import { navigation } from '../lib/navigation';
import {paths} from '../paths';

export const authorActions = {
    createAuthor,
    getAuthors,
    deleteAuthor,
    lookupAuthorsAsync
};

function createAuthor(author) {
    return dispatch => {
        dispatch(request(author));
        authorService.createAuthorAsync(author)
        .then(
            author => {
            dispatch(success(author));
            navigation.navigateTo(paths.AUTHORS);
            dispatch(alertActions.success('New author created successfully.'));
        },
        error => {
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        });
    };

    function request(author) { return { type:authorConstants.CREATE_REQUEST, author }}
    function success(author) { return { type:authorConstants.CREATE_SUCCESS, author }}
    function failure(error) { return { type:authorConstants.CREATE_FAILURE, error }}
}

function getAuthors() {
    return dispatch => {
        dispatch(request());
        authorService.getAuthorsAsync()
        .then(
            authors => dispatch(success(authors)),
            error => dispatch(failure(error.message))
        );
    };

    function request() { return { type: authorConstants.GETALL_REQUEST } }
    function success(authors) { return { type: authorConstants.GETALL_SUCCESS, authors } }
    function failure(error) { return { type: authorConstants.GETALL_FAILURE, error } }
}

function deleteAuthor(id) {
    return dispatch => {
        dispatch(request(id));
        authorService.deleteAuthorAsync(id)
            .then(
                author => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: authorConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: authorConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: authorConstants.DELETE_FAILURE, id, error } }
}

async function lookupAuthorsAsync(name) {
    const lowerCaseName = name.toLowerCase();
    const results = await authorService.getAuthorsAsync();
    return results.filter(a => a.knownAs.toLowerCase().indexOf(lowerCaseName) !== -1)
    .map(a => ({
        key: a.id,
        value: a.knownAs
    }));
}