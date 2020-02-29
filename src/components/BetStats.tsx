import React from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import { ProfitOverview } from './ProfitOverview';
import { Top5 } from './Top5';
import { useBetStats } from '../context/bet-stats-context';
import { ContainedLoader } from './ContainedLoader';

function BetStats() {
    const { isFetching } = useBetStats();

    return (
        <Page>
            {isFetching ? (
                <ContainedLoader />
            ) : (
                <>
                    <PageHeading withDecoration>Bet Stats</PageHeading>
                    <ProfitOverview />
                    <Top5 />
                </>
            )}
        </Page>
    );
}

export { BetStats };
