import React from 'react';

// reference: https://www.jayfreestone.com/writing/react-portals-with-hooks/

function createRoot(id: string) {
    const root = document.createElement('div');
    root.setAttribute('id', id);
    return root;
}

function addRoot(rootElem: Element) {
    document.body.insertBefore(
        rootElem,
        document?.body?.lastElementChild?.nextElementSibling ?? null
    );
}

export function usePortal(elementId: string) {
    const rootRef = React.useRef<Element | null>(null);

    React.useEffect(
        function addElement() {
            const existingParent = document.querySelector(`#${elementId}`);
            const parent = existingParent || createRoot(elementId);

            if (!existingParent) {
                addRoot(parent);
            }

            parent.appendChild(rootRef.current as Element);
        },
        [elementId]
    );

    function getRoot() {
        if (!rootRef.current) {
            rootRef.current = document.createElement('div');
        }

        return rootRef.current;
    }

    return getRoot();
}
