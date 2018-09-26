import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./styles/index.scss";

import Header from "./components/common/header";
import Sidebar from "./components/common/side-bar";
import Home from "./components/pages/home";

const App = props => {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-container">
          <Sidebar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
