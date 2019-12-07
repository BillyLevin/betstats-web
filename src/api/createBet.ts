import { sharedHeaders } from './shared/headers';

export type CreateBetBody = {
    bet: string;
    eachWay: boolean;
    odds: string;
    stake: number;
    date: string;
};

export async function createBet(body: CreateBetBody) {
    let error;
    let data;

    try {
        const response = await fetch('http://localhost:4000/bets/create', {
            ...sharedHeaders,
            method: 'POST',
            body: JSON.stringify(body),
        });
        data = await response.json();
    } catch (err) {
        error = err;
    }

    return { data, error };
}
