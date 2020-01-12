import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { Modal } from './Modal';

type Props = {
    betId: string;
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    color: ${props => props.theme.colors.success};
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
    outline: 0;

    &:hover,
    &:active,
    &:focus {
        color: ${props => props.theme.colors.successDark};
    }

    &:focus {
        box-shadow: 0 0 0 2px
            ${props => hexToRGBA(props.theme.colors.successDark, 0.8)};
    }

    svg {
        width: 1.4rem;
        height: auto;
    }
`;

// TODO: set app to aria-hidden="true", close when click overlay, have appropriate aria labels, make sure elements are tabbable

function SettleBet({ betId }: Props) {
    const [showModal, setShowModal] = React.useState(false);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    return (
        <Container>
            <span>Open</span>
            <Button aria-label="Settle this bet" onClick={openModal}>
                <FaArrowCircleRight />
            </Button>
            <Modal id="settle-bet" isOpen={showModal} closeModal={closeModal} />
        </Container>
    );
}

export { SettleBet };
