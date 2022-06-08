import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import App from "./App";
import getTaskReducers from "./reducers/getTaskReducers.js"

const store = createStore(getTaskReducers, applyMiddleware(thunk));
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
);
