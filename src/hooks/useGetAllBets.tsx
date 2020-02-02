import React from 'react';
import { api } from '../utils/api';
import { Bet } from '../types/types';

type GetAllBets = {
    bets: Bet[] | null;
    status: 'loading' | 'done' | 'empty';
    fetchBets: () => Promise<void>;
};

export function useGetAllBets(): GetAllBets {
    const [bets, setBets] = React.useState<Bet[] | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);

    const fetchBets = React.useCallback(async function fetchBets() {
        setIsFetching(true);
        const { data } = await api<Bet[]>('/bets/all');
        setIsFetching(false);
        setBets(data);
    }, []);

    function getStatus() {
        switch (true) {
            case isFetching:
                return 'loading';
            case !!bets:
                return 'done';
            default:
                return 'empty';
        }
    }

    const status = getStatus();

    return { bets, status, fetchBets };
}
