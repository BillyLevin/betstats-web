import React from 'react';
import styled from 'styled-components';

type Props = { children: React.ReactNode } & React.PropsWithoutRef<
    JSX.IntrinsicElements['p']
>;

const Desc = styled.p`
    line-height: 1.6;
    font-size: 1.8rem;
    text-align: center;
    letter-spacing: 2px;
    font-weight: 300;
    max-width: 120rem;
    margin-bottom: 3.2rem;
`;

function PageDescription({ children }: Props) {
    return <Desc>{children}</Desc>;
}

export { PageDescription };
