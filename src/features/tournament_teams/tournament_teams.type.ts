
export type TournamentTeam = {
    id: number;
    tournament_id: number;
    tournament_name?: string;
    tournament_date?: string;
    team_id?: number[];
    status?: string;
}

export type ServerTournamentTeam = {
    id: number;
    tournament_id: number;
    tournament_name?: string;
    tournament_date?: string;
    team_id?: number[];
    status?: string;
}
