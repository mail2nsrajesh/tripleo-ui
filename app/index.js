import 'babel/polyfill';

import React from 'react';
import * as Router from 'react-router';

import Login from './components/Login';
import Overview from './components/Overview';

let Route = Router.Route;
let RouteHandler = Router.RouteHandler;
let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;

export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <ul className="nav nav-tabs">
            <li><Link to="overview">Overview</Link></li>
            <li className="pull-right"><Link to="login">Login</Link></li>
          </ul>
        </div>
        <RouteHandler/>
      </div>
    );
  }
}

let routes = (
  <Route handler={App}>
    <DefaultRoute handler={Overview} name="overview"/>
    <Route handler={Login} name="login" path="login"/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

// React.render(<App/>, document.body);