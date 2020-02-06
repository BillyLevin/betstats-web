export function generateKeyDownHandler(
    keyCode: number | number[],
    callback: (...args: any[]) => void
) {
    function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (Array.isArray(keyCode)) {
            if (keyCode.includes(event.keyCode)) {
                return callback();
            }
        }

        if (event.keyCode === keyCode) {
            return callback();
        }
    }

    return handleKeyDown;
}
