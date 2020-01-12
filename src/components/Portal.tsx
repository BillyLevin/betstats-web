import React from 'react';
import { usePortal } from '../hooks/usePortal';
import ReactDOM from 'react-dom';

type Props = {
    children: React.ReactNode;
    id: string;
};

function Portal({ children, id }: Props) {
    const target = usePortal(id);
    return ReactDOM.createPortal(children, target);
}

export { Portal };
