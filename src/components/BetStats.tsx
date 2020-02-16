import React from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import { ProfitOverview } from './ProfitOverview';

function BetStats() {
    return (
        <Page>
            <PageHeading withDecoration>Bet Stats</PageHeading>
            <ProfitOverview />
        </Page>
    );
}

export { BetStats };
