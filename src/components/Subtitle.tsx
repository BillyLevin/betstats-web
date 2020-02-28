import styled from 'styled-components';

export const Subtitle = styled.h1`
    padding-bottom: 0.8rem;
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    margin-bottom: 2.4rem;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 3.2rem;
    color: ${props => props.theme.colors.primary};
`;
