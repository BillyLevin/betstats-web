import React from 'react';
import { Subtitle } from './Subtitle';
import styled from 'styled-components';
import { ContainedLoader } from './ContainedLoader';
import { Bet } from '../types/types';
import { formatAsCurrency } from '../utils/strings';
import { useGetTop5Bets, STATES } from '../hooks/useGetTop5Bets';

const SectionContainer = styled.article`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
`;

const ListsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
`;

const ListContainer = styled.div`
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 3px;
    padding: 1.6rem 3.2rem;

    ${Subtitle} {
        font-size: 2.4rem;
    }
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
`;

const Emphasis = styled.span`
    color: ${props => props.theme.colors.primary};
    font-weight: 600;
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
                        <Emphasis>{formatAsCurrency(profit)} profit</Emphasis> -{' '}
                        <span>{bet.odds}</span>
                    </li>
                );
            })}
        </List>
    );
}

function Top5() {
    const { bets, status, fetchBets } = useGetTop5Bets();

    React.useEffect(() => {
        fetchBets();
    }, [fetchBets]);

    return (
        <SectionContainer>
            {status === STATES.loading && <ContainedLoader />}
            {status === STATES.success && (
                <ListsContainer>
                    <ListContainer>
                        <Subtitle>Top 5 Winners</Subtitle>
                        <Top5List bets={bets?.profit ?? []} />
                    </ListContainer>
                    <ListContainer>
                        <Subtitle>Top 5 Longshots</Subtitle>
                        <Top5List bets={bets?.longshots ?? []} />
                    </ListContainer>
                </ListsContainer>
            )}
        </SectionContainer>
    );
}

export { Top5 };
