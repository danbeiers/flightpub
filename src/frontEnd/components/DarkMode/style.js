import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
  }
`;

export const lightTheme = {
    body: '#fff',
    //background: "#fff",
    //text: '#121212',
};

export const darkTheme = {
    body: '#121212',
    //background: "#000",
    //text: '#fff',
};

