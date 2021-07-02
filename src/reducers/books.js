import { bookConstants } from '../constants/bookConstants';

const defaultState = {
    items: [],
    loading: false,
    error: null,
    submitting: false
};

export function books(state = defaultState, action) {
    switch(action.type) {
        case bookConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                submitting: false
            };
        case bookConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.books,
                loading: false,
                submitting: false
            };
        case bookConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                submitting: false,
                error: action.error
            };
        case bookConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: false,
                submitting: false
            };
        case bookConstants.CREATE_SUCCESS:
            return defaultState;
        case bookConstants.CREATE_FAILURE:
            return defaultState;
        default:
            return state;
    }
}