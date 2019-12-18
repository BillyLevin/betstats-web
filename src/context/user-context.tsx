import React from 'react';
import { useAuth, User } from './auth-context';

type UserState = User | null | undefined;

var UserContext = React.createContext<UserState>(undefined);

function UserProvider(props: any) {
    var { user } = useAuth();

    return <UserContext.Provider value={user} {...props} />;
}

function useUser() {
    var context = React.useContext(UserContext);

    if (context === undefined) {
        throw new Error('You cannot call useAuth outside of AuthProvider');
    }

    return context;
}

export { UserProvider, useUser };
