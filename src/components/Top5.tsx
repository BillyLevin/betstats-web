import React from 'react';
import { useGetBets, ALL_BET_STATES as STATES } from '../hooks/useGetBets';
import { Subtitle } from './Subtitle';
import styled from 'styled-components';
import { ContainedLoader } from './ContainedLoader';
import { Bet } from '../types/types';
import { formatAsCurrency } from '../utils/strings';

const SectionContainer = styled.article`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
`;

const List = styled.ol`
    counter-reset: top-5;
    list-style: none;

    li {
        counter-increment: top-5;
        margin-bottom: 1.6rem;
    }

    li::before {
        content: counter(top-5);
        font-size: 1.8rem;
        border: 2px solid ${props => props.theme.colors.primary};
        width: 3.6rem;
        height: 3.6rem;
        border-radius: 50%;
        position: relative;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-right: 1.6rem;
        color: ${props => props.theme.colors.primary};
    }

    li span {
        color: ${props => props.theme.colors.primary};
        font-weight: 600;
    }
`;

function Top5List({ bets }: { bets: Bet[] }) {
    if (!bets.length) {
        return <p>You currently have no settled bets</p>;
    }

    return (
        <List>
            {bets.map(bet => {
                let profit = (bet.returns ?? 0) - bet.stake;

                return (
                    <li key={bet._id}>
                        {bet.bet} -{' '}
                        <span>{formatAsCurrency(profit)} profit</span>
                    </li>
                );
            })}
        </List>
    );
}

function Top5() {
    const { bets, status, fetchBets } = useGetBets('top5');

    React.useEffect(() => {
        fetchBets();
    }, [fetchBets]);

    return (
        <SectionContainer>
            <Subtitle>Top 5 Bets</Subtitle>
            {status === STATES.loading && <ContainedLoader />}
            {status === STATES.success && <Top5List bets={bets!} />}
        </SectionContainer>
    );
}

export { Top5 };
