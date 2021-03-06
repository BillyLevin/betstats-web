export function hexToRGBA(hex: string, alpha = 1) {
    let parseString = hex;
    if (hex.startsWith('#')) {
        parseString = hex.slice(1, 7);
    }

    if (parseString.length !== 6) {
        throw new Error('Invalid hex provided');
    }
    const r = parseInt(parseString.slice(0, 2), 16);
    const g = parseInt(parseString.slice(2, 4), 16);
    const b = parseInt(parseString.slice(4, 6), 16);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
        throw new Error('Invalid hex provided');
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
