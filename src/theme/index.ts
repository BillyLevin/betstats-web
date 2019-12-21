import { DefaultTheme } from 'styled-components';

const colors = {
    black: '#000000',
    primary: '#F5F411',
    primaryLight: '#f5f4b0',
    primaryDark: '#b5b407',
    greyDark: '#222222',
    white: '#FFFFFF',
    error: '#A40606',
    errorLight: '#F08989',
};

export type Colors = typeof colors;

export const theme: DefaultTheme = {
    colors,
};
