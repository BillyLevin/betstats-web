import 'styled-components';
import { Colors } from '.';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: Colors;
    }
}
