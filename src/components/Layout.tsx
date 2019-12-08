import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import styled from 'styled-components';

var Container = styled.div`
    display: flex;
    width: 100%;
    min-height: 100vh;
`;

var Main = styled.main`
    background-color: ${p => p.theme.colors.greyDark};
    color: ${p => p.theme.colors.white};
    flex: 1;
`;

function Layout() {
    return (
        <BrowserRouter>
            <Container>
                <Header />
                <Main>
                    <Routes />
                </Main>
            </Container>
        </BrowserRouter>
    );
}

export default Layout;
