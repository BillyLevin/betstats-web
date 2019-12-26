import React from 'react';
import { Page } from './Page';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { Table } from './Table';

const tableColumns = [
    { Header: 'Bet', accessor: 'bet' },
    { Header: 'Odds', accessor: 'odds' },
    { Header: 'Stake (£)', accessor: 'stake' },
];

function BetManager() {
    const [bets, setBets] = React.useState<any>(null);
    return (
        <Page>
            <div>bet manager</div>
            <button
                onClick={async () => {
                    const {
                        data,
                        errors,
                    }: { data: Bet[]; errors: any } = await api('/bets/all');
                    setBets(data);
                }}
            >
                get stuff
            </button>
            {/* {bets && <pre>{JSON.stringify(bets, null, 4)}</pre>} */}
            {bets && <Table columns={tableColumns} data={bets} />}
        </Page>
    );
}

export { BetManager };
