const API_ENDPOINT = process.env.REACT_APP_API_URL;

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
        let response = await fetch(`${API_ENDPOINT + endpoint}`, options);
        data = await response.json();
    } catch (err) {
        error = err;
    }

    return { data, error };
}

export { api };
