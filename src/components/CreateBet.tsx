import React from 'react';
import { Button } from './Button';
import { PageHeading } from './PageHeading';
import { PageDescription } from './PageDescription';
import { Link } from 'react-router-dom';
import { PageMessage } from './PageMessage';
import { Page } from './Page';
import { BetForm } from './BetForm';
import styled from 'styled-components';

const FormContainer = styled.div`
    width: 48rem;
    border: 3px solid ${props => props.theme.colors.primary};
    border-radius: 3px;
    padding: 3.2rem;
`;

function CreateBet() {
    const [isComplete, setIsComplete] = React.useState(false);

    function resetPage() {
        setIsComplete(false);
    }

    return (
        <Page>
            {isComplete ? (
                <PageMessage message="Bet added successfully!" type="success">
                    <Button variant="success" onClick={resetPage}>
                        Add Another
                    </Button>
                </PageMessage>
            ) : (
                <>
                    <PageHeading withDecoration>Create Bet</PageHeading>
                    <PageDescription>
                        Add an open or settled bet to your records using the
                        form below. You can easily edit/delete it later in the{' '}
                        <Link to="/bet-manager">Bet Manager</Link>!
                    </PageDescription>
                    <FormContainer>
                        <BetForm successFunction={() => setIsComplete(true)} />
                    </FormContainer>
                </>
            )}
        </Page>
    );
}

export { CreateBet };
