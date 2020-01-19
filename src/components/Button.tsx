import React from 'react';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';

type ExtraProps = {
    variant?: 'default' | 'unfilled' | 'success';
    children: React.ReactNode;
};

type Props = ExtraProps &
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>;

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    font-family: inherit;
    border-width: 2px;
    border-style: solid;
    padding: 0.8rem 1.6rem;
    border-radius: 3px;
    font-weight: 700;
    outline: 0;
    text-transform: uppercase;
    font-size: 1.4rem;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s;

    &.btn-unfilled {
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
        background-color: transparent;

        &:hover:not([disabled]),
        &:focus:not([disabled]),
        &:active:not([disabled]) {
            background-color: ${props => props.theme.colors.primary};
            color: ${props => props.theme.colors.greyDark};
        }
    }

    &.btn-default {
        border-color: transparent;
        color: ${props => props.theme.colors.greyDark};
        background-color: ${props => props.theme.colors.primary};

        &:hover:not([disabled]),
        &:focus:not([disabled]),
        &:active:not([disabled]) {
            background-color: ${props => props.theme.colors.primaryDark};
            color: ${props => props.theme.colors.greyDark};
        }
    }

    &.btn-success {
        border-color: ${props => props.theme.colors.successDark};
        color: ${props => props.theme.colors.successDark};
        background-color: transparent;

        &:hover:not([disabled]),
        &:focus:not([disabled]),
        &:active:not([disabled]) {
            background-color: ${props => props.theme.colors.successDark};
            color: ${props => props.theme.colors.successLight};
        }

        &:focus:not([disabled]) {
            box-shadow: 0 0 0 2px
                ${props => hexToRGBA(props.theme.colors.successDark, 0.7)};
        }
    }

    &:focus {
        box-shadow: 0 0 0 2px
            ${props => hexToRGBA(props.theme.colors.primaryDark, 0.8)};
    }

    &:disabled {
        background-color: ${props => props.theme.colors.grey};
    }
`;

function Button({ variant = 'default', children, className, ...props }: Props) {
    return (
        <StyledButton
            {...props}
            className={`btn-${variant} ${className || ''}`.trim()}
        >
            {children}
        </StyledButton>
    );
}

export { Button, StyledButton };
