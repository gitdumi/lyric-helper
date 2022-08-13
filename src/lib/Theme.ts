import {createTheme} from '@mui/material/styles';


export const COLORS = {
    GREEN: '#1adebb',
    RED: '#F83F07',
    PURPLE: '#9719E6',
    BLUE: '#1a9fde',
    WHITE: '#000000'
}

export const SECTION_COLORS = [COLORS.GREEN, COLORS.BLUE, COLORS.RED, COLORS.PURPLE];

interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}

export let theme = createTheme({
    typography: {
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    shape: {
        borderRadius: 0,
    },
    palette: {
        primary: {
            light: '',
            main: COLORS.GREEN,
            dark: '',
            contrastText: COLORS.WHITE,
        },
        secondary: {
            light: '',
            main: COLORS.BLUE,
            dark: '',
            contrastText: '',
        },
        success: {
            light: '',
            main: COLORS.BLUE,
            dark: '',
            contrastText: '',
        },
        error: {
            light: '',
            main: COLORS.RED,
            dark: '',
            contrastText: '',
        },
    },
});