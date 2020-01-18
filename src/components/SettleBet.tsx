import React from 'react';
import { FaArrowCircleRight } from 'react-icons/fa';
import styled from 'styled-components';
import { hexToRGBA } from '../utils/colors';
import { Modal } from './Modal';
import { Formik, Form } from 'formik';
import { settleBetSchema } from '../utils/schema';
import { api } from '../utils/api';
import { FormTextField } from './FormTextField';
import { Button } from './Button';
import { Loader } from './Loader';

type Props = {
    betId: string;
    onSuccess: () => void;
};

const initialValues = {
    returns: 0,
};

type FormValues = typeof initialValues;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const OpenModalButton = styled.button`
    color: ${props => props.theme.colors.success};
    background: transparent;
    border: 0;
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
    cursor: pointer;
    transition: all 0.3s;
    outline: 0;

    &:hover,
    &:active,
    &:focus {
        color: ${props => props.theme.colors.successDark};
    }

    &:focus {
        box-shadow: 0 0 0 2px
            ${props => hexToRGBA(props.theme.colors.successDark, 0.8)};
    }

    svg {
        width: 1.4rem;
        height: auto;
    }
`;

const Title = styled.h1`
    padding-bottom: 0.8rem;
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    margin-bottom: 2.4rem;
    font-weight: 300;
    letter-spacing: 2px;
    font-size: 3.2rem;
`;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    min-width: 40rem;
`;

function SettleBet({ betId, onSuccess }: Props) {
    const [showModal, setShowModal] = React.useState(false);
    const openBtnRef = React.useRef<HTMLButtonElement | null>(null);

    function openModal() {
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    return (
        <Container>
            <span>Open</span>
            <OpenModalButton
                aria-label="Settle bet"
                onClick={openModal}
                ref={openBtnRef}
            >
                <FaArrowCircleRight />
            </OpenModalButton>
            <Modal
                id="settle-bet"
                isOpen={showModal}
                closeModal={closeModal}
                label="Settle bet"
                triggerRef={openBtnRef}
            >
                <Title>Settle Bet </Title>
                <Formik<FormValues>
                    validationSchema={settleBetSchema}
                    initialValues={initialValues}
                    onSubmit={async function handleSubmit(
                        input,
                        { resetForm, setSubmitting }
                    ) {
                        let postData = { ...input, id: betId };

                        let { data } = await api('/bets/settle', postData);

                        if (data) {
                            resetForm();
                            setSubmitting(false);
                            closeModal();
                            onSuccess();
                        } else {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <FormContainer>
                            <Form>
                                {isSubmitting ? (
                                    <LoaderContainer>
                                        <Loader />
                                    </LoaderContainer>
                                ) : (
                                    <>
                                        <FormTextField
                                            placeholder="e.g. 150.75"
                                            type="number"
                                            name="returns"
                                            step={0.01}
                                            label="Returns (£)"
                                            min={0}
                                        />
                                        <Button
                                            type="submit"
                                            variant="default"
                                            disabled={isSubmitting}
                                        >
                                            Submit
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </FormContainer>
                    )}
                </Formik>
            </Modal>
        </Container>
    );
}

export { SettleBet };
