import React from 'react';
import { PageSpinner } from '../components/PageSpinner';
import { api } from '../utils/api';

export type User = {
    _id: string;
    googleId: string;
    name: string;
};

type AuthState = {
    user: User | null;
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

function AuthProvider(props: any) {
    const [hasChecked, setHasChecked] = React.useState(false);
    const [user, setUser] = React.useState<User | null>(null);

    React.useLayoutEffect(() => {
        async function getUser() {
            const { data } = await api<AuthState>('/auth/me');

            if (data && data.user) {
                setHasChecked(true);
                setUser(data.user);
            } else {
                setHasChecked(true);
                setUser(null);
            }
        }
        getUser();
    }, []);

    if (!hasChecked) {
        return <PageSpinner />;
    }

    return <AuthContext.Provider value={{ user }} {...props} />;
}

function useAuth() {
    const context = React.useContext(AuthContext);

    if (context === undefined) {
        throw new Error('You cannot call useAuth outside of AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
