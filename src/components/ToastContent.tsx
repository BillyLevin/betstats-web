import React from 'react';
import styled from 'styled-components';

type Props = {
    message: string;
};

const ToastContainer = styled.div`
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
`;

function ToastContent({ message }: Props) {
    return <ToastContainer>{message}</ToastContainer>;
}

export { ToastContent };
