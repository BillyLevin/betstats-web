import React from 'react';
import { useFadeIn } from '../hooks/animation';
import { animated } from 'react-spring';
import styled from 'styled-components';

const Section = styled(animated.article)`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`;

type Props = {
    children: React.ReactNode;
};

function Page({ children }: Props) {
    const animationProps = useFadeIn();

    return <Section style={{ ...animationProps }}>{children}</Section>;
}

export { Page };
