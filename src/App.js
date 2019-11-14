import React, { Component } from "react";
import Loading from "./Loading";
import DynamicImport from "./DynamicImport";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = props => (
  <DynamicImport load={() => import("./component/Home")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Topics = props => (
  <DynamicImport load={() => import("./component/Topics")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const Settings = props => (
  <DynamicImport load={() => import("./component/Settings")}>
    {Component => (Component === null ? <Loading /> : <Component {...props} />)}
  </DynamicImport>
);

const LazyHome = React.lazy(() => import("./component/Home"));
const LazyTopics = React.lazy(() => import("./component/Topics"));
const LazySettings = React.lazy(() => import("./component/Settings"));

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/topics" component={Topics} />
          <Route path="/settings" component={Settings} />

          <React.Suspense fallback={<Loading />}>
            <Route exact path="/" component={LazyHome} />
            <Route path="/topics" component={LazyTopics} />
            <Route path="/settings" component={LazySettings} />
          </React.Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
