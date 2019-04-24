import React, { createContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Local
import { Login, Admin } from "routes";
import reducer from "reducer";
import store from "reducer/store";
import { http } from "helpers/axios";
import { loadAuthFromLocalStorage } from "helpers/storage";

export const GlobalContext = createContext();

// Use authorization when available
// I have to figure out how to access store outside a functional component
http.interceptors.request.use(config => {
  const { token } = loadAuthFromLocalStorage(); // todo: use store istead of localstore
  if (token) {
    config.headers.authorization = token;
  }
  return config;
});

export const App = () => {
  const [{ auth, aws }, dispatch] = useReducer(reducer, store);

  return (
    <GlobalContext.Provider value={{ auth, aws, dispatch }}>
      <Router>
        <Switch>
          {/* Unsecure routes */}
          <Route path="/login" component={Login} />

          {/* Secure routes */}
          <Route path="/admin" component={Admin} />

          {/* Default Route */}
          <Redirect to="/admin" />
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;
