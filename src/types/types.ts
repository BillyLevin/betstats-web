export type Bet = {
    returns: number | null;
    _id: string;
    bet: string;
    odds: string;
    eachWay: boolean;
    stake: number;
    settled: boolean;
    date: string;
    userId: string;
    createdAt: string;
};
