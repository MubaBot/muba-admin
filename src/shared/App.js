import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from 'pages';
import { Dashboard, Users } from 'pages/admin';

import AdminMenu from 'components/Menu';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin*" >
            <div>
              <AdminMenu />
              <Route exact path="/admin/users" component={Users} />
              <Route exact path="/admin" component={Dashboard} />
            </div>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;