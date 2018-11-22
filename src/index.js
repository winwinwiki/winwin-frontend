import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './containers/app/app';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter } from 'react-router-redux';
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
  
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

const store = createStore(reducer, initialState, compose(
    applyMiddleware(...middleware),
    ...enhancers
));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppRoutes />
        </ConnectedRouter>
    </Provider>
  , document.getElementById('root')
);

registerServiceWorker();

if (module.hot) {
    module.hot.accept('./containers/app', () => {
      ReactDOM.render(
          <Provider store={store}>
          <ConnectedRouter history={history}>
                <AppRoutes />
            </ConnectedRouter>
          </Provider>
        , document.getElementById('root')
      );
    });
  }
  
