import React from 'react';
import styled from 'styled-components';
import { Loader } from './Loader';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

function ContainedLoader() {
    return (
        <Container>
            <Loader />
        </Container>
    );
}

export { ContainedLoader };
