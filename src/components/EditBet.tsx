import React from 'react';
import { Modal } from './Modal';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import styled from 'styled-components';
import { BetForm } from './BetForm';
import { Subtitle } from './Subtitle';

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
    onSuccess: () => void;
    onCancel: () => void;
    onDelete: () => void;
    closeModalFunction: () => void;
};

function EditBet({
    betId,
    triggerRef,
    onSuccess,
    onCancel,
    onDelete,
    closeModalFunction,
}: Props) {
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
                <Subtitle>Edit Bet</Subtitle>
                {betData && (
                    <BetForm
                        betData={betData}
                        deleteFunction={onDelete}
                        cancelFunction={onCancel}
                        successFunction={onSuccess}
                    />
                )}
            </Container>
        </Modal>
    );
}

export { EditBet };
