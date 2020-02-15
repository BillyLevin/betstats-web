export function capitalizeFirstLetter(str: string) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

export function formatAsCurrency(rawNumber: number) {
    if (rawNumber < 0) {
        return `-£${Math.abs(rawNumber).toFixed(2)}`;
    }
    return `£${rawNumber.toFixed(2)}`;
}

export function oddsToValue(odds: string) {
    const [numerator, denominator] = odds.split('/');
    return Number(numerator) / Number(denominator);
}
