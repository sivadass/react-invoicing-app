import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

import DynamicImport from "./dynamic-import";
import ProtectedRoute from "./protected-route";
import Header from "./components/common/header";
import Footer from "./components/common/footer";
import Loader from "./components/common/loader";
import ScrollToTop from "./components/common/scroll-to-top";
import { store, history } from "./store";
import { saveState } from "./utils/local-storage";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";

const PreLoader = () => (
  <div className="page-loading">
    <Loader />
  </div>
);

const Login = props => (
  <DynamicImport load={() => import("./components/pages/login")}>
    {Component =>
      Component === null ? <PreLoader /> : <Component {...props} />
    }
  </DynamicImport>
);
const Home = props => (
  <DynamicImport load={() => import("./components/pages/home")}>
    {Component =>
      Component === null ? <PreLoader /> : <Component {...props} />
    }
  </DynamicImport>
);

const NoMatch = props => (
  <DynamicImport load={() => import("./components/pages/no-match")}>
    {Component =>
      Component === null ? <PreLoader /> : <Component {...props} />
    }
  </DynamicImport>
);

store.subscribe(() => {
  saveState(store.getState());
});

const App = props => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ScrollToTop>
          <div className="app-wrapper">
            <Header />
            <div className="main">
              <Switch>
                <Route path="/login/" component={Login} />
                <ProtectedRoute exact path="/" component={Home} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
            <ToastContainer position="bottom-center" autoClose={5000} />
          </div>
        </ScrollToTop>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
