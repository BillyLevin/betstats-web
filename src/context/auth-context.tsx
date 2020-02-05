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

const initialAuthState = {
    hasChecked: false,
    user: null as User | null,
};

function AuthProvider(props: any) {
    // states are combined into one because we always set them at the same time
    const [authState, setAuthState] = React.useState(initialAuthState);

    const { hasChecked, user } = authState;

    React.useLayoutEffect(() => {
        async function getUser() {
            const { data } = await api<AuthState>('/auth/me');

            if (data && data.user) {
                setAuthState({ hasChecked: true, user: data.user });
            } else {
                setAuthState({ hasChecked: true, user: null });
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
