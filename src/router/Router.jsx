import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        home
      </Route>
    </Switch>
  );
}

export default Router;
