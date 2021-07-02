import {httpServices} from '../lib/httpServices';
import {responseHelper} from '../lib/responseHelper';
import {config} from './config';

export const bookService = {
    getBooksAsync,
    createBookAsync
}

async function getBooksAsync() {
    const response = await httpServices.getAsync(`${config.apiUrl}/books`);
    return await responseHelper.getResponseAsJsonAsync(response);
}

async function createBookAsync(book) {
    const response = await httpServices.postJsonAsync(`${config.apiUrl}/books`, book);
    return await responseHelper.getResponseAsJsonAsync(response);
}