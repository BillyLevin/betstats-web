import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo-transparent-cropped.png';
import { Link } from 'react-router-dom';
import { Nav, UnauthenticatedNav } from './Nav';

var HeaderContainer = styled.header`
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.greyDark};
    width: 32rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-shadow: 0 0 4px 1px ${p => p.theme.colors.black};

    .nav-logo {
        width: 60%;
        margin: 3.2rem 0;
    }

    .nav-logo:focus {
        outline: 3px solid ${p => p.theme.colors.greyDark};
    }
`;

var Logo = styled.img`
    width: 100%;
    border-radius: 3px;
`;

function Header() {
    return (
        <>
            <HeaderContainer>
                <Link to="/" className="nav-logo">
                    <Logo src={logo} alt="MyBetStats Logo" />
                </Link>
                <Nav />
            </HeaderContainer>
        </>
    );
}

function UnauthenticatedHeader() {
    return (
        <>
            <HeaderContainer>
                <Link to="/" className="nav-logo">
                    <Logo src={logo} alt="MyBetStats Logo" />
                </Link>
                <UnauthenticatedNav />
            </HeaderContainer>
        </>
    );
}

export { Header, UnauthenticatedHeader };
