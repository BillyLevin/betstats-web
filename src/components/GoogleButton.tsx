import React from 'react';
import googleLogo from '../img/google-logo.png';
import styled from 'styled-components';

var Container = styled.div`
    display: flex;
`;

var Anchor = styled.a`
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

    &:hover,
    &:active,
    &:focus {
        transform: translateY(-3px);
        box-shadow: 0 1px #ffffff inset, 0 3px 6px rgba(34, 25, 25, 0.4);
    }

    margin-left: 10px;

    img {
        width: 1.8rem;
        margin-right: 2.4rem;
    }
`;

var Text = styled.span`
    margin-right: 1.8rem;
`;

function GoogleButton() {
    return (
        <Container>
            <Anchor href="http://localhost:4000/auth/google">
                <img src={googleLogo} alt="Google Logo" />
                <Text>Sign in with Google</Text>
            </Anchor>
        </Container>
    );
}

export default GoogleButton;
