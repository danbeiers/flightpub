import React from 'react';


import {ToggleButton} from "../components/DarkMode/ToggleButton";
import {useDarkMode} from '../components/DarkMode/DarkMode';
import {lightTheme, darkTheme} from '../components/DarkMode/darkmodestyle';
import styled, { ThemeProvider } from 'styled-components';

const Container = styled.div`
  max-width: 50%;
  width: 100%;
  height: 500px;
  margin: 8rem auto 0;
  background: black !important;
`;

function DarkModeIcon(){
        const [ theme, toggleTheme ] = useDarkMode();
        const themeMode = theme === 'light' ? lightTheme : darkTheme;

        return (
            <ThemeProvider theme={themeMode}>
                <Container>
                    <style />
                    <ToggleButton theme={theme} toggleTheme={toggleTheme} />

                </Container>
            </ThemeProvider>
        );
    }

    export default DarkModeIcon;

