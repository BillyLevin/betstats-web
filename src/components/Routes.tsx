import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { Home } from './Home';
import { CreateBet } from './CreateBet';
import { BetManager } from './BetManager';
import { BetStats } from './BetStats';
import { BetStatsProvider } from '../context/bet-stats-context';

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create-bet" component={CreateBet} />
            <Route path="/bet-manager" component={BetManager} />
            <BetStatsProvider>
                <Route path="/bet-stats" component={BetStats} />
            </BetStatsProvider>
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
