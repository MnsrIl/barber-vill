import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/configureStore";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import AdapterLuxon from "@mui/lab/AdapterLuxon"
import {LocalizationProvider} from "@mui/lab";

ReactDOM.render(
  <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
              <Provider store={store}>
                  <App />
              </Provider>
          </BrowserRouter>
      </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);