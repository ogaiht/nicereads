import {createAuthHeader} from './authHelper';
const method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const jsonHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export const httpServices = {
    getAsync,
    postJsonAsync,
    putJsonAsync,
    deleteAsync
};

async function executeRequestAsync(url, method, headers = {}, options = {}) {
    const requestOptions = {
        method,
        credentials: 'same-origin',
        ...options,
        headers: {...headers, ...createAuthHeader()}
    };
    return await fetch(url, requestOptions);
}

async function getAsync(url) {
    return await executeRequestAsync(url, method.GET);
}

async function postJsonAsync(url, payload) {
    return await executeRequestAsync(url, method.POST, jsonHeader, { body: JSON.stringify(payload) });
}

async function putJsonAsync(url, payLoad) {
    return await executeRequestAsync(url, method.PUT, jsonHeader, { body: JSON.stringify(payLoad) });
}

async function deleteAsync(url) {
    return await executeRequestAsync(url, method.DELETE);
}