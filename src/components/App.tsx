import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../theme';
import Layout from './Layout';
import Router from './Router';

const GlobalStyle = createGlobalStyle`
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
        /* font-family: 'Roboto', sans-serif; */
        font-size: 1.6rem;
        overflow-y: scroll;
    }
`;

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
                <Layout />
            </Router>
        </ThemeProvider>
    );
}

export default App;
