import React from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import { ProfitOverview } from './ProfitOverview';
import { Top5 } from './Top5';
import { useBetStats } from '../context/bet-stats-context';
import { ContainedLoader } from './ContainedLoader';
import { PageDescription } from './PageDescription';

function BetStats() {
    const { isFetching } = useBetStats();

    return (
        <Page>
            {isFetching ? (
                <ContainedLoader />
            ) : (
                <>
                    <PageHeading withDecoration>Bet Stats</PageHeading>
                    <PageDescription>
                        Take a closer look at your betting performance with the
                        handy charts and stats below!
                    </PageDescription>
                    <ProfitOverview />
                    <Top5 />
                </>
            )}
        </Page>
    );
}

export { BetStats };
