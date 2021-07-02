//import config from 'config';
import {httpServices} from '../lib/httpServices';
import {config} from './config';

export const userService = {
    getUsersAsync,
    createUserAsync,
    updateUserAsync,
    deleteUserAsync
}

async function createUserAsync(user) {
    const payload = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password
    };
    const response = await httpServices.postJsonAsync(`${config.apiUrl}/users`, payload);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

async function updateUserAsync(user) {
    const payload = {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const response = await httpServices.putJsonAsync(`${config.apiUrl}/users/${user.id}`, payload);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
}

async function getUsersAsync() {
    const response = await httpServices.getAsync(`${config.apiUrl}/users`);
    const responseMessage = await response.json();
    return responseMessage;

}

async function deleteUserAsync(id) {
    await httpServices.deleteAsync(`${config.apiUrl}/users/${id}`);
}