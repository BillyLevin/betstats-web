import React from 'react';
import { Formik, Form } from 'formik';
import { createBetSchema } from '../utils/schema';
import { api } from '../utils/api';
import { FormTextField } from './FormTextField';
import { FormCheckbox } from './FormCheckbox';
import { Button } from './Button';
import { Bet } from '../types/types';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
    display: flex;

    button:not(:last-child) {
        margin-right: 0.8rem;
    }

    button:last-child {
        margin-left: auto;
    }
`;

const defaultValues = {
    bet: '',
    odds: '',
    eachWay: false,
    stake: 0,
    settled: false,
    returns: 0 as number | null,
    date: '',
};

type FormValues = typeof defaultValues;

type Props = {
    successFunction?: () => void;
    cancelFunction?: () => void;
    betData?: Bet;
};

function BetForm({ successFunction, betData, cancelFunction }: Props) {
    const mode = betData ? 'edit' : 'create';

    let initialValues: FormValues = { ...defaultValues };

    if (mode === 'edit') {
        const { bet, odds, eachWay, stake, settled, returns, date } = betData!;
        initialValues = {
            bet,
            odds,
            eachWay,
            stake,
            settled,
            returns: returns ?? 0,
            date,
        };
    }

    async function deleteBet() {
        if (betData) {
            await api('/bets/delete', { id: betData._id });
        }
    }

    return (
        <Formik<FormValues>
            validationSchema={createBetSchema}
            initialValues={initialValues}
            onSubmit={async (input, { resetForm, setSubmitting }) => {
                let postData: Partial<FormValues & { id: string }> = {
                    ...input,
                };

                if (postData.settled === false) {
                    postData.returns = null;
                }

                if (mode === 'edit') {
                    postData.id = betData?._id;
                }

                let { data } = await api(`/bets/${mode}`, postData);

                if (data) {
                    resetForm();
                    setSubmitting(false);
                    successFunction?.();
                } else {
                    setSubmitting(false);
                }
            }}
        >
            {({ values, isSubmitting }) => (
                <Form>
                    <FormTextField
                        placeholder="e.g. Clondaw Bisto"
                        type="text"
                        name="bet"
                        label="Bet Name"
                    />
                    <FormCheckbox
                        type="checkbox"
                        name="eachWay"
                        label="Each Way"
                    />
                    <FormTextField
                        placeholder="e.g. 11/4"
                        type="text"
                        name="odds"
                        label="Odds"
                    />
                    <FormTextField
                        placeholder="e.g. 17.50"
                        type="number"
                        name="stake"
                        step={0.01}
                        label="Stake (£)"
                        min={0}
                    />
                    <FormCheckbox
                        type="checkbox"
                        name="settled"
                        label="Settled"
                    />
                    {values.settled === true && (
                        <FormTextField
                            isAnimated={mode === 'create'}
                            placeholder="e.g. 150.75"
                            type="number"
                            name="returns"
                            step={0.01}
                            label="Returns (£)"
                            min={0}
                        />
                    )}
                    <FormTextField
                        placeholder="DD/MM/YYYY"
                        type="string"
                        name="date"
                        label="Date"
                    />
                    {mode === 'create' ? (
                        <Button
                            type="submit"
                            variant="unfilled"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    ) : (
                        <>
                            <ButtonsContainer>
                                <Button type="submit">Save</Button>
                                <Button variant="danger" onClick={deleteBet}>
                                    Delete Bet
                                </Button>
                                <Button
                                    variant="unfilled"
                                    onClick={() => cancelFunction?.()}
                                >
                                    Cancel
                                </Button>
                            </ButtonsContainer>
                        </>
                    )}
                </Form>
            )}
        </Formik>
    );
}

export { BetForm };
