import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

import Brightness1Icon from '@material-ui/icons/Brightness1';
import Brightness2Icon from '@material-ui/icons/Brightness2';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';

import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';
import deepPurple from '@material-ui/core/colors/deepPurple';
import red from '@material-ui/core/colors/red';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fixedBottomLeft: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: 40,
        margin: 20,
        transition: 'all 0.2s ease',
        zIndex: 999,
        cursor: 'pointer'
    }
}));

const typography = {
    h2: {
        fontSize: '3.75rem',
        '@media (max-width:600px)': {
            fontSize: '3rem',
        }
    }
};
// breakpoints: {
//   [up('md')]: {
//     fontSize: '2.4rem'
//   }
// }

const themeConfig = {
    dark: {
        palette: {
            type: 'dark',
            primary: {
                main: lightBlue[500],
            },
            secondary: {
                main: amber[500]
            },
            background: {
                default: '#282c34'
            },
        },
        typography
    },
    light: {
        palette: {
            type: 'light',
            primary: {
                main: deepPurple['A400'],
            },
            secondary: {
                main: amber['A400']
            },
            background: {
            },
            text: {
                primary: deepPurple[900]
            },
        },
        typography
    }
}

const withTheme = Component => props => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const darkTheme = createMuiTheme(themeConfig.dark);
    const lightTheme = createMuiTheme(themeConfig.light);

    const [selectedTheme, selectTheme] = useState(lightTheme);

    useEffect(() => {
        let savedThemePreference = localStorage.getItem('madinah-web-theme');
        if (savedThemePreference) {
            selectTheme(savedThemePreference === 'dark' ? darkTheme : lightTheme)
        } else {
            selectTheme(prefersDarkMode ? darkTheme : lightTheme)
        }
    }, []);

    const toggleTheme = () => {
        let newTheme = selectedTheme.palette.type === 'dark' ? lightTheme : darkTheme;
        selectTheme(newTheme);
        localStorage.setItem('madinah-web-theme', newTheme.palette.type);
    }

    const classes = useStyles();

    return (
        <ThemeProvider theme={selectedTheme}>
            <CssBaseline />
            <Component theme={selectedTheme} {...props} />
            <Box className={classes.fixedBottomLeft} onClick={toggleTheme}>
                {
                    selectedTheme.palette.type === 'dark' ?
                        <Brightness1Icon fontSize="large" /> :
                        <Brightness2Icon fontSize="large" />
                }
            </Box>
        </ThemeProvider>
    )
}

export default withTheme;