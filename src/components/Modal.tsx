import React from 'react';
import { Portal } from './Portal';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { FaTimes } from 'react-icons/fa';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { generateKeyDownHandler } from '../utils/events';

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
    background-color: ${props => props.theme.colors.greyDark};
    overflow-y: auto;
    transform: translate(-50%, -50%);
    border-radius: 3px;
    color: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
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
    transition: all 0.3s;
    color: ${props => props.theme.colors.white};
    outline: 2px solid transparent;

    svg {
        width: 2rem;
        height: auto;
    }

    &:hover,
    &:focus,
    &:active {
        background-color: ${props => props.theme.colors.black};
    }

    &:focus,
    &:active {
        outline: 2px solid ${props => props.theme.colors.primary};
    }
`;

function Modal({ id, isOpen, closeModal, label, children, triggerRef }: Props) {
    const backdropRef = React.useRef<HTMLElement | null>(null);
    const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);
    const mouseDownLocation = React.useRef<EventTarget | null>(null);
    const hasOpened = React.useRef(false);

    const handleKeyDown = generateKeyDownHandler(27, closeModal);

    React.useEffect(
        function trackModalOpened() {
            if (isOpen) {
                hasOpened.current = true;
            }
        },
        [isOpen]
    );

    React.useEffect(
        function focusCloseButton() {
            if (isOpen) {
                closeBtnRef.current?.focus();
            } else if (hasOpened.current) {
                triggerRef.current?.focus();
            }
        },
        [isOpen, triggerRef]
    );

    function handleAwayClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        // only hide modal if we click the backdrop
        if (event.currentTarget === mouseDownLocation.current) {
            closeModal();
        }
    }

    // we only want to close the modal if the mouse DOWN location is outside the modal content
    // this prevents modal from closing if we e.g. click inside the modal then drag cursor outside and release
    function setMouseDownLocation(
        event: React.MouseEvent<HTMLElement, MouseEvent>
    ) {
        mouseDownLocation.current = event.target;
    }

    if (isOpen) {
        return (
            <Portal id={id}>
                <FocusLock>
                    <RemoveScroll>
                        <Backdrop
                            onKeyDown={handleKeyDown}
                            onMouseDown={setMouseDownLocation}
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
