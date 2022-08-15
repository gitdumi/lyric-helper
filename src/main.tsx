import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";
import {BrowserRouter, HashRouter} from "react-router-dom";

import {ThemeProvider} from "@emotion/react";
import {theme} from "./lib/Theme";

ReactDOM.render(
    // <React.StrictMode>
        <HashRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </HashRouter>,
    // </React.StrictMode>,
    document.getElementById('root')
);