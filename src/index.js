import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
//Component
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import LocalStorageService from "./storage/LocalStorageService";
import store from "./Store";

class Root extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {

    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById("root"));

registerServiceWorker();
