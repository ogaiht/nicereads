import { Storage } from '../lib/storage';
import {httpServices} from '../lib/httpServices';
import {config} from './config';

const CURRENT_USER = '_CURRENT_USER_';

export const authenticationService = {
    loginAsync,
    logout
}

export const authenticationContext = {
    getCurrentUser
}

function getCurrentUser() {
    return Storage.getItem(CURRENT_USER);
}

async function loginAsync(username, password) {
    const response = await httpServices.postJsonAsync(`${config.apiUrl}/authentication/authenticate`, {username, password});
    if (response.ok) {
        const responseMessage = await response.json();
        Storage.setItem(CURRENT_USER, responseMessage);
        return responseMessage;
    } else {
        throw new Error('Failed to login.');
    }
}

function logout() {
    Storage.removeItem(CURRENT_USER);
}
