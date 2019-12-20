export const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'productionurlgoeshere'
        : 'http://localhost:4000';

async function api(endpoint: string, body?: unknown) {
    var data = null;
    var error = null;

    var defaults: RequestInit = {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    };

    var options = {
        ...defaults,
        method: body ? 'POST' : 'GET',
        ...(body && { body: JSON.stringify(body) }),
    };

    try {
        let response = await fetch(`${API_URL + endpoint}`, options);
        data = await response.json();
    } catch (err) {
        error = err;
    }

    return { data, error };
}

export { api };
