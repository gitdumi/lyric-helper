import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";
import {BrowserRouter} from "react-router-dom";

import {ThemeProvider} from "@emotion/react";
import {theme} from "./lib/Theme";

ReactDOM.render(
    // <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </BrowserRouter>,
    // </React.StrictMode>,
    document.getElementById('root')
);