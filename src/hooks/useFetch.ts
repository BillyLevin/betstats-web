import { useState } from 'react';

export function useFetch<T extends object>(
    fetcher: (body: T) => Promise<{ error?: any; data?: any }>
) {
    const [data, setData] = useState<unknown>(null);
    const [error, setError] = useState<unknown>(null);

    async function handleApiCall(body: T) {
        const { data: apiData, error: apiError } = await fetcher(body);

        if (apiData) {
            setData(apiData);
        }

        if (error) {
            setError(apiError);
        }
    }

    return { data, error, handleApiCall };
}
