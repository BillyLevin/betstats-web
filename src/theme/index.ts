import { DefaultTheme } from 'styled-components';

const colors = {
    black: '#222222',
    primary: '#FBFF12',
};

export type Colors = typeof colors;

export const theme: DefaultTheme = {
    colors,
};
