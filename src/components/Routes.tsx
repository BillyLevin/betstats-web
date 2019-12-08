import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateBet from './CreateBet';
import Login from './Login';
import Home from './Home';

function Routes() {
    return (
        <Switch>
            <Route path="/create-bet" component={CreateBet} />
            <Route path="/login" component={Login} />
            <Route component={Home} />
        </Switch>
    );
}

export default Routes;
