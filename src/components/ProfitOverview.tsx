import React from 'react';
import { Subtitle } from './Subtitle';
import { sortByDateAsc, prettifyDate } from '../utils/date';
import { useGetBets, ALL_BET_STATES as STATES } from '../hooks/useGetBets';
import { theme } from '../theme';
import { noop } from '../utils/general';
import { hexToRGBA } from '../utils/colors';
import { formatAsCurrency } from '../utils/strings';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { ContainedLoader } from './ContainedLoader';

const SectionContainer = styled.article`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    margin-bottom: 3.2rem;
`;

const ChartContainer = styled.div`
    width: 100%;
    height: 50rem;
`;

const MinMaxContainer = styled.section`
    display: flex;
    margin-bottom: 1.6rem;

    p {
        padding: 1.6rem;
        background-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.greyDark};
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
`;

function ProfitOverview() {
    const { bets, status, fetchBets } = useGetBets();
    const [{ minProfit, maxProfit }, setMinMaxProfit] = React.useState({
        minProfit: 0,
        maxProfit: 0,
    });

    React.useEffect(() => {
        fetchBets();
    }, [fetchBets]);

    const formatData = React.useCallback(
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

            setMinMaxProfit({
                minProfit: Math.min(...profitHistory),
                maxProfit: Math.max(...profitHistory),
            });

            return { profitHistory, labels };
        },
        [bets]
    );

    const { profitHistory, labels } = React.useMemo(formatData, [formatData]);

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
                    type: 'time',
                    distribution: 'linear',
                    time: {
                        parser: 'DD/MM/YYYY',
                        unit: 'week',
                    },
                    ticks: {
                        fontColor: theme.colors.primary,
                        autoSkip: true,
                        maxTicksLimit: 10,
                    },
                    gridLines: {
                        color: hexToRGBA(theme.colors.primaryLight, 0.2),
                        zeroLineColor: hexToRGBA(
                            theme.colors.primaryLight,
                            0.2
                        ),
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
        <SectionContainer>
            <Subtitle>Profit Overview</Subtitle>
            {status === STATES.loading && <ContainedLoader />}
            {status === STATES.success && (
                <>
                    <MinMaxContainer>
                        <p>Highest: {formatAsCurrency(maxProfit)}</p>
                        <p>Lowest: {formatAsCurrency(minProfit)}</p>
                    </MinMaxContainer>
                    <ChartContainer>
                        <Line data={data} options={options} />
                    </ChartContainer>
                </>
            )}
        </SectionContainer>
    );
}

export { ProfitOverview };
