import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducers } from "./reducers";
import storage from 'redux-persist/lib/storage'

import App from "./App";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
    key: "moedaRoot",
    storage
};
const persistentedReducer = persistReducer(persistConfig, reducers);
const store = createStore(
    persistentedReducer
);
const persistor = persistStore(store);

//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
