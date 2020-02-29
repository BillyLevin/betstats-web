import React from 'react';
import { useGetAllBets } from '../hooks/useGetAllBets';
import { useGetTop5Bets, Top5Bets } from '../hooks/useGetTop5Bets';
import { BET_STATES } from '../hooks/utils/bets';
import { Bet } from '../types/types';

type BetStatsState = {
    allBets: Bet[] | null;
    top5Bets: Top5Bets | null;
    isFetching: boolean;
};

const BetStatsContext = React.createContext<BetStatsState | undefined>(
    undefined
);

function BetStatsProvider(props: any) {
    const {
        bets: allBets,
        status: allBetsStatus,
        fetchBets: fetchAllBets,
    } = useGetAllBets();

    const {
        bets: top5Bets,
        status: top5BetsStatus,
        fetchBets: fetchTop5Bets,
    } = useGetTop5Bets();

    React.useEffect(() => {
        fetchAllBets();
        fetchTop5Bets();
    }, [fetchAllBets, fetchTop5Bets]);

    const isFetching =
        allBetsStatus === BET_STATES.loading &&
        top5BetsStatus === BET_STATES.loading;

    return (
        <BetStatsContext.Provider
            value={{
                allBets,
                top5Bets,
                isFetching,
            }}
            {...props}
        />
    );
}

function useBetStats() {
    const context = React.useContext(BetStatsContext);

    if (context === undefined) {
        throw new Error(
            'You cannot call useBetStats outside of BetStatsProvider'
        );
    }

    return context;
}

export { BetStatsProvider, useBetStats };
