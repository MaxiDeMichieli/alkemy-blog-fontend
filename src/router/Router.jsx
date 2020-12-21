import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import PostDetails from '../pages/PostDetails';
import CustomError from '../pages/CustomError';

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
      <Route path="/post/:id" exact>
        <PostDetails />
      </Route>
      <Route path="/server-error">
        <CustomError title="Server Error" message="Sorry... there was an error on the server" />
      </Route>
      <Route path="*">
        <CustomError title="Not Found" message="Sorry... this route does nost exist" />
      </Route>
    </Switch>
  );
}

export default Router;
