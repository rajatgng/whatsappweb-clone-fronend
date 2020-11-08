import React from 'react';
import Background from 'container/Background/Background';
import MainContainer from 'container/MainContainer/MainContainer';
import { ThemeProvider } from 'styled-components';

// const muiTheme = createMuiTheme({
//     props: {
//         MuiIconButton: {
//             disableRipple: true,
//         },
//     },
//     overrides: {
//         MuiIconButton: {
//             root: {
//                 padding: '0.8rem',
//             },
//         },
//     },
// });

const theme = {
    colors: {
        primary: 'blue',
        white: '#fff',
    },
    animation: {
        time: '250ms',
    },
};

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Background>
                <MainContainer />
            </Background>
        </ThemeProvider>
    );
};

export default App;
