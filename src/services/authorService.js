//import config from 'config';
import {httpServices} from '../lib/httpServices';
import {responseHelper} from '../lib/responseHelper';
import {config} from './config';

export const authorService = {
    createAuthorAsync,
    getAuthorsAsync,
    deleteAuthorAsync
}

async function getAuthorsAsync() {
    const response = await httpServices.getAsync(`${config.apiUrl}/authors`);
    return await responseHelper.getResponseAsJsonAsync(response);
}

async function createAuthorAsync(author) {
    const response = await httpServices.postJsonAsync(`${config.apiUrl}/authors`, author);
    return await responseHelper.getResponseAsJsonAsync(response);
}

async function deleteAuthorAsync(id) {
    const response = await httpServices.deleteAsync(`${config.apiUrl}/authors/${id}`);
    responseHelper.ensureValidResponse(response);
}