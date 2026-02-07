
export type Game = {
    tournament_id: number;
    team_a_id?: number;
    team_b_id?: number;
    team_a_score?: number;
    team_b_score?: number;
    game_date?:string;
}

export type ServerGame = {
    tournament_id: number;
    team_a_id?: number;
    team_b_id?: number;
    team_a_score?: number;
    team_b_score?: number;
    game_date?:string;
}
