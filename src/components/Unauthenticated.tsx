import React from 'react';
import { UnauthenticatedRoutes } from './Routes';
import { Main } from './Authenticated';
import { UnauthenticatedHeader } from './Header';

function Unauthenticated() {
    return (
        <>
            <UnauthenticatedHeader />
            <Main>
                <UnauthenticatedRoutes />
            </Main>
        </>
    );
}

export { Unauthenticated };
