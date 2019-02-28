import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routers from './routes';

ReactDOM.render(
    <Provider store={store} >
        <Routers />
    </Provider>
    ,
    document.getElementById('root')
);