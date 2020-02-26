import React from 'react';
import { api } from '../utils/api';
import { Bet } from '../types/types';
import { BET_ACTIONS, BET_STATES } from './utils/bets';

type Top5Bets = { profit: Bet[]; longshots: Bet[] };

const initialState = {
    status: BET_STATES.idle,
    bets: null as Top5Bets | null,
};

type State = typeof initialState;

function stateReducer(state: State, action: any): State {
    switch (action.type) {
        case BET_ACTIONS.FORM_SUBMIT:
            return { bets: null, status: BET_STATES.loading };
        case BET_ACTIONS.API_SUCCESS:
            return { bets: action.payload, status: BET_STATES.success };
        default:
            return initialState;
    }
}

export function useGetTop5Bets() {
    const [{ bets, status }, dispatch] = React.useReducer(
        stateReducer,
        initialState
    );

    const fetchBets = React.useCallback(async function fetchBets() {
        dispatch({ type: BET_ACTIONS.FORM_SUBMIT });
        const { data } = await api<Top5Bets>('/bets/top5');

        if (data) {
            dispatch({ type: BET_ACTIONS.API_SUCCESS, payload: data });
        } else {
            dispatch({ type: BET_ACTIONS.API_FAILURE });
        }
    }, []);

    return { bets, status, fetchBets };
}

export { BET_STATES as STATES };
