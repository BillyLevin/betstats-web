import React from 'react';
import { Portal } from './Portal';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { FaTimes } from 'react-icons/fa';
import { useKeyDown } from '../hooks/useKeyDown';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

type Props = {
    id: string;
    isOpen: boolean;
    closeModal: () => void;
    label: string;
    children: React.ReactNode;
    triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
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
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    svg {
        width: 2rem;
        height: auto;
    }

    &:hover,
    &:focus,
    &:active {
        background-color: ${props => props.theme.colors.primaryDark};
    }

    &:focus,
    &:active {
        outline: 2px auto ${props => props.theme.colors.greyDark};
    }
`;

// TODO: lock scrolling

function Modal({ id, isOpen, closeModal, label, children, triggerRef }: Props) {
    const handleKeyDown = useKeyDown(27, closeModal);
    const backdropRef = React.useRef<HTMLElement | null>(null);
    const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

    React.useEffect(
        function focusCloseButton() {
            if (isOpen) {
                closeBtnRef.current?.focus();
            } else {
                triggerRef.current?.focus();
            }
        },
        [isOpen, triggerRef]
    );

    function handleAwayClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        // only hide modal if we click the backdrop
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }

    if (isOpen) {
        return (
            <Portal id={id}>
                <FocusLock>
                    <RemoveScroll>
                        <Backdrop
                            onKeyDown={handleKeyDown}
                            onClick={handleAwayClick}
                            aria-modal="true"
                            tabIndex={-1}
                            role="dialog"
                            aria-label={label}
                            ref={backdropRef}
                        >
                            <ModalContainer>
                                <Close
                                    aria-label="Close Modal"
                                    onClick={closeModal}
                                    ref={closeBtnRef}
                                >
                                    <FaTimes />
                                </Close>
                                {children}
                            </ModalContainer>
                        </Backdrop>
                    </RemoveScroll>
                </FocusLock>
            </Portal>
        );
    }

    return null;
}

export { Modal };
