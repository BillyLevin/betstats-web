import { DefaultTheme } from 'styled-components';

const colors = {
    black: '#000000',
    primary: '#F5F411',
    primaryLight: '#f5f4b0',
    primaryDark: '#b5b407',
    greyDark: '#222222',
    greyLight: '#FBFBFB',
    grey: '#CACFD6',
    white: '#FFFFFF',
    error: '#A40606',
    errorLight: '#F08989',
    errorDark: '#5e0303',
    successDark: '#55663D',
    successLight: '#ceebab',
    success: '#1c9903',
};

export type Colors = typeof colors;

export const theme: DefaultTheme = {
    colors,
};
