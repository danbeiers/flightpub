import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
// import {lightTheme, darkTheme} from './frontEnd/components/DarkMode/style';
import App from "./App";
// import AppDarkMode from "./frontEnd/pages/AppDarkMode";




// Create a root.
const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </React.StrictMode>
);