export const urlHelper = {
    createUrl
};

function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function createUrl(serviceUrl, uri, params) {
    if (params) {
        const querystring = objectToQueryString(params);
        return `${serviceUrl}/${uri}?${querystring}`;
    }
    return `${serviceUrl}/${uri}`;
}