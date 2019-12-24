import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.colors.greyDark};
`;

function PageSpinner() {
    return (
        <Container>
            <Loader />
        </Container>
    );
}

export { PageSpinner };
