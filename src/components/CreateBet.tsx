import React from 'react';
import { PageHeading } from './PageHeading';
import { PageDescription } from './PageDescription';
import { Link } from 'react-router-dom';
import { Page } from './Page';
import { BetForm } from './BetForm';
import styled from 'styled-components';
import { toast, ToastContainer } from 'react-toastify';
import { ToastContent } from './ToastContent';

const FormContainer = styled.div`
    width: 48rem;
    border: 3px solid ${props => props.theme.colors.primary};
    border-radius: 3px;
    padding: 3.2rem;
`;

function CreateBet() {
    function handleSuccess() {
        toast.success(<ToastContent message="Bet Created!" />);
    }
    return (
        <Page>
            <PageHeading withDecoration>Create Bet</PageHeading>
            <PageDescription>
                Add an open or settled bet to your records using the form below.
                You can easily edit/delete it later in the{' '}
                <Link to="/bet-manager">Bet Manager</Link>!
            </PageDescription>
            <FormContainer>
                <BetForm successFunction={handleSuccess} />
            </FormContainer>
            <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
        </Page>
    );
}

export { CreateBet };
