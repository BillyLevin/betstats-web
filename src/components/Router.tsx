import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateBet from './CreateBet';

type Props = {
    children: React.ReactNode;
};

function Router({ children }: Props) {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/create-bet" component={CreateBet} />
                {children}
            </Switch>
        </BrowserRouter>
    );
}

export default Router;
