import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo-transparent-cropped.png';
import { Link, NavLink } from 'react-router-dom';
import { FaHome, FaSignInAlt } from 'react-icons/fa';

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

var Nav = styled.nav`
    width: 100%;

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    ul li {
        &:not(:last-child) {
            margin-bottom: 2px;
        }
    }

    ul li a:link,
    ul li a:visited {
        display: flex;
        align-items: center;
        text-decoration: none;
        padding: 1.6rem;
        color: ${p => p.theme.colors.greyDark};
        font-weight: 700;
        transition: all 0.3s;
        text-transform: uppercase;
        position: relative;
        z-index: 1;

        svg {
            width: 2.4rem;
            height: auto;
        }

        span {
            margin-left: auto;
            margin-right: auto;
        }
    }

    ul li a,
    ul li a::after {
        transition: all 0.5s;
    }

    ul li a::after {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 100%;
        height: 1px;
        content: '';
        background-color: ${props => props.theme.colors.greyDark};
        visibility: none;
        opacity: 0;
        z-index: -1;
    }

    ul li a:hover,
    ul li a:focus,
    ul li a:active,
    ul li a.is-active {
        color: ${p => p.theme.colors.primary};
        outline: 0;
    }

    ul li a:hover::after,
    ul li a:focus::after,
    ul li a:active::after,
    ul li a.is-active::after {
        opacity: 1;
        visibility: visible;
        height: 100%;
    }
`;

function Header() {
    return (
        <>
            <HeaderContainer>
                <Link to="/" className="nav-logo">
                    <Logo src={logo} alt="MyBetStats Logo" />
                </Link>
                <Nav>
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="is-active" exact>
                                <FaHome /> <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/login"
                                activeClassName="is-active"
                                exact
                            >
                                <FaSignInAlt /> <span>Login</span>
                            </NavLink>
                        </li>
                    </ul>
                </Nav>
            </HeaderContainer>
        </>
    );
}

export default Header;
