import { DefaultTheme } from 'styled-components';

const colors = {
    black: '#000000',
    primary: '#F5F411',
    greyDark: '#222222',
    white: '#FFFFFF',
};

export type Colors = typeof colors;

export const theme: DefaultTheme = {
    colors,
};
