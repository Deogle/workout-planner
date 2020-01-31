import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

import {applyMiddleware, createStore} from 'redux';
import app from './redux/reducers/reducer';
import {Provider} from 'react-redux';

import * as serviceWorker from './serviceWorker';

//only add middleware during dev
const middleware = process.env.NODE_ENV !== 'production' ?
    [require('redux-immutable-state-invariant').default()] : []

const store = createStore(app,applyMiddleware(...middleware));
store.subscribe(()=>{});
const rootEl = document.getElementById('root');
const render = () => ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,rootEl)

render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
