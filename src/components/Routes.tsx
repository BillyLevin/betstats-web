import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
        </Switch>
    );
}

function UnauthenticatedRoutes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
        </Switch>
    );
}

export { Routes, UnauthenticatedRoutes };
