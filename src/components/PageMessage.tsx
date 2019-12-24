import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';

type Props = {
    message: string;
    type: 'success' | 'error' | 'info';
    children?: React.ReactNode;
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled(animated.div)`
    padding: 3.2rem;
    border-radius: 3px;
    border-width: 3px;
    border-style: solid;
    display: flex;
    align-items: center;
    flex-direction: column;

    &.page-message-success {
        background-color: ${props => props.theme.colors.successLight};
        border-color: ${props => props.theme.colors.successDark};
        color: ${props => props.theme.colors.successDark};
    }

    svg {
        margin-right: 1.6rem;
        width: 3.2rem;
        height: auto;
    }
`;

const Message = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        font-weight: 500;
        font-size: 2rem;
        letter-spacing: 1px;
    }
`;

function PageMessage({ message, type, children }: Props) {
    const animationProps = useSpring({
        to: { opacity: 1, transform: 'scale(1,1)' },
        from: { opacity: 0, transform: 'scale(0.75,0.75)' },
        config: { duration: 400 },
    });
    return (
        <Container>
            <Content
                className={`page-message-${type}`}
                style={{ ...animationProps }}
            >
                <Message>
                    <FaCheckCircle />
                    <span role="alert" aria-live="assertive">
                        {message}
                    </span>
                </Message>
                {children && <div>{children}</div>}
            </Content>
        </Container>
    );
}

export { PageMessage };
