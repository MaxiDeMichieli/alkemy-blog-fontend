import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';

function Router() {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/new-post" exact>
        <CreatePost />
      </Route>
      <Route path="/edit/:id" exact>
        <EditPost />
      </Route>
    </Switch>
  );
}

export default Router;
