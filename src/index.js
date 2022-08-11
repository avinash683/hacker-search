import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Provider} from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
const history = createBrowserHistory();
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();