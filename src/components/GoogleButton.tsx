import React from 'react';
import googleLogo from '../img/google-logo.png';
import styled from 'styled-components';
import { API_URL } from '../utils/api';

const Container = styled.div`
    display: flex;
`;

const Anchor = styled.a`
    &:link,
    &:visited {
        display: flex;
        align-items: center;
        background-color: #ffffff;
        height: 4rem;
        padding: 0 0.8rem;
        justify-content: center;
        width: auto;
        text-transform: uppercase;
        font-size: 1.4rem;
        color: rgba(0, 0, 0, 0.54);
        font-weight: 500;
        text-decoration: none;
        border-radius: 2px;
        box-shadow: 0 1px #ffffff inset, 0 1px 3px rgba(34, 25, 25, 0.4);
        transition: all 0.3s;
        margin-left: 10px;
    }

    &:hover,
    &:active,
    &:focus {
        transform: translateY(-3px);
        box-shadow: 0 1px #ffffff inset, 0 3px 6px rgba(34, 25, 25, 0.4);
        color: rgba(0, 0, 0, 0.8);
    }

    img {
        width: 1.8rem;
        margin-right: 2.4rem;
    }
`;

const Text = styled.span`
    margin-right: 1.8rem;
`;

function GoogleButton() {
    return (
        <Container>
            <Anchor href={`${API_URL}/auth/google`}>
                <img src={googleLogo} alt="Google Logo" />
                <Text>Sign in with Google</Text>
            </Anchor>
        </Container>
    );
}

export { GoogleButton };
