import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
// import {lightTheme, darkTheme} from './frontEnd/components/DarkMode/style';
import App from "./App";
// import DarkModeIcon from "./frontEnd/pages/DarkModeIcon";
import 'bootstrap/dist/css/bootstrap.css';



// Create a root.
const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </React.StrictMode>
);