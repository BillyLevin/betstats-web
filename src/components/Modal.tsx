import React from 'react';
import { Portal } from './Portal';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { FaTimes } from 'react-icons/fa';

type Props = {
    id: string;
    isOpen: boolean;
    closeModal: () => void;
};

const Backdrop = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    background-color: ${props => hexToRGBA(props.theme.colors.black, 0.8)};
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    min-width: 30rem;
    max-height: 100%;
    padding: 2.4rem;
    background-color: ${props => props.theme.colors.primary};
    overflow-y: auto;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    color: ${props => props.theme.colors.greyDark};
`;

const Close = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    line-height: 1;
    border: 0;
    background: transparent;
    cursor: pointer;
    padding: 0.4rem;
    background-color: ${props => props.theme.colors.primaryDark};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: color 0.3s;

    svg {
        width: 2rem;
        height: auto;
    }

    &:hover,
    &:focus,
    &:active {
        color: ${props => props.theme.colors.white};
    }

    &:focus,
    &:active {
        outline-color: ${props => props.theme.colors.greyDark};
        outline-width: 2px;
    }
`;

function Modal({ id, isOpen, closeModal }: Props) {
    if (isOpen) {
        return (
            <Portal id={id}>
                <Backdrop>
                    <ModalContainer>
                        <Close aria-label="Close" onClick={closeModal}>
                            <FaTimes />
                        </Close>
                        <h1>title</h1>
                        <div>hello</div>
                    </ModalContainer>
                </Backdrop>
            </Portal>
        );
    }

    return null;
}

export { Modal };
