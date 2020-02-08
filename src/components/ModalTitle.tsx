import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
    padding-bottom: 0.8rem;
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    margin-bottom: 2.4rem;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 3.2rem;
`;

type Props = React.PropsWithoutRef<JSX.IntrinsicElements['h1']>;

function ModalTitle({ children, ...props }: Props) {
    return <Title {...props}>{children}</Title>;
}

export { ModalTitle };
