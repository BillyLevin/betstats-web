import React, { useEffect } from 'react';
import { Page } from './Page';
import { PageHeading } from './PageHeading';
import {
    useGetAllBets,
    ALL_BET_STATES as STATES,
} from '../hooks/useGetAllBets';
import { Line } from 'react-chartjs-2';
import { theme } from '../theme';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { sortByDateAsc, prettifyDate } from '../utils/date';
import { Loader } from './Loader';
import { noop } from '../utils/general';
import { formatAsCurrency } from '../utils/strings';
import { Subtitle } from './Subtitle';

const ChartContainer = styled.div`
    width: 100%;
    height: 50rem;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function BetStats() {
    const { bets, status, fetchBets } = useGetAllBets();

    useEffect(() => {
        fetchBets();
    }, [fetchBets]);

    function formatData() {
        let cumulativeProfit = 0;
        let profitHistory: number[] = [];
        let labels: string[] = [];

        if (!(bets && bets.length)) {
            return { profitHistory, labels };
        }

        const sortedBets = bets.sort(function sortDatesAsc(a, b) {
            const date1 = a.date;
            const date2 = b.date;

            return sortByDateAsc(date1, date2);
        });

        let prevDate = '';

        sortedBets.forEach(function calculateTotalProfit(bet) {
            if (bet.settled !== true) return;

            const profit = (bet.returns ?? 0) - bet.stake;

            cumulativeProfit += profit;

            // we want to group together bets that took place on the same day
            if (bet.date === prevDate) {
                profitHistory[profitHistory.length - 1] = cumulativeProfit;
            } else {
                profitHistory.push(cumulativeProfit);
                labels.push(bet.date);
            }

            prevDate = bet.date;
        });

        return { profitHistory, labels };
    }

    const { profitHistory, labels } = formatData();

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Profit',
                lineTension: 0.1,
                borderColor: theme.colors.primary,
                pointBorderColor: theme.colors.primary,
                fill: false,
                pointBackgroundColor: theme.colors.greyDark,
                pointBorderWidth: 2,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: theme.colors.greyDark,
                pointHoverBorderColor: theme.colors.primary,
                pointHoverBorderWidth: 2,
                pointRadius: 4,
                pointHitRadius: 10,
                data: profitHistory,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            labels: {
                fontColor: theme.colors.primary,
                fontSize: 14,
            },
            onClick: noop,
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: theme.colors.primary,
                        autoSkip: true,
                        maxTicksLimit: 7,
                        callback: prettifyDate,
                    },
                    gridLines: {
                        color: hexToRGBA(theme.colors.primaryLight, 0.2),
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.colors.primary,
                        beginAtZero: true,
                        callback: formatAsCurrency,
                    },
                    gridLines: {
                        color: hexToRGBA(theme.colors.primaryLight, 0.2),
                        zeroLineColor: theme.colors.success,
                        zeroLineWidth: 2,
                    },
                },
            ],
        },
        tooltips: {
            callbacks: {
                title: function prettyDate(tooltipItems: any) {
                    let date = tooltipItems[0].label;
                    return prettifyDate(date);
                },
                label: function formatProfit(tooltipItem: any, data: any) {
                    let { datasetIndex: index, value } = tooltipItem;
                    let label = data.datasets[index].label;

                    let formatted = formatAsCurrency(Number(value));

                    return `${label}: ${formatted}`;
                },
            },
        },
    };

    return (
        <Page>
            <PageHeading withDecoration>Bet Stats</PageHeading>
            {status === STATES.loading && (
                <LoaderContainer>
                    <Loader />
                </LoaderContainer>
            )}
            {status === STATES.success && (
                <>
                    <Subtitle>Profit Overview</Subtitle>
                    <ChartContainer>
                        <Line data={data} options={options} />
                    </ChartContainer>
                </>
            )}
        </Page>
    );
}

export { BetStats };
