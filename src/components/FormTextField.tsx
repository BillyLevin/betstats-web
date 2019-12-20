import React from 'react';
import { useField, FieldAttributes } from 'formik';
import styled from 'styled-components';
import { capitalizeFirstLetter } from '../utils/strings';
import { animated, useSpring } from 'react-spring';

type Props = { label: string; isAnimated?: boolean } & FieldAttributes<any>;

var Container = styled(animated.div)`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1.6rem;
`;

var Label = styled.label`
    color: ${props => props.theme.colors.primary};
    text-transform: uppercase;
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 1px;
    margin-bottom: 4px;
    font-weight: 300;
`;

var Input = styled.input<{ hasError: boolean }>`
    padding: 0.8rem;
    border-radius: 3px;
    border: 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
    outline: 0;
    border-color: ${props =>
        props.hasError ? props.theme.colors.error : 'transparent'};
    background-color: ${props =>
        props.hasError
            ? props.theme.colors.errorLight
            : props.theme.colors.white};

    &:focus {
        background-color: ${props => props.theme.colors.white};
        border-bottom: 2px solid ${props => props.theme.colors.primary};
    }

    &::placeholder {
        color: ${props => props.theme.colors.black};
    }
`;

var ErrorMessage = styled.span`
    color: ${props => props.theme.colors.error};
    font-size: 1.1rem;
    margin-top: 4px;
`;

function FormTextField({ label, isAnimated = false, ...props }: Props) {
    var [field, meta] = useField<any>(props);
    var animationProps = useSpring({
        to: { opacity: 1, marginTop: 0 },
        from: { opacity: 0, marginTop: -50 },
        config: { duration: 400 },
    });

    var errorText =
        meta.error && meta.touched ? capitalizeFirstLetter(meta.error) : '';
    var hasError = Boolean(errorText);

    return (
        <Container style={isAnimated ? animationProps : undefined}>
            <Label htmlFor={field.name}>{label}</Label>
            <Input
                {...field}
                {...props}
                id={field.name}
                hasError={hasError}
                autoComplete="off"
            />
            {hasError && <ErrorMessage>{errorText}</ErrorMessage>}
        </Container>
    );
}

export { FormTextField };
