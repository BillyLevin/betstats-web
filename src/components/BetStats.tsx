import React from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import { useGetAllBets } from '../hooks/useGetAllBets';

function BetStats() {
    const { bets, status, fetchBets } = useGetAllBets();
    return (
        <Page>
            <PageHeading withDecoration>Bet Stats</PageHeading>
        </Page>
    );
}

export { BetStats };
