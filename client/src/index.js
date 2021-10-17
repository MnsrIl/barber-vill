import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/configureStore";
import AdapterLuxon from "@mui/lab/AdapterLuxon"
import {LocalizationProvider} from "@mui/lab";

ReactDOM.render(
  <StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterLuxon}>
                <App />
              </LocalizationProvider>
          </Provider>
      </BrowserRouter>
  </StrictMode>,
  document.getElementById('root')
);