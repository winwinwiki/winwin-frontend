import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRoutes from "./containers/app/app";
import registerServiceWorker from "./registerServiceWorker";
import { ConnectedRouter } from "react-router-redux";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers";
//import Amplify from "aws-amplify";
//import apiConfig from "./buildConfig/apiConfig";
import { checkTokenExpiration } from "./middlewares/checkTokenExpiration";

// Amplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: apiConfig.cognito.REGION,
//     userPoolId: apiConfig.cognito.USER_POOL_ID,
//     identityPoolId: apiConfig.cognito.IDENTITY_POOL_ID,
//     userPoolWebClientId: apiConfig.cognito.APP_CLIENT_ID
//   },
//   Storage: {
//     region: apiConfig.s3.REGION,
//     bucket: apiConfig.s3.BUCKET,
//     identityPoolId: apiConfig.cognito.IDENTITY_POOL_ID
//   },
//   API: {
//     endpoints: [
//       {
//         name: "image",
//         endpoint: apiConfig.apiGateway.URL,
//         region: apiConfig.apiGateway.REGION
//       }
//     ]
//   }
// });

export const history = createHistory();

const initialState = {};
const customEnhancers = [checkTokenExpiration];
const middleware = [thunk, routerMiddleware(history), ...customEnhancers];

// if (process.env.NODE_ENV === "development") {
//   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

//   if (typeof devToolsExtension === "function") {
//     enhancers.push(devToolsExtension());
//   }
// }

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);

export const store = createStore(
  reducer,
  initialState,
  enhancer
  // compose(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

if (module.hot) {
  module.hot.accept("./containers/app", () => {
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRoutes />
        </ConnectedRouter>
      </Provider>,
      document.getElementById("root")
    );
  });
}
