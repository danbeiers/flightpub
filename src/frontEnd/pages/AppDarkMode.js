import React from 'react';


import {Toggle} from "../components/DarkMode/Toggle";
import {useDarkMode} from '../components/DarkMode/useDarkMode';
import {lightTheme, darkTheme} from '../components/DarkMode/style';
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
  max-width: 50%;
  margin: 8rem auto 0;
`;

function AppDarkMode(){
        const [ theme, toggleTheme ] = useDarkMode();
        const themeMode = theme === 'light' ? lightTheme : darkTheme;

        return (
            <ThemeProvider theme={themeMode}>
                <Container>
                    <style />
                    <Toggle theme={theme} toggleTheme={toggleTheme} />

                </Container>
            </ThemeProvider>
        );
    }

    export default AppDarkMode;

