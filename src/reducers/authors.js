import { authorConstants } from '../constants/authorConstants';

const defaultState = {
    items: [],
    loading: false,
    error: null,
    submitting: false
};

export function authors(state = defaultState, action) {
    switch(action.type) {
        case authorConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                submitting: false
            };
        case authorConstants.GETALL_SUCCESS:
            return {
                ...state,
                items: action.authors,
                loading: false,
                submitting: false
            };
        case authorConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                submitting: false,
                error: action.error
            };
        case authorConstants.CREATE_REQUEST:
            return {
                ...state,
                loading: false,
                submitting: false,
                submitting: true
            };
        case authorConstants.CREATE_SUCCESS:
            return defaultState;
        case authorConstants.CREATE_FAILURE:
            return defaultState;
        case authorConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(author =>
                    author.id === action.id
                    ? { ...author, deleting: true }
                    : author)};
        case authorConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(author => author.id !== action.id)
            };
        case authorConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(author => {
                    if (author.id === action.id) {
                        // make copy of user without 'deleting:true' property
                        const { deleting, ...authorCopy } = author;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...authorCopy, deleteError: action.error };
                    }

                    return author;
                    })
            };
        default:
            return state;
    }
}