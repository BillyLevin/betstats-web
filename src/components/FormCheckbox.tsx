import React from 'react';
import { FieldAttributes, useField } from 'formik';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';

type Props = { label: string } & FieldAttributes<any>;

const Container = styled.div`
    margin-bottom: 1.6rem;
`;

const Label = styled.label`
    cursor: pointer;
    display: block;
    position: relative;
    user-select: none;
    font-size: 1.4rem;
    padding-left: 2.4rem;
    letter-spacing: 1px;
`;

const Input = styled.input`
    cursor: pointer;
    border: 0;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const Checkbox = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    height: 1.6rem;
    width: 1.6rem;
    background-color: ${props => props.theme.colors.primaryLight};
    border-radius: 2px;
    transition: box-shadow 0.3s;

    ${Input}:checked + & {
        background-color: ${props => props.theme.colors.primary};
    }

    &::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 1px;
        width: 7px;
        height: 13px;
        border: solid ${props => props.theme.colors.greyDark};
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        display: none;
    }

    ${Input}:checked + &::after {
        display: block;
    }

    ${Input}:focus + &,
    ${Input}:active + & {
        box-shadow: 0 0 0 2px
            ${props => hexToRGBA(props.theme.colors.primaryDark, 0.8)};
    }
`;

function FormCheckbox({ label, ...props }: Props) {
    const [field] = useField<any>(props);
    return (
        <Container>
            <Label htmlFor={field.name}>
                {label}
                <Input {...field} {...props} id={field.name} />
                <Checkbox />
            </Label>
        </Container>
    );
}

export { FormCheckbox };
