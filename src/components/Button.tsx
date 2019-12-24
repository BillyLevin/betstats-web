import React from 'react';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';

type ExtraProps = {
    variant?: 'default' | 'unfilled';
    children: React.ReactNode;
};

type Props = ExtraProps &
    React.PropsWithoutRef<JSX.IntrinsicElements['button']>;

type StyleProps = {
    variant: 'default' | 'unfilled';
};

const StyledButton = styled.button<StyleProps>`
    font-family: inherit;
    border: ${props =>
        '2px solid ' +
        (props.variant === 'unfilled'
            ? props.theme.colors.primary
            : 'transparent')};
    padding: 0.8rem 1.6rem;
    border-radius: 3px;
    font-weight: 700;
    outline: 0;
    text-transform: uppercase;
    font-size: 1.4rem;
    letter-spacing: 3px;
    cursor: pointer;
    transition: all 0.3s;
    color: ${props =>
        props.variant === 'unfilled'
            ? props.theme.colors.primary
            : props.theme.colors.greyDark};

    background-color: ${props =>
        props.variant === 'unfilled'
            ? 'transparent'
            : props.theme.colors.primary};

    &:hover,
    &:focus,
    &:active {
        background-color: ${props =>
            props.variant === 'unfilled'
                ? props.theme.colors.primary
                : props.theme.colors.primaryDark};

        color: ${props => props.theme.colors.greyDark};
    }

    &:focus {
        box-shadow: 0 0 0 2px
            ${props => hexToRGBA(props.theme.colors.primaryDark, 0.8)};
    }
`;

function Button({ variant = 'default', children, ...props }: Props) {
    return (
        <StyledButton {...props} variant={variant}>
            {children}
        </StyledButton>
    );
}

export { Button };
