import React from 'react';
import { useAuth, User } from './auth-context';

type UserState = User | null | undefined;

const UserContext = React.createContext<UserState>(undefined);

function UserProvider(props: any) {
    const { user } = useAuth();

    return <UserContext.Provider value={user} {...props} />;
}

function useUser() {
    const context = React.useContext(UserContext);

    if (context === undefined) {
        throw new Error('You cannot call useAuth outside of AuthProvider');
    }

    return context;
}

export { UserProvider, useUser };
