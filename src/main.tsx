import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './lib/Theme';
import { Provider } from 'react-redux';
import store from './app/store/store';

document.addEventListener('DOMContentLoaded', () => {
  console.log();
});

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);
