export function useKeyDown(keyCode: number, callback: () => void) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (event.keyCode === keyCode) {
            callback();
        }
    }

    return handleKeyDown;
}
