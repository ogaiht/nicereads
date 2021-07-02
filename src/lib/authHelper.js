import {authenticationContext} from '../services/authenticationService';

export function createAuthHeader() {
    const user = authenticationContext.getCurrentUser();
    if (user && user.token) {
        return { 'Authorization': `Bearer ${user.token}`};
    } else {
        return {};
    }
}