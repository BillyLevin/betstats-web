import React from 'react';
import { Page } from './Page';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { Table } from './Table';
import { formatAsCurrency, oddsToValue } from '../utils/strings';
import { americaniseDate } from '../utils/date';
import { Button } from './Button';
import { SettleBet } from './SettleBet';
import { PageHeading } from './PageHeading';
import { toast, ToastContainer } from 'react-toastify';
import { ToastContent } from './ToastContent';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader';
import styled from 'styled-components';

function calculateSum<T extends { [key: string]: any }>(key: string) {
    return function addToTotal(prev: number, curr: T) {
        let num = Number(curr.values[key]);

        if (isNaN(num)) {
            num = 0;
        }

        return prev + num;
    };
}

const defaultSort = [{ id: 'date', desc: true }];

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function BetManager() {
    const [bets, setBets] = React.useState<Bet[] | null>(null);
    const [isFetching, setIsFetching] = React.useState(false);

    async function fetchBets() {
        setIsFetching(true);
        const { data } = await api<Bet[]>('/bets/all');
        setIsFetching(false);
        setBets(data);
    }

    // as per the react-table docs, this array should be memoized
    const tableColumns = React.useMemo(
        () => [
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
                    if (row.settled === true) {
                        return 'Settled';
                    }
                    return (
                        <SettleBet
                            betId={row._id}
                            onSuccess={() => {
                                toast.success(
                                    <ToastContent message="Bet saved!" />
                                );
                                fetchBets();
                            }}
                        />
                    );
                },
                id: 'status',
            },
            {
                Header: 'Stake',
                accessor: 'stake',
                Cell: ({ cell: { value } }: any) => formatAsCurrency(value),
                Footer: (info: any) =>
                    formatAsCurrency(
                        info.rows.reduce(calculateSum('stake'), 0)
                    ),
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
                    formatAsCurrency(
                        info.rows.reduce(calculateSum('returns'), 0)
                    ),
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
                    formatAsCurrency(
                        info.rows.reduce(calculateSum('profit'), 0)
                    ),
            },
        ],
        []
    );

    // prefer this to nesting ternary operators in the JSX
    // TODO: probably a good time to useReducer?
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

    return (
        <Page>
            <PageHeading withDecoration>Bet Manager</PageHeading>
            <Button
                onClick={fetchBets}
                disabled={status === 'loading'}
                style={{ marginBottom: '3.2rem' }}
            >
                Get Bets
            </Button>
            {status === 'loading' && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
            {status === 'done' && (
                <Table
                    columns={tableColumns}
                    data={bets as Bet[]}
                    defaultSort={defaultSort}
                />
            )}
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
        </Page>
    );
}

export { BetManager };
