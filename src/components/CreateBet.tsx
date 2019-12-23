import React from 'react';
import { Formik, Form } from 'formik';
import { FormTextField } from './FormTextField';
import { FormCheckbox } from './FormCheckbox';
import { Button } from './Button';
import { api } from '../utils/api';
import { createBetSchema } from '../utils/schema';
import { PageHeading } from './PageHeading';
import styled from 'styled-components';

const initialValues = {
    bet: '',
    odds: '',
    eachWay: false,
    stake: 0,
    settled: false,
    returns: 0 as number | null,
    date: '',
};

type FormValues = typeof initialValues;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormContainer = styled.div`
    width: 48rem;
    border: 2px solid ${props => props.theme.colors.primary};
    border-radius: 3px;
    padding: 3.2rem;
`;

function CreateBet() {
    return (
        <Section>
            <PageHeading withDecoration>Create Bet</PageHeading>
            <Formik<FormValues>
                validationSchema={createBetSchema}
                initialValues={initialValues}
                onSubmit={async (input, { resetForm }) => {
                    let postData = { ...input };

                    if (postData.settled === false) {
                        postData.returns = null;
                    }

                    let { data, errors } = await api('/bets/create', postData);

                    if (data) {
                        // TODO: success message
                        resetForm();
                    } else {
                        // TODO: format/show error messages?
                    }
                }}
            >
                {({ values }) => (
                    <FormContainer>
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
                                    isAnimated
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
                            <Button type="submit" variant="unfilled">
                                Submit
                            </Button>
                        </Form>
                    </FormContainer>
                )}
            </Formik>
        </Section>
    );
}

export { CreateBet };
