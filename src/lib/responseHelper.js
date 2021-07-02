export const responseHelper = {
    getResponseAsJsonAsync,
    ensureValidResponse
};

async function getResponseAsJsonAsync(response, errorMessage = 'Error when executing get response as JSON', throwIfNotSuccessful = true) {
    if (response.ok) {
        return response.json();
    } else if (throwIfNotSuccessful) {
        throw new Error(`${errorMessage}. Status: ${response.status}, message: ${response.statusText}.`);
    }
}

function ensureValidResponse(response, errorMessage = 'Response was not successful.') {
    if (response.ok) {
        throw new Error(`${errorMessage}. Status: ${response.status}, message: ${response.statusText}.`);
    }
}