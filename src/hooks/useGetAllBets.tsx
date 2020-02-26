import React from 'react';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { BET_STATES, BET_ACTIONS } from './utils/bets';

const initialState = {
    status: BET_STATES.idle,
    bets: null as Bet[] | null,
};

type State = typeof initialState;

function stateReducer(
    state: State,
    action: { type: BET_ACTIONS; payload?: any }
): State {
    switch (action.type) {
        case BET_ACTIONS.FORM_SUBMIT:
            return { bets: null, status: BET_STATES.loading };
        case BET_ACTIONS.API_SUCCESS:
            return { bets: action.payload, status: BET_STATES.success };
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
        dispatch({ type: BET_ACTIONS.FORM_SUBMIT });
        const { data } = await api<Bet[]>('/bets/all');

        if (data) {
            dispatch({ type: BET_ACTIONS.API_SUCCESS, payload: data });
        } else {
            dispatch({ type: BET_ACTIONS.API_FAILURE });
        }
    }, []);

    return { bets, status, fetchBets };
}

export { BET_STATES as STATES };
