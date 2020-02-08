import React from 'react';
import { Modal } from './Modal';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { Loader } from './Loader';
import styled from 'styled-components';
import { BetForm } from './BetForm';
import { ModalTitle } from './ModalTitle';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 3.2rem;
    min-width: 56rem;
`;

type Props = {
    betId: string | null;
    triggerRef: React.MutableRefObject<HTMLTableRowElement | null>;
    closeModalFunction: () => void;
};

enum STATES {
    idle = 'idle',
    loading = 'loading',
    success = 'success',
    failure = 'failure',
}

const initialState = {
    status: 'idle',
};

function EditBet({ betId, triggerRef, closeModalFunction }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [betData, setBetData] = React.useState<Bet | null>(null);

    React.useEffect(() => {
        async function handleBetChange() {
            if (betId) {
                const { data } = await api('/bets/get', { id: betId });
                setBetData(data);
            }

            setIsOpen(Boolean(betId));
        }
        handleBetChange();
    }, [betId]);

    return (
        <Modal
            id="edit-bet"
            triggerRef={triggerRef}
            isOpen={isOpen}
            label="Edit Bet"
            closeModal={closeModalFunction}
        >
            <Container>
                <ModalTitle>Edit Bet</ModalTitle>
                {betData && (
                    <BetForm
                        betData={betData}
                        cancelFunction={closeModalFunction}
                    />
                )}
            </Container>
        </Modal>
    );
}

export { EditBet };
