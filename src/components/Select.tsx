import React from 'react';
import { useSelect, UseSelectState } from 'downshift';
import styled from 'styled-components';
import { StyledButton } from './Button';

type Props = {
    items: number[];
    onChange: (changes: Partial<UseSelectState<number>>) => void;
    label: string;
};

const SelectContainer = styled.div`
    position: relative;
`;

const ItemList = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 99;
    list-style: none;
    text-align: center;
    max-width: 30rem;
    width: 100%;
    max-height: 20rem;
    overflow-y: auto;
`;

const Item = styled.li<{ highlighted: boolean }>`
    background-color: ${props =>
        props.highlighted
            ? props.theme.colors.greyDark
            : props.theme.colors.primary};

    color: ${props =>
        props.highlighted
            ? props.theme.colors.primary
            : props.theme.colors.greyDark};

    padding: 0.8rem;
    font-weight: 700;
`;

const Label = styled.label`
    margin-right: 0.8rem;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 400;
`;

function Select({ items, onChange, label }: Props) {
    const {
        isOpen,
        getLabelProps,
        getToggleButtonProps,
        selectedItem,
        getMenuProps,
        getItemProps,
        highlightedIndex,
    } = useSelect({
        items,
        initialSelectedItem: items[0],
        onSelectedItemChange: onChange,
    });

    return (
        <SelectContainer>
            <Label {...getLabelProps()}>{label}</Label>
            <StyledButton
                {...getToggleButtonProps()}
                className="btn-default"
                style={{ letterSpacing: '1px' }}
            >
                {selectedItem}
            </StyledButton>
            <ItemList {...getMenuProps()}>
                {isOpen &&
                    items.map((item, index) => (
                        <Item
                            highlighted={index === highlightedIndex}
                            key={`${item}-${index}`}
                            {...getItemProps({ item, index })}
                        >
                            {item}
                        </Item>
                    ))}
            </ItemList>
        </SelectContainer>
    );
}

export { Select };
