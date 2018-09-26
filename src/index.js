import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./styles/index.scss";

import Header from "./components/common/header";
import Sidebar from "./components/common/side-bar";
import Home from "./components/pages/home";

const client = new ApolloClient({
  uri: "https://graphql-engine-playground.herokuapp.com/v1alpha1/graphql"
});

const App = props => {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
