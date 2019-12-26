import React from 'react';
import { GoogleButton } from './GoogleButton';
import { Page } from './Page';

function Login() {
    return (
        <Page>
            Use the button below to log in!!!
            <GoogleButton />
        </Page>
    );
}

export { Login };
