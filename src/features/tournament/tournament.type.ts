
export type Tournament = {
    id: number;
    name: string;
    date?: string;
    location?: string;
    teams?: number[];
}

export type ServerTournament = {
    id: number;
    name: string;
    date?: string;
    location?: string;
}
