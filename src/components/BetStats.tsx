import React from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import { ProfitOverview } from './ProfitOverview';
import { Top5 } from './Top5';

function BetStats() {
    return (
        <Page>
            <PageHeading withDecoration>Bet Stats</PageHeading>
            <ProfitOverview />
            <Top5 />
        </Page>
    );
}

export { BetStats };
