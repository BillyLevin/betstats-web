export const API_URL =
    process.env.NODE_ENV === 'production'
        ? 'productionurlgoeshere'
        : 'http://localhost:4000';

async function api<T = any>(endpoint: string, body?: unknown) {
    let data: T | null = null;
    let errors = null;

    const defaults: RequestInit = {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    };

    const options = {
        ...defaults,
        method: body ? 'POST' : 'GET',
        ...(body && { body: JSON.stringify(body) }),
    };

    try {
        let response = await fetch(`${API_URL + endpoint}`, options);
        let formatted = await response.json();
        if (formatted.errors) {
            errors = formatted.errors;
        } else {
            data = formatted;
        }
    } catch (err) {
        errors = err;
    }

    return { data, errors };
}

export { api };
