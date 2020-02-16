import React from 'react';
import { api } from '../utils/api';
import { Bet } from '../types/types';

export enum ALL_BET_STATES {
    idle = 'idle',
    loading = 'loading',
    success = 'success',
    failure = 'failure',
}

const ACTIONS = {
    FORM_SUBMIT: 'FORM_SUBMIT',
    API_SUCCESS: 'API_SUCCESS',
    API_FAILURE: 'API_FAILURE',
};

const initialState = {
    status: ALL_BET_STATES.idle,
    bets: null as Bet[] | null,
};

type State = typeof initialState;

function stateReducer(state: State, action: any): State {
    switch (action.type) {
        case ACTIONS.FORM_SUBMIT:
            return { bets: null, status: ALL_BET_STATES.loading };
        case ACTIONS.API_SUCCESS:
            return { bets: action.payload, status: ALL_BET_STATES.success };
        default:
            return initialState;
    }
}

export function useGetBets(endpoint?: 'all' | 'top5') {
    const [{ bets, status }, dispatch] = React.useReducer(
        stateReducer,
        initialState
    );

    let url = '/bets/all';

    switch (endpoint) {
        case 'all':
            url = '/bets/all';
            break;
        case 'top5':
            url = '/bets/top5';
            break;
    }

    const fetchBets = React.useCallback(
        async function fetchBets() {
            dispatch({ type: ACTIONS.FORM_SUBMIT });
            const { data } = await api<Bet[]>(url);

            if (data) {
                dispatch({ type: ACTIONS.API_SUCCESS, payload: data });
            } else {
                dispatch({ type: ACTIONS.API_FAILURE });
            }
        },
        [url]
    );

    return { bets, status, fetchBets };
}
