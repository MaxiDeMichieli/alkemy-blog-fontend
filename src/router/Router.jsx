import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import PostDetails from '../pages/PostDetails';

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
      <Route path="/:id" exact>
        <PostDetails />
      </Route>
    </Switch>
  );
}

export default Router;
