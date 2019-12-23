import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import { CreateBet } from './CreateBet';

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create-bet" component={CreateBet} />
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
