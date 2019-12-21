import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../context/user-context';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';

const Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
`;

function Layout() {
    const user = useUser();
    return (
        <BrowserRouter>
            <Container>
                {user ? <Authenticated /> : <Unauthenticated />}
            </Container>
        </BrowserRouter>
    );
}

export { Layout };
