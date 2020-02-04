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

export function useGetAllBets() {
    const [{ bets, status }, dispatch] = React.useReducer(
        stateReducer,
        initialState
    );

    const fetchBets = React.useCallback(async function fetchBets() {
        dispatch({ type: ACTIONS.FORM_SUBMIT });
        const { data } = await api<Bet[]>('/bets/all');

        if (data) {
            dispatch({ type: ACTIONS.API_SUCCESS, payload: data });
        } else {
            dispatch({ type: ACTIONS.API_FAILURE });
        }
    }, []);

    return { bets, status, fetchBets };
}
