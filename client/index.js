import ReactDOM from 'react-dom';
import React from 'react';

import Root from './container/Root';

const isDev = process.env.NODE_ENV === "development" || false;

if (isDev) {
    ReactDOM.render(
         < Root / > , document.getElementById('app')
    )
    if(module.hot) {
        module.hot.accept();
    }
} else {
    ReactDOM.render(
        <Root / > , document.getElementById('app')
    )
}