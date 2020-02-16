import React from 'react';
import { Page } from './Page';
import { Bet } from '../types/types';
import { Table } from './Table';
import { formatAsCurrency, oddsToValue } from '../utils/strings';
import { sortByDateAsc } from '../utils/date';
import { Button } from './Button';
import { SettleBet } from './SettleBet';
import { PageHeading } from './PageHeading';
import { toast, ToastContainer } from 'react-toastify';
import { ToastContent } from './ToastContent';
import 'react-toastify/dist/ReactToastify.css';
import { useGetBets, ALL_BET_STATES as STATES } from '../hooks/useGetBets';
import { EditBet } from './EditBet';
import { api } from '../utils/api';
import { ContainedLoader } from './ContainedLoader';

// returns a function that can be passed in as a callback to Array.prototype.reduce
// will add up all the values on an object with the provided property name
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

function BetManager() {
    const { bets, status, fetchBets } = useGetBets();
    const [betId, setBetId] = React.useState<string | null>(null);
    const triggerRowRef = React.useRef<HTMLTableRowElement | null>(null);

    function handleRowClick(
        event:
            | React.MouseEvent<HTMLTableRowElement, MouseEvent>
            | React.KeyboardEvent<HTMLTableRowElement>,
        row: any
    ) {
        triggerRowRef.current = event.currentTarget;
        setBetId(row.original._id);
    }

    const closeEditBetModal = React.useCallback(function closeModal() {
        setBetId(null);
    }, []);

    const handleEditBetSuccess = React.useCallback(
        function handleSuccess() {
            closeEditBetModal();
            toast.success(<ToastContent message="Bet updated!" />);
            fetchBets();
        },
        [closeEditBetModal, fetchBets]
    );

    const handleEditBetCancel = React.useCallback(
        function handleCancel() {
            closeEditBetModal();
        },
        [closeEditBetModal]
    );

    const handleEditBetDelete = React.useCallback(
        async function handleDelete() {
            if (betId) {
                const { data } = await api('/bets/delete', { id: betId });
                if (data) {
                    closeEditBetModal();
                    fetchBets();
                    toast.success(<ToastContent message="Bet deleted!" />);
                }
            }
        },
        [betId, closeEditBetModal, fetchBets]
    );

    // as per the react-table docs, this array should be memoized
    const tableColumns = React.useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
                sortType: function sortDates(bet1: any, bet2: any) {
                    const date1: string = bet1.original.date;
                    const date2: string = bet2.original.date;

                    return sortByDateAsc(date1, date2);
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
                        info.rows
                            .filter((row: any) => row.original.settled)
                            .reduce(calculateSum('stake'), 0)
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
        [fetchBets]
    );

    return (
        <Page>
            <PageHeading withDecoration>Bet Manager</PageHeading>
            <Button
                onClick={fetchBets}
                disabled={status === STATES.loading}
                style={{ marginBottom: '3.2rem' }}
            >
                Get Bets
            </Button>
            {status === STATES.loading && <ContainedLoader />}
            {status === STATES.success && (
                <Table
                    columns={tableColumns}
                    data={bets as Bet[]}
                    defaultSort={defaultSort}
                    onRowClick={handleRowClick}
                />
            )}
            <EditBet
                betId={betId}
                triggerRef={triggerRowRef}
                closeModalFunction={closeEditBetModal}
                onSuccess={handleEditBetSuccess}
                onCancel={handleEditBetCancel}
                onDelete={handleEditBetDelete}
            />
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
        </Page>
    );
}

export { BetManager };
