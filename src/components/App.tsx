import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../theme';
import { Layout } from './Layout';
import { AuthProvider } from '../context/auth-context';
import { UserProvider } from '../context/user-context';

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,700&display=swap');

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
        background-color: ${props => props.theme.colors.greyDark};
    }

    h1,h2,h3,h4,h5,h6 {
        font-family: 'Open Sans', sans-serif;
    }

    a:link, a:visited {
        color: ${props => props.theme.colors.primary};
        transition: all .3s;
    }

    a:hover, a:active {
        outline: 0;
        color: ${props => props.theme.colors.primaryDark};
    }

    a:focus {
        color: ${props => props.theme.colors.greyDark};
        background-color: ${props => props.theme.colors.primary};
        outline: 0;
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
