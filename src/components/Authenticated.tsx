import React from 'react';
import { Header } from './Header';
import { Routes } from './Routes';
import styled from 'styled-components';

export var Main = styled.main`
    background-color: ${p => p.theme.colors.greyDark};
    color: ${p => p.theme.colors.white};
    flex: 1;
    padding: 2.4rem;
`;

function Authenticated() {
    return (
        <>
            <Header />
            <Main>
                <Routes />
            </Main>
        </>
    );
}

export { Authenticated };
