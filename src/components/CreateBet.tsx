import React from 'react';
import { getTodaysDate } from '../utils/date';
import { ValidationSchema, useForm } from '../hooks/useForm';
import { createBet, CreateBetBody } from '../api/createBet';
import { useFetch } from '../hooks/useFetch';

const initialValues = {
    bet: '',
    eachWay: false,
    odds: '',
    stake: 0,
    date: getTodaysDate(),
};

type InitialValues = typeof initialValues;

const validationSchema: ValidationSchema = {
    bet: {
        type: 'string',
        required: true,
    },
    eachWay: {
        type: 'boolean',
        required: true,
    },
    odds: {
        type: 'string',
        required: true,
    },
    stake: {
        type: 'number',
        required: true,
    },
    date: {
        type: 'string',
        required: true,
    },
};

function CreateBet() {
    const { values, handleChange } = useForm<InitialValues>(
        initialValues,
        validationSchema
    );

    const { handleApiCall, error, data } = useFetch<CreateBetBody>(createBet);

    const { bet, date, eachWay, odds, stake } = values;

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                handleApiCall(values);
            }}
        >
            <div className="input-group">
                <label htmlFor="bet">Bet</label>
                <input
                    type="text"
                    name="bet"
                    id="bet"
                    value={bet}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="eachWay">E/W</label>
                <input
                    type="checkbox"
                    name="eachWay"
                    id="eachWay"
                    checked={eachWay}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="odds">Odds</label>
                <input
                    type="text"
                    name="odds"
                    id="odds"
                    value={odds}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="stake">Stake (£)</label>
                <input
                    type="number"
                    name="stake"
                    id="stake"
                    step={0.01}
                    min={0}
                    value={stake}
                    onChange={handleChange}
                />
            </div>

            <div className="input-group">
                <label htmlFor="date">Date </label>
                <input
                    type="text"
                    name="date"
                    id="bet"
                    placeholder="DD/MM/YYYY"
                    value={date}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">submit</button>
        </form>
    );
}

export default CreateBet;
