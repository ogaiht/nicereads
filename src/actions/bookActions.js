import { bookConstants } from '../constants/bookConstants';
import { bookService } from '../services/bookService';
import { alertActions } from '../actions/alertActions';
import { navigation } from '../lib/navigation';
import {paths} from '../paths';

export const bookActions = {
    createBook,
    getBooks
};

function createBook(book) {
    return dispatch => {
        dispatch(request(book));
        bookService.createBookAsync(book)
        .then(
            book => {
            dispatch(success(book));
            navigation.navigateTo(paths.BOOKS);
            dispatch(alertActions.success('New book created successfully.'));
        },
        error => {
            dispatch(failure(error.message));
            dispatch(alertActions.error(error.message));
        });
    };

    function request(book) { return { type:bookConstants.CREATE_REQUEST, book }}
    function success(book) { return { type:bookConstants.CREATE_SUCCESS, book }}
    function failure(error) { return { type:bookConstants.CREATE_FAILURE, error }}
}

function getBooks() {
    return dispatch => {
        dispatch(request());
        bookService.getBooksAsync()
        .then(
            books => dispatch(success(books)),
            error => dispatch(failure(error.message))
        );
    };

    function request() { return { type: bookConstants.GETALL_REQUEST } }
    function success(books) { return { type: bookConstants.GETALL_SUCCESS, books } }
    function failure(error) { return { type: bookConstants.GETALL_FAILURE, error } }
}