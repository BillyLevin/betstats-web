import React from 'react';
import { Page } from './Page';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { Table } from './Table';
import { formatAsCurrency, oddsToValue } from '../utils/strings';
import { americaniseDate } from '../utils/date';

function calculateSum<T extends { [key: string]: any }>(key: string) {
    return function addToTotal(prev: number, curr: T) {
        let num = Number(curr.values[key]);

        if (isNaN(num)) {
            num = 0;
        }

        return prev + num;
    };
}

const tableColumns = [
    {
        Header: 'Date',
        accessor: 'date',
        sortType: function sortDates(bet1: any, bet2: any) {
            const date1: string = bet1.original.date;
            const date2: string = bet2.original.date;

            return (
                Date.parse(americaniseDate(date1)) -
                Date.parse(americaniseDate(date2))
            );
        },
    },
    { Header: 'Bet', accessor: 'bet' },
    {
        Header: 'Each Way',
        accessor: 'eachWay',
        Cell: (info: any) => {
            const { value } = info.cell;
            return value === true ? 'Yes' : 'No';
        },
    },
    {
        Header: 'Odds',
        accessor: 'odds',
        sortType: function sortOdds(bet1: any, bet2: any) {
            const odds1: string = bet1.original.odds;
            const odds2: string = bet2.original.odds;

            return oddsToValue(odds1) - oddsToValue(odds2);
        },
    },
    {
        Header: 'Status',
        accessor: (row: Bet) => {
            return row.settled === true ? 'Settled' : 'Open';
        },
        id: 'status',
    },
    {
        Header: 'Stake',
        accessor: 'stake',
        Cell: ({ cell: { value } }: any) => formatAsCurrency(value),
        Footer: (info: any) =>
            formatAsCurrency(info.rows.reduce(calculateSum('stake'), 0)),
    },
    {
        Header: 'Returns',
        accessor: (row: Bet) => {
            return row.settled === true ? row.returns : 0;
        },
        id: 'returns',
        Cell: (info: any) => {
            const {
                row: { values, original },
            } = info;

            return original.settled === true
                ? formatAsCurrency(values.returns)
                : 'N/A';
        },
        Footer: (info: any) =>
            formatAsCurrency(info.rows.reduce(calculateSum('returns'), 0)),
    },
    {
        Header: 'Profit',
        accessor: (row: Bet) => {
            return row.settled === true ? row.returns! - row.stake : 0;
        },
        id: 'profit',
        Cell: (info: any) => {
            const {
                row: { values, original },
            } = info;

            return original.settled === true
                ? formatAsCurrency(values.profit)
                : 'N/A';
        },
        Footer: (info: any) =>
            formatAsCurrency(info.rows.reduce(calculateSum('profit'), 0)),
    },
];

function BetManager() {
    const [bets, setBets] = React.useState<Bet[] | null>(null);

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
            {bets && <Table columns={tableColumns} data={bets} />}
        </Page>
    );
}

export { BetManager };
