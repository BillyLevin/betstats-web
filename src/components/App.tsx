import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../theme';
import { Layout } from './Layout';
import { AuthProvider } from '../context/auth-context';
import { UserProvider } from '../context/user-context';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    }

    html {
        font-size: 62.5%; 
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
        overflow-y: scroll;
    }
`;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <AuthProvider>
                <UserProvider>
                    <Layout />
                </UserProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export { App };
