import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useUser } from '../context/user-context';
import { FaSignInAlt, FaHome, FaPlus, FaTasks } from 'react-icons/fa';

const StyledNav = styled.nav`
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

function Nav() {
    const user = useUser();
    return (
        <StyledNav>
            <ul>
                <li>Hello, {user!.name}!</li>
                <li>
                    <NavLink to="/" activeClassName="is-active" exact>
                        <FaHome /> <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/create-bet" activeClassName="is-active">
                        <FaPlus /> <span>Create Bet</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/bet-manager" activeClassName="is-active">
                        <FaTasks /> <span>Bet Manager</span>
                    </NavLink>
                </li>
            </ul>
        </StyledNav>
    );
}

function UnauthenticatedNav() {
    return (
        <StyledNav>
            <ul>
                <li>
                    <NavLink to="/" activeClassName="is-active" exact>
                        <FaHome /> <span>Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/login" activeClassName="is-active" exact>
                        <FaSignInAlt /> <span>Login</span>
                    </NavLink>
                </li>
            </ul>
        </StyledNav>
    );
}

export { Nav, UnauthenticatedNav };
