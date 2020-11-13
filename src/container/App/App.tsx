import React from 'react';
import Background from 'container/Background/Background';
import MainContainer from 'container/MainContainer/MainContainer';
import { ThemeProvider } from 'styled-components';
import lightTheme from 'theme/lightTheme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={lightTheme}>
            <Background>
                <MainContainer />
            </Background>
        </ThemeProvider>
    );
};

export default App;
