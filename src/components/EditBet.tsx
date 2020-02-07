import React from 'react';
import { Modal } from './Modal';

type Props = {
    betId: string | null;
    triggerRef: React.MutableRefObject<HTMLTableRowElement | null>;
    closeModalFunction: () => void;
};

function EditBet({ betId, triggerRef, closeModalFunction }: Props) {
    const [isOpen, setIsOpen] = React.useState(false);
    console.log(betId);

    React.useEffect(
        function handleBetIdChange() {
            setIsOpen(Boolean(betId));
        },
        [betId]
    );

    return (
        <Modal
            id="edit-bet"
            triggerRef={triggerRef}
            isOpen={isOpen}
            label="Edit Bet"
            closeModal={closeModalFunction}
        >
            <h1>ID: {betId}</h1>
        </Modal>
    );
}

export { EditBet };
