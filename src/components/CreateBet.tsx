import React from 'react';
import { Formik, Form } from 'formik';
import { createBetSchema } from '../utils/schema';
import { FormTextField } from './FormTextField';
import { FormCheckbox } from './FormCheckbox';

var initialValues = {
    bet: '',
    odds: '',
    eachWay: false,
    stake: 0,
    settled: false,
    returns: 0,
    date: '',
};

type FormValues = typeof initialValues;

function CreateBet() {
    return (
        <div>
            <h1>Create Bet</h1>
            <Formik<FormValues>
                validationSchema={createBetSchema}
                initialValues={initialValues}
                onSubmit={() => {
                    console.log('hello');
                }}
            >
                {({ values, errors }) => (
                    <>
                        <Form
                            style={{
                                width: 300,
                                backgroundColor: 'black',
                                padding: '2.4rem',
                            }}
                        >
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
                                    isAnimated
                                    placeholder="e.g. 150.75"
                                    type="number"
                                    name="returns"
                                    step={0.01}
                                    label="Returns (£)"
                                    min={0}
                                />
                            )}
                            <button type="submit">submit</button>
                        </Form>
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                        <pre>{JSON.stringify(errors, null, 4)}</pre>
                    </>
                )}
            </Formik>
        </div>
    );
}

export { CreateBet };
