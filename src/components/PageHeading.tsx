import React from 'react';
import styled from 'styled-components';
import { FaHorseHead } from 'react-icons/fa';

type Props = {
    children: React.ReactNode;
    withDecoration?: boolean;
} & React.PropsWithoutRef<JSX.IntrinsicElements['h1']>;

const Container = styled.div``;

const H1 = styled.h1`
    color: ${props => props.theme.colors.primary};
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 8px;
    font-size: 5.5rem;
    text-align: center;
    position: relative;
    padding-bottom: 1.6rem;
`;

const Decoration = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.theme.colors.primary};
    margin-bottom: 3.2rem;

    svg {
        width: 7.2rem;
        height: auto;
        border: 3px solid ${props => props.theme.colors.primary};
        border-radius: 3px;
        padding: 0.8rem;
        position: relative;
    }

    span {
        position: relative;
    }

    span:before,
    span:after {
        border-radius: 2px;
        height: 3px;
        background-color: ${props => props.theme.colors.primary};
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        width: 300%;
    }

    span:before {
        right: calc(100% - 3px);
    }

    span:after {
        left: calc(100% - 3px);
    }
`;

function PageHeading({ children, withDecoration = false, ...props }: Props) {
    return (
        <Container>
            <H1 {...props}>{children}</H1>
            {withDecoration && (
                <Decoration>
                    <span aria-hidden="true">
                        <FaHorseHead />
                    </span>
                </Decoration>
            )}
        </Container>
    );
}

export { PageHeading };
